package com.prettyfinds.service;


import com.prettyfinds.dto.PromoValidationResponse;
import com.prettyfinds.model.PromoCode;
import com.prettyfinds.repository.PromoCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PromoCodeService {

    @Autowired
    PromoCodeRepository promoCodeRepository;
        public PromoValidationResponse validatePromoCode(String code) {
            PromoCode promoCode = promoCodeRepository.findByCodeAndActiveTrue(code);
            if (promoCode == null) {
                PromoValidationResponse response = new PromoValidationResponse();
                response.setValid(false);
                response.setDiscount(0);
                response.setCode(code);
                response.setMessage("Invalid promo code");
                return response;
            }
            LocalDateTime now = LocalDateTime.now();

            if (now.isBefore(promoCode.getValidFrom())) {
                PromoValidationResponse response = new PromoValidationResponse();
                response.setValid(false);
                response.setDiscount(0);
                response.setCode(code);
                response.setMessage("Promo code is not yet valid");
                return response;
            }

            if (now.isAfter(promoCode.getValidUntil())) {
                PromoValidationResponse response = new PromoValidationResponse();
                response.setValid(false);
                response.setDiscount(0);
                response.setCode(code);
                response.setMessage("Promo code has expired");
                return response;
            }

            PromoValidationResponse response = new PromoValidationResponse();
            response.setValid(true);
            response.setDiscount(promoCode.getDiscount());
            response.setCode(code);
            response.setMessage("Promo code applied successfully!");
            return response;
        }
    }
