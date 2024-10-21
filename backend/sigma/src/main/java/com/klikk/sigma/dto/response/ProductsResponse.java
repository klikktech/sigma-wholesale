package com.klikk.sigma.dto.response;

import com.klikk.sigma.entity.Attachment;
import com.klikk.sigma.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductsResponse {
    private String name;

    private String status;

    private Attachment displayImage;

    private String sku;

    private Category category;

    private String price;
}
