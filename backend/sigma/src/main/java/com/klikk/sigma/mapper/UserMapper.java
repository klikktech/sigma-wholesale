package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.UserDto;
import com.klikk.sigma.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto userToUserDTO(User user);
}
