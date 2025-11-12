package com.prettyfinds.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PromoValidationResponse {
    private boolean valid;
    private  Integer discount ;
    private String code;
    private String message;

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
