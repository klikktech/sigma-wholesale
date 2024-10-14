package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.UserResponseDto;
import com.klikk.sigma.entity.User;
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
    User userDtoToUser(UserResponseDto userDto);
}
