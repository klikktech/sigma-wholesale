package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.UserResponseDto;
import com.klikk.sigma.entity.User;
import com.klikk.sigma.imports.dto.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponseDto userToUserResponseDto(User user);

    @Mappings({
            @Mapping(target = "storeAddress", ignore = true),
            @Mapping(target = "shippingAddress", ignore = true)
//            @Mapping(target = "taxDocument", ignore = true)
    })
    User userDtoToUser(UserDto userDto);
}
