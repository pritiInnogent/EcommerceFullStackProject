package com.prettyfinds.dto;

import com.prettyfinds.model.Address;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class OrderRequest {

    @NotEmpty(message= "Order must contain atleast one item")
    private List<OrderItemDTO> items;

    @Valid
    @NotNull(message = "Address is required")
    private Address address;

    private Integer discount =0;

    @NotNull(message = "Subtotal is required")
    private double subtotal;

    @NotNull(message = "Total is required")
    private double total;

    private String promoCode;

    public List<OrderItemDTO> getItems() {
        return items;
    }

    public Address getAddress() {
        return address;
    }

    public Integer getDiscount() {
        return discount;
    }

    public double getSubtotal() {
        return subtotal;
    }

    public double getTotal() {
        return total;
    }

    public String getPromoCode() {
        return promoCode;
    }

    @Data
    public static class OrderItemDTO {

        @NotNull(message = "Product ID is required")
        private Long productId;

        @NotNull(message = "Title is required")
        private String title;

        @NotNull(message = "Price is required")
        private Double price;

        @NotNull(message = "Quantity is required")
        private Integer quantity;

        private String image;

        public Long getProductId() {
            return productId;
        }

        public String getTitle() {
            return title;
        }

        public Double getPrice() {
            return price;
        }

        public Integer getQuantity() {
            return quantity;
        }

        public String getImage() {
            return image;
        }

    }

}
