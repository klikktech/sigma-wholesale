package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.OrderDto;
import com.klikk.sigma.entity.Order;
import com.klikk.sigma.entity.User;
import com.klikk.sigma.repository.UserRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring")
public abstract class OrderMapper {

    @Autowired
    private UserRepository userRepository;

    @Mapping(target = "orderCreatedAt", qualifiedByName = "convertStringDateToDate")
    @Mapping(target = "orderModifiedAt", qualifiedByName = "convertStringDateToDate")
    public abstract Order orderDtoToOrder(OrderDto orderDto);

    @Named("convertStringDateToDate")
    public LocalDateTime convertStringDateToDate(String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss"); // Adjust this if the format is different
        return LocalDateTime.parse(date, formatter);
    }
}
