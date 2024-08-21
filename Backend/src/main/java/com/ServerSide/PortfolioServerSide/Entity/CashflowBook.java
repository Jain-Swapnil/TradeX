package com.ServerSide.PortfolioServerSide.Entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class CashflowBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cashflowId;

    @Column(nullable = false)
    private String tickerSymbol;

    @Column(nullable = false)
    private LocalDate transactionDate;

    @Column(nullable = false)
    private BigDecimal pnl;

    public CashflowBook(){}
    public CashflowBook(String tickerSymbol, LocalDate transactionDate, BigDecimal pnl) {
        this.tickerSymbol = tickerSymbol;
        this.transactionDate = transactionDate;
        this.pnl = pnl;
    }

    public Long getCashflowId() {
        return cashflowId;
    }

    public void setCashflowId(Long cashflowId) {
        this.cashflowId = cashflowId;
    }

    public String getTickerSymbol() {
        return tickerSymbol;
    }

    public void setTickerSymbol(String tickerSymbol) {
        this.tickerSymbol = tickerSymbol;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }

    public BigDecimal getPnl() {
        return pnl;
    }

    public void setPnl(BigDecimal pnl) {
        this.pnl = pnl;
    }
}
