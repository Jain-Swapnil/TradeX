package com.ServerSide.PortfolioServerSide.Entity;


import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class Bond {
    @Id
    @Column(unique = true, nullable = false)
    private String tickerSymbol;

    private String issuer;
    private BigDecimal couponRate;
    private BigDecimal faceValue;
    private LocalDate maturityDate;
    private String creditRating;
    private BigDecimal bondPrice;

    public Bond(){}
    public Bond(String tickerSymbol, String issuer, BigDecimal couponRate, BigDecimal faceValue, LocalDate maturityDate, String creditRating, BigDecimal bondPrice) {
        this.tickerSymbol = tickerSymbol;
        this.issuer = issuer;
        this.couponRate = couponRate;
        this.faceValue = faceValue;
        this.maturityDate = maturityDate;
        this.creditRating = creditRating;
        this.bondPrice = bondPrice;
    }

    public String getTickerSymbol() {
        return tickerSymbol;
    }

    public void setTickerSymbol(String tickerSymbol) {
        this.tickerSymbol = tickerSymbol;
    }

    public String getIssuer() {
        return issuer;
    }

    public void setIssuer(String issuer) {
        this.issuer = issuer;
    }

    public BigDecimal getCouponRate() {
        return couponRate;
    }

    public void setCouponRate(BigDecimal couponRate) {
        this.couponRate = couponRate;
    }

    public BigDecimal getFaceValue() {
        return faceValue;
    }

    public void setFaceValue(BigDecimal faceValue) {
        this.faceValue = faceValue;
    }

    public LocalDate getMaturityDate() {
        return maturityDate;
    }

    public void setMaturityDate(LocalDate maturityDate) {
        this.maturityDate = maturityDate;
    }

    public String getCreditRating() {
        return creditRating;
    }

    public void setCreditRating(String creditRating) {
        this.creditRating = creditRating;
    }

    public BigDecimal getBondPrice() {
        return bondPrice;
    }

    public void setBondPrice(BigDecimal bondPrice) {
        this.bondPrice = bondPrice;
    }
// Getters and Setters
}

