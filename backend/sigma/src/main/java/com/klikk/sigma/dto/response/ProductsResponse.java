package com.klikk.sigma.dto.response;

import com.klikk.sigma.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductsResponse {
    private String name;

    private String status;

    private String displayImage;

    private List<String> images;

    private String sku;

    private String details;

    private Category category;

    private String price;

    private LocalDateTime createdAt;
}
