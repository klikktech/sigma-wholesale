package com.klikk.sigma.config;


import software.amazon.awssdk.auth.credentials.AwsCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3ClientBuilder;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.regions.Region;
import com.klikk.sigma.aws.AwsS3Properties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AmazonS3Config {

    @Autowired
    private AwsS3Properties awsS3Properties;
    @Bean
    public S3Client getAmazonS3Cient() {

        String secretAccessKey = awsS3Properties.getSecretKey();
        String accessKeyId = awsS3Properties.getAccessKeyId();
        Region region = Region.US_EAST_2;

        final AwsBasicCredentials basicAWSCredentials = AwsBasicCredentials.builder().accessKeyId(accessKeyId).secretAccessKey(secretAccessKey).build();

        return S3Client.builder().region(region).credentialsProvider(new AwsCredentialsProvider() {
                    @Override
                    public AwsCredentials resolveCredentials() {
                        return basicAWSCredentials;
                    }
                })
                .build();
    }

}