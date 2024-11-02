package com.klikk.sigma.aws;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "aws.s3")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AwsS3Properties {

    private String bucketName;
    private String productImagesPath;
    private String accessKeyId;
    private String secretKey;
}
