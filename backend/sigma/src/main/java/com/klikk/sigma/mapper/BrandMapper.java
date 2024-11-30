package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.BrandRequest;
import com.klikk.sigma.dto.BrandResponse;
import com.klikk.sigma.entity.Brand;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BrandMapper {

    public BrandResponse brandToBrandRequest(Brand brand);
}
