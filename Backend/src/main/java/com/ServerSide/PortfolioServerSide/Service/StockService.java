package com.ServerSide.PortfolioServerSide.Service;

import com.ServerSide.PortfolioServerSide.Entity.Stock;
import com.ServerSide.PortfolioServerSide.Repo.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }
    public void addStock(Stock stock) {
        stockRepository.save(stock);
    }

    public Stock getStockByTickerSymbol(String tickerSymbol) {
        return stockRepository.findById(tickerSymbol)
                .orElseThrow(() -> new RuntimeException("Stock not found with ticker symbol: " + tickerSymbol));
    }

    public Double getTotalStockValue() {
        return stockRepository.findTotalStockValue();
    }

    public BigDecimal getPrice(String tickerSymbol) {
        Stock stock = stockRepository.findByTickerSymbol(tickerSymbol);
        if (stock != null) {
            return stock.getStockPrice();
        } else {
            throw new RuntimeException("Stock not found for ticker symbol: " + tickerSymbol);
        }
    }


}
