package com.klikk.sigma.entity;


import com.klikk.sigma.utils.AttachmentType;
import com.klikk.sigma.utils.StringPrefixedSequenceGenerator;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "attachments")
public class Attachment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "attachment_sequence")
    @GenericGenerator(
            name="attachment_sequence",
            type = com.klikk.sigma.utils.StringPrefixedSequenceGenerator.class,
            parameters = {
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceGenerator.INCREMENT_PARAM, value = "1"),
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceGenerator.PREFIX_VALUE_PARAM, value = "ATT_"),
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceGenerator.NUMBER_FORMAT_PARAM,value = "%d")
            }
    )
    private String id;

    @Enumerated(EnumType.STRING)
    private AttachmentType type;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "product_id",referencedColumnName = "id")
    private Product product;

    @Column(name = "primary_img")
    private boolean isPrimary;
}