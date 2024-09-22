package com.klikk.sigma.entity;


import com.klikk.sigma.utils.AttachmentType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "attachments")
public class Attachment {

    @Id
    @SequenceGenerator(name = "attachments_sequence",sequenceName = "attachments_sequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "attachments_sequence")
    private Integer id;

    @Enumerated(EnumType.STRING)
    private AttachmentType type;

    @Lob
    @Column(name = "file_content", nullable = false)
    private byte[] fileContent;
}
