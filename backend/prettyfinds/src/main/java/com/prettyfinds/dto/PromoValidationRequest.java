package com.prettyfinds.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class PromoValidationRequest {
    private String code;

    public String getCode() {
        return code;
    }
}
