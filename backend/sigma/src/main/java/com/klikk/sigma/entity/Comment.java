package com.klikk.sigma.entity;


import com.klikk.sigma.utils.CommentType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "comments")
public class Comment {

    @Id
    @SequenceGenerator(name = "comments_sequence", sequenceName = "comments_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "comments_sequence")
    private Integer id;

    @Enumerated(EnumType.STRING)
    private CommentType commentType;

    @Column(name = "parent_id")
    private Integer parentId;

    @Column(name = "comment")
    private String comment;


}
