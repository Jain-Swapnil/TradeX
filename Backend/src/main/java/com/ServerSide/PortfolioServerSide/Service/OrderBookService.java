package com.ServerSide.PortfolioServerSide.Service;

import com.ServerSide.PortfolioServerSide.Entity.OrderBook;
import com.ServerSide.PortfolioServerSide.Entity.AssetBook;
import com.ServerSide.PortfolioServerSide.Entity.CashflowBook;
import com.ServerSide.PortfolioServerSide.Repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderBookService {

    @Autowired
    private OrderBookRepository orderBookRepository;

    public List<OrderBook> getAllOrders() {
        return orderBookRepository.findAll();
    }

    @Autowired
    private AssetBookRepository assetBookRepository;

    @Autowired
    private CashflowBookRepository cashflowBookRepository;

    private StockRepository stockRepository;

    private BondRepository bondRepository;



    public void placeOrder(OrderBook order) {
        orderBookRepository.save(order);

        String tickerSymbol = order.getTickerSymbol();
        AssetBook asset = assetBookRepository.findByTickerSymbol(tickerSymbol)
                .orElse(new AssetBook(tickerSymbol, 0, BigDecimal.ZERO));

        if ("Buy".equalsIgnoreCase(order.getAction())) {
            int newVolume = asset.getVolume() + order.getVolume();
            /**Change*****/
            // Assuming you have a method to calculate the new average price
            BigDecimal newAvgPrice = calculateNewAveragePrice(asset, order);
            asset.setVolume(newVolume);
            asset.setAveragePrice(newAvgPrice);
        } else if ("Sell".equalsIgnoreCase(order.getAction())) {
            if (order.getVolume() > asset.getVolume()) {
                throw new IllegalArgumentException("Sell volume exceeds held volume");
            }
            int newVolume = asset.getVolume() - order.getVolume();
            asset.setVolume(newVolume);

            // Calculate PNL and save to CashflowBook
            BigDecimal pnl = calculatePNL(asset, order);
            CashflowBook cashflow = new CashflowBook(tickerSymbol, order.getTransactionDate(), pnl);
            cashflowBookRepository.save(cashflow);
        }

        assetBookRepository.save(asset);

    }

    private BigDecimal calculateNewAveragePrice(AssetBook asset, OrderBook order) {
        return new BigDecimal(0);
    }

    private BigDecimal calculatePNL(AssetBook asset, OrderBook order) {
        return new BigDecimal(0);
    }

    private String determineAssetType(String tickerSymbol) {
        // Logic to determine if the ticker symbol belongs to a stock or bond
        // This could be based on a naming convention, or you could check in both repositories
        if (stockRepository.existsByTickerSymbol(tickerSymbol)) {
            return "stock";
        } else if (bondRepository.existsByTickerSymbol(tickerSymbol)) {
            return "bond";
        } else {
            throw new IllegalArgumentException("Unknown asset type for ticker symbol: " + tickerSymbol);
        }
    }


}
