package com.klikk.sigma.entity;

import com.klikk.sigma.type.AttachmentType;
import com.klikk.sigma.util.StringPrefixedSequenceGenerator;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="banners")
@Builder
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "banner_sequence")
    @GenericGenerator(
            name="banner_sequence",
            type = com.klikk.sigma.util.StringPrefixedSequenceGenerator.class,
            parameters = {
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceGenerator.INCREMENT_PARAM, value = "1"),
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceGenerator.PREFIX_VALUE_PARAM, value = "BAN_"),
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceGenerator.NUMBER_FORMAT_PARAM,value = "%d")
            }
    )
    private String id;

    @Column(name = "image")
    private String image;

    @Column(name = "title")
    private String title;

    @Column(name = "description",columnDefinition = "TEXT")
    private String description;

    @Column(name = "type")
    private AttachmentType type;
}
