package com.ServerSide.PortfolioServerSide.Entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
public class AssetBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assetId;

    @Column(nullable = false)
    private String tickerSymbol;

    @Column(nullable = false)
    private int volume;

    @Column(nullable = false)
    private BigDecimal averagePrice;

    public AssetBook() {}

    public AssetBook(String tickerSymbol, int volume, BigDecimal averagePrice) {
        this.tickerSymbol = tickerSymbol;
        this.volume = volume;
        this.averagePrice = averagePrice;
    }

    public AssetBook(Long id, String tickerSymbol, BigDecimal averagePrice, int volume) {
        this.tickerSymbol = tickerSymbol;
        this.volume = volume;
        this.averagePrice = averagePrice;
    }

    public Long getAssetId() {
        return assetId;
    }

    public void setAssetId(Long assetId) {
        this.assetId = assetId;
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

    public BigDecimal getAveragePrice() {
        return averagePrice;
    }

    public void setAveragePrice(BigDecimal averagePrice) {
        this.averagePrice = averagePrice;
    }
}
