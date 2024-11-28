package com.klikk.sigma.dto.response;

import com.klikk.sigma.entity.Attachment;
import com.klikk.sigma.entity.Category;
import com.klikk.sigma.type.ProductType;
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

    private AttachmentResponse displayImage;

    private List<AttachmentResponse> images;

    private String sku;

    private String details;

    private Category category;

    private String price;

    private boolean isOnSale;

    private LocalDateTime createdAt;

    private Long caseQuantity;

    private Long boxQuantity;

    private String description;

    private Long stockQuantity;

    private String displayStatus;

    private double salePrice;

    private ProductType productType;

    private List<VariationResponseDto> variations;
}
