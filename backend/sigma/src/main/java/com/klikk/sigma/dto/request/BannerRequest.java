package com.klikk.sigma.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BannerRequest {

    private String id;

    private String title;

    private String description;
}
