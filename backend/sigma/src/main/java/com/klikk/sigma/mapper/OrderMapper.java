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
public interface OrderMapper {

    @Mapping(target = "orderCreatedAt", ignore = true)
    @Mapping(target = "orderModifiedAt", ignore = true)
    @Mapping(target = "buyer", ignore = true)
    public Order orderDtoToOrder(OrderDto orderDto);

    public OrderDto orderToOrderDto(Order order);
}
