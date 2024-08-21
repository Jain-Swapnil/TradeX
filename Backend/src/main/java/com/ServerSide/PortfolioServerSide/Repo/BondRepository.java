package com.ServerSide.PortfolioServerSide.Repo;

import com.ServerSide.PortfolioServerSide.Entity.Bond;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface BondRepository extends JpaRepository<Bond, String> {
    // Additional query methods if needed

    @Query("SELECT SUM(b.bondPrice) FROM Bond b")
    Double findTotalBondValue();

    boolean existsByTickerSymbol(String tickerSymbol);

    Optional<Object> findPriceByTickerSymbol(String tickerSymbol);

}
