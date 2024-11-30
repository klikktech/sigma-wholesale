package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.request.BrandRequest;
import com.klikk.sigma.dto.response.BrandResponse;
import com.klikk.sigma.entity.Brand;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BrandMapper {

    public BrandResponse brandToBrandResponse(Brand brand);
}