package com.ServerSide.PortfolioServerSide.Entity;

import jakarta.persistence.*;



import java.math.BigDecimal;

@Entity
public class Stock {
    @Id
    @Column(unique = true, nullable = false)
    private String tickerSymbol;

    @Column(nullable = false)
    private String companyName;

    private BigDecimal stockPrice;
    private BigDecimal week52High;
    private BigDecimal week52Low;
    private Long averageVolume;
    private String industry;
    private String marketExchange;

    public Stock(){

    }
    public Stock(String tickerSymbol, String companyName, BigDecimal stockPrice, BigDecimal week52High, BigDecimal week52Low, Long averageVolume, String industry, String marketExchange) {
        this.tickerSymbol = tickerSymbol;
        this.companyName = companyName;
        this.stockPrice = stockPrice;
        this.week52High = week52High;
        this.week52Low = week52Low;
        this.averageVolume = averageVolume;
        this.industry = industry;
        this.marketExchange = marketExchange;
    }

    public String getTickerSymbol() {
        return tickerSymbol;
    }

    public void setTickerSymbol(String tickerSymbol) {
        this.tickerSymbol = tickerSymbol;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public BigDecimal getStockPrice() {
        return stockPrice;
    }

    public void setStockPrice(BigDecimal stockPrice) {
        this.stockPrice = stockPrice;
    }

    public BigDecimal getWeek52High() {
        return week52High;
    }

    public void setWeek52High(BigDecimal week52High) {
        this.week52High = week52High;
    }

    public BigDecimal getWeek52Low() {
        return week52Low;
    }

    public void setWeek52Low(BigDecimal week52Low) {
        this.week52Low = week52Low;
    }

    public Long getAverageVolume() {
        return averageVolume;
    }

    public void setAverageVolume(Long averageVolume) {
        this.averageVolume = averageVolume;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getMarketExchange() {
        return marketExchange;
    }

    public void setMarketExchange(String marketExchange) {
        this.marketExchange = marketExchange;
    }
// Getters and Setters
}

