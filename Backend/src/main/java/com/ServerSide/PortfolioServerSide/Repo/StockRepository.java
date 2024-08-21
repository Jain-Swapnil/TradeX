package com.ServerSide.PortfolioServerSide.Repo;

import com.ServerSide.PortfolioServerSide.Entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface StockRepository extends JpaRepository<Stock, String> {
    // Additional query methods if needed
    @Query("SELECT SUM(s.stockPrice) FROM Stock s")
    Double findTotalStockValue();

    Stock findByTickerSymbol(String tickerSymbol);

    boolean existsByTickerSymbol(String tickerSymbol);

    Optional<Object> findPriceByTickerSymbol(String tickerSymbol);

}
