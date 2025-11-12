package com.prettyfinds.controller;

import com.prettyfinds.dto.PromoValidationRequest;
import com.prettyfinds.dto.PromoValidationResponse;
import com.prettyfinds.service.PromoCodeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/promo")
@CrossOrigin(origins = "http://localhost:3000")
public class PromoCodeController {

    @Autowired
    private PromoCodeService promoCodeService;

    @PostMapping("/validate")
    public PromoValidationResponse validatePromoCode(
            @Valid @RequestBody PromoValidationRequest request) {
        PromoValidationResponse response = promoCodeService.validatePromoCode(request.getCode());
        return response;
    }
}
