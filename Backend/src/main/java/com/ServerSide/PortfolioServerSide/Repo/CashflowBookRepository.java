package com.ServerSide.PortfolioServerSide.Repo;

import com.ServerSide.PortfolioServerSide.Entity.CashflowBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CashflowBookRepository extends JpaRepository<CashflowBook, Long> {
    // Custom queries if needed
}
