package com.prettyfinds.repository;

import com.prettyfinds.model.PromoCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PromoCodeRepository extends JpaRepository<PromoCode, String> {

    PromoCode findByCodeAndActiveTrue(String code);
}
