package com.klikk.sigma.dto.request;

import com.klikk.sigma.dto.VariationDto;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProductAdminRequest {

    private String name;

    private String productType;

    private double price;

    private String sku;

    private boolean isOnSale;

    private double salePrice;

    private String status;

    private String displayStatus;

    private Long caseQuantity;

    private Long boxQuantity;

    private String description;

    private Long stockQuantity;

    private String details;

    private List<VariationDto> variations;

    private  List<String> categories;

    private String brand;

}
