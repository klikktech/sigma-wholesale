package com.klikk.sigma.entity;


import com.klikk.sigma.util.StringPrefixedSequenceGenerator;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "address_sequence")
    @GenericGenerator(
            name="address_sequence",
            type = com.klikk.sigma.util.StringPrefixedSequenceGenerator.class,
            parameters = {
                    @Parameter(name = StringPrefixedSequenceGenerator.INCREMENT_PARAM, value = "1"),
                    @Parameter(name = StringPrefixedSequenceGenerator.PREFIX_VALUE_PARAM, value = "ADD_"),
                    @Parameter(name = StringPrefixedSequenceGenerator.NUMBER_FORMAT_PARAM,value = "%d")
            }
    )
    private String id;

    @Column(name = "address")
    private String address;

    @Column(name = "store_city")
    private String city;

    @Column(name = "store_state")
    private String state;

    @Column(name = "store_zip")
    private String zipcode;
}
