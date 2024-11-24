package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.response.AddressResponseDto;
import com.klikk.sigma.entity.Address;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    public AddressResponseDto addressToAddressResponseDto(Address address);
}
