package com.ServerSide.PortfolioServerSide.Entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class OrderBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Column(nullable = false)
    private String tickerSymbol;

    @Column(nullable = false)
    private int volume;

    @Column(nullable = false)
    private String action;  // Buy or Sell

    @Column(nullable = false)
    private LocalDate transactionDate;

    public OrderBook(){}
    public OrderBook(Long orderId, String tickerSymbol, int volume, String action, LocalDate transactionDate) {
        this.orderId = orderId;
        this.tickerSymbol = tickerSymbol;
        this.volume = volume;
        this.action = action;
        this.transactionDate = transactionDate;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getTickerSymbol() {
        return tickerSymbol;
    }

    public void setTickerSymbol(String tickerSymbol) {
        this.tickerSymbol = tickerSymbol;
    }

    public int getVolume() {
        return volume;
    }

    public void setVolume(int volume) {
        this.volume = volume;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }
}
