package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.VariationDto;
import com.klikk.sigma.entity.Variation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public abstract class VariationMapper {

    @Mapping(target = "createdAt", qualifiedByName = "convertStringDateToDate")
    @Mapping(target = "modifiedAt", qualifiedByName = "convertStringDateToDate")
    public abstract Variation variationDtoToVariation(VariationDto variationDto);

    @Named("convertStringDateToDate")
    public LocalDateTime convertStringDateToDate(String date){
        // write logic for date conversion here
        return null;
    }
}
