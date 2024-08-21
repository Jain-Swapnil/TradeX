package com.ServerSide.PortfolioServerSide.Repo;

import com.ServerSide.PortfolioServerSide.Entity.OrderBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderBookRepository extends JpaRepository<OrderBook, Long> {
    // Custom queries if needed
}
