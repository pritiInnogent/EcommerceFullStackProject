package com.prettyfinds.service;

import com.prettyfinds.dto.OrderRequest;
import com.prettyfinds.model.Order;
import com.prettyfinds.model.OrderItem;
import com.prettyfinds.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.logging.Logger;

@Service
public class OrderService {

    private static final Logger logger = Logger.getLogger(OrderService.class.getName());

    @Autowired
    private OrderRepository orderRepository;

    @Transactional
    public Order createOrder(OrderRequest request) {
        Order order = new Order();
        order.setAddress(request.getAddress());
        order.setSubtotal(request.getSubtotal());
        order.setDiscount(request.getDiscount());
        order.setPromoCode(request.getPromoCode());
        order.setTotal(request.getTotal());
        order.setPlacedAt(LocalDateTime.now());
        order.setStatus(Order.OrderStatus.PENDING);

        for (OrderRequest.OrderItemDTO itemDTO : request.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setProductId(itemDTO.getProductId());
            orderItem.setTitle(itemDTO.getTitle());
            orderItem.setPrice(itemDTO.getPrice());
            orderItem.setQuantity(itemDTO.getQuantity());
            orderItem.setImage(itemDTO.getImage());
            order.addItem(orderItem);
        }

        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }

    public Order cancelOrderById(Long id) {
        Order order = getOrderById(id);

        if (order.getStatus() != Order.OrderStatus.PENDING) {
            throw new RuntimeException("Only pending orders can be cancelled");
        }

        order.setStatus(Order.OrderStatus.CANCELLED);
        Order savedOrder = orderRepository.save(order);

        logger.info("Order " + id + " has been cancelled");
        return savedOrder;
    }

    @Scheduled(fixedRate = 300000)
    @Transactional
    public void updatePendingOrders() {
        LocalDateTime sixHoursAgo = LocalDateTime.now().minusHours(6);
        List<Order> pendingOrders = orderRepository.findPendingOrdersOlderThan(sixHoursAgo);

        for (Order order : pendingOrders) {
            order.setStatus(Order.OrderStatus.DELIVERED);
            order.setDeliveredAt(LocalDateTime.now());
            orderRepository.save(order);
            logger.info("Order " + order.getId() + " marked as DELIVERED");
        }
    }
}
