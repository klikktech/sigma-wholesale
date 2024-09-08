package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.VariationDto;
import com.klikk.sigma.entity.Variation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring")
public abstract class VariationMapper {

    @Mapping(target = "createdAt", qualifiedByName = "convertedDate")
    @Mapping(target = "modifiedAt", qualifiedByName = "convertedDate")
   public  abstract Variation variationDtoToVariation(VariationDto variationDto);
}
