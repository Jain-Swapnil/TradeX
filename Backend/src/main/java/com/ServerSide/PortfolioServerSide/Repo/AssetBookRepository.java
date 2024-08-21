package com.ServerSide.PortfolioServerSide.Repo;

import com.ServerSide.PortfolioServerSide.Entity.AssetBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AssetBookRepository extends JpaRepository<AssetBook, Long> {
    Optional<AssetBook> findByTickerSymbol(String tickerSymbol);

}
