package com.prettyfinds.repository;

import com.prettyfinds.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o WHERE o.status = 'PENDING' AND o.placedAt <= :sixHoursAgo")
    List<Order> findPendingOrdersOlderThan(LocalDateTime sixHoursAgo);
}
