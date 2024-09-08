package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.UserDto;
import com.klikk.sigma.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public abstract class UserMapper {


    public abstract UserDto userToUserDTO(User user);

    public abstract User userDTOtoUser(UserDto dto);
}
