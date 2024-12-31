package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.UserResponseDto;
import com.klikk.sigma.dto.request.RegisterRequest;
import com.klikk.sigma.dto.request.ResetPasswordRequest;
import com.klikk.sigma.dto.request.UpdateUserAdminRequest;
import com.klikk.sigma.dto.request.UpdateUserRequest;
import com.klikk.sigma.dto.response.SuccessResponse;
import com.klikk.sigma.dto.response.UsersResponse;
import com.klikk.sigma.entity.Address;
import com.klikk.sigma.entity.PasswordResetToken;
import com.klikk.sigma.entity.Token;
import com.klikk.sigma.entity.User;
import com.klikk.sigma.exception.NotFoundException;
import com.klikk.sigma.mapper.AuthenticationMapper;
import com.klikk.sigma.mapper.UserMapper;
import com.klikk.sigma.repository.PasswordResetTokenRepository;
import com.klikk.sigma.repository.TokenRepository;
import com.klikk.sigma.repository.UserRepository;
import com.klikk.sigma.service.EmailService;
import com.klikk.sigma.service.JwtService;
import com.klikk.sigma.service.UserService;
import com.klikk.sigma.type.RoleType;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressServiceImpl addressServiceImpl;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private AuthenticationMapper authenticationMapper;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenRepository tokenRepository;


    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private EmailService emailService;


    @Override
    public void sendResetPasswordEmail(HttpServletRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));

        String token = UUID.randomUUID().toString().replace("-", "").substring(0,6);
        PasswordResetToken resetToken=PasswordResetToken.builder().token(token).user(user).expiryDate(LocalDateTime.now().plusMinutes(30)).build();
        passwordResetTokenRepository.save(resetToken);

        emailService.sendResetPasswordEmail(email,token);

    }

    @Override
    public void resetPassword(ResetPasswordRequest request) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(request.getToken())
                .orElseThrow(() -> new IllegalArgumentException("Invalid token"));

        if(resetToken.getExpiryDate().isBefore(LocalDateTime.now())){
            throw new IllegalArgumentException("Token is Expired, Please try again");
        }

        User user = resetToken.getUser();
        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        passwordResetTokenRepository.delete(resetToken);
    }


    @Override
    public Page<UsersResponse> findAll(Pageable pageable) {
        // Fetch users in a paginated way
        Page<User> users = userRepository.findAll(pageable);

        // Map to UsersResponse without disturbing pagination
        List<UsersResponse> userResponses = users.getContent()
                .stream()
                .sorted(Comparator.comparing(User::getCreatedAt).reversed()) // Optional: in-memory sorting
                .map(userMapper::userToUserResponse)
                .collect(Collectors.toList());

        // Return as a Page
        return new PageImpl<>(userResponses, pageable, users.getTotalElements());
    }


    @Override
    public UserResponseDto findById(Integer id) {
        Optional<User> result = userRepository.findById(id);
        User user = null;
        if (result.isPresent()) {
            user = result.get();
        } else {
            throw new NotFoundException("User with id : " + id + " not found.");
        }
        return userMapper.userToUserResponseDto(user);
    }

    @Override
    public User findByEmail(String email) {
        Optional<User> result = userRepository.findByEmail(email);
        User user = null;
        if (result.isPresent()) {
            user = result.get();
        } else {
            throw new NotFoundException("User with username : " + email + " not found.");
        }
        return user;
    }

    @Override
    public UsersResponse findUserByEmail(String email) {
        Optional<User> result = userRepository.findByEmail(email);
        User user = null;
        if (result.isPresent()) {
            user = result.get();
        } else {
            throw new NotFoundException("User with username : " + email + " not found.");
        }
        return userMapper.userToUserResponse(user);
    }

    @Override
    public SuccessResponse addUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("User already exists");
        }
        User user = authenticationMapper.registerRequestToUser(request);
        user.setCreatedAt(LocalDateTime.now());
        userRepository.save(user);
        return new SuccessResponse(LocalDateTime.now(), "User created successfully");
    }

    @Override
    public SuccessResponse updateUser(UpdateUserRequest updateRequest, HttpServletRequest request) {
        String token=request.getHeader("Authorization").split(" ")[1];
        String userEmail=jwtService.extractUsername(token);
        User user=userRepository.findByEmail(userEmail).orElseThrow(() -> new NotFoundException("User not found"));


        if (!passwordEncoder.matches(updateRequest.getCurrentPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("The entered password is incorrect!");
        }
        user.setPasswordHash(passwordEncoder.encode(updateRequest.getNewPassword()));
        user.setPhone(updateRequest.getPhone());
        userRepository.save(user);
        return new SuccessResponse(LocalDateTime.now(), "User details updated successfully");
    }

    @Override
    public SuccessResponse updateUserAdmin(UpdateUserAdminRequest updateUserAdminRequest ) {
        User user=userRepository.findByEmail(updateUserAdminRequest.getEmail()).orElseThrow(() -> new NotFoundException("User not found"));

        if (updateUserAdminRequest.getFirstname() != null) {
            user.setFirstname(updateUserAdminRequest.getFirstname());
        }
        if (updateUserAdminRequest.getLastname() != null) {
            user.setLastname(updateUserAdminRequest.getLastname());
        }
        if (updateUserAdminRequest.getNewPassword() != null) {
            user.setPasswordHash(passwordEncoder.encode(updateUserAdminRequest.getNewPassword()));
        }
        if (updateUserAdminRequest.getPhone() != null) {
            user.setPhone(updateUserAdminRequest.getPhone());
        }
        if (updateUserAdminRequest.getRole() != null) {
            user.setRole(getRoleType(updateUserAdminRequest.getRole()));
        }
        if (updateUserAdminRequest.getStoreAddress() != null) {
            if(user.getStoreAddress()==null){
                user.setStoreAddress(new ArrayList<Address>());
            }
            user.getStoreAddress().add(Address.builder().address(updateUserAdminRequest.getStoreAddress()).city(updateUserAdminRequest.getStoreCity()).state(updateUserAdminRequest.getStoreState()).zipcode(updateUserAdminRequest.getStoreZip()).build());
        }

        userRepository.save(user);

        return new SuccessResponse(LocalDateTime.now(), "User details updated successfully");

    }

    @Transactional
    public SuccessResponse deleteUser(String email) {
        // Find the user by ID
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found with Email: " + email));

        if (user.getStoreAddress() != null && !user.getStoreAddress().isEmpty()) {
            user.getStoreAddress().clear();
        }

        if (user.getShippingAddress() != null && !user.getShippingAddress().isEmpty()) {
            user.getShippingAddress().clear();
        }

        List<Token> tokens=tokenRepository.findAllByUser(user);

        tokens.forEach(token -> {
            tokenRepository.delete(token);
        });

        // Save the user entity after clearing associations
        userRepository.save(user);

        // Now delete the user
        userRepository.delete(user);
        return new SuccessResponse(LocalDateTime.now(),"User deleted successfully");
    }

    @Override
    public List<UsersResponse> findUserByKeyword(String keyword) {
        List<User> users = userRepository.findByKeyword(keyword);
        return users.stream()
                .map(userMapper::userToUserResponse)
                .collect(Collectors.toList());
    }

    public RoleType getRoleType(String role){
        role=role.toLowerCase();
        if(role.equals("admin")){
            return RoleType.ADMIN;
        }
        else if(role.equals("customer")){
            return RoleType.CUSTOMER;
        }
        return RoleType.PENDING;
    }
}
