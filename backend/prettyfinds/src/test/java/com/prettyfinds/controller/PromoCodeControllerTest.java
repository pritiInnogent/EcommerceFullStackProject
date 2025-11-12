package com.prettyfinds.controller;

import com.prettyfinds.dto.PromoValidationRequest;
import com.prettyfinds.dto.PromoValidationResponse;
import com.prettyfinds.service.PromoCodeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PromoCodeController.class)
class PromoCodeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PromoCodeService promoCodeService;

    @Test
    void testValidatePromoCode_Success() throws Exception {
        // Arrange
        PromoValidationRequest request = new PromoValidationRequest();
        request.setCode("SAVE10");

        PromoValidationResponse response = new PromoValidationResponse(
                true, 10, "SAVE10", "Promo code applied successfully!"
        );

        when(promoCodeService.validatePromoCode(anyString())).thenReturn(response);

        // Act & Assert
        mockMvc.perform(post("/api/promo/validate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.valid").value(true))
                .andExpect(jsonPath("$.discount").value(10))
                .andExpect(jsonPath("$.message").value("Promo code applied successfully!"));
    }

    @Test
    void testValidatePromoCode_InvalidCode() throws Exception {
        // Arrange
        PromoValidationRequest request = new PromoValidationRequest();
        request.setCode("INVALID");

        PromoValidationResponse response = new PromoValidationResponse(
                false, 0, "INVALID", "Invalid promo code"
        );

        when(promoCodeService.validatePromoCode(anyString())).thenReturn(response);

        // Act & Assert
        mockMvc.perform(post("/api/promo/validate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.valid").value(false))
                .andExpect(jsonPath("$.message").value("Invalid promo code"));
    }
}
