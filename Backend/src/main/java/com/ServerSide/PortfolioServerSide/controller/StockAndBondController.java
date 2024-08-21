package com.ServerSide.PortfolioServerSide.controller;

import com.ServerSide.PortfolioServerSide.Entity.Bond;
import com.ServerSide.PortfolioServerSide.Entity.Stock;
import com.ServerSide.PortfolioServerSide.Service.StockService;
import com.ServerSide.PortfolioServerSide.Service.BondService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin
public class StockAndBondController {

    @Autowired
    private StockService stockService;

    @Autowired
    private BondService bondService;

    @GetMapping("/stocks")
    public ResponseEntity<List<Stock>> getAllStocks() {
        List<Stock> stocks = stockService.getAllStocks();
        return ResponseEntity.ok(stocks);
    }

    @PostMapping("/stocks/add")
    public String addStock(@RequestBody Stock stock) {
        stockService.addStock(stock);
        return "new stock added";
    }

    @GetMapping("/bonds")
    public ResponseEntity<List<Bond>> getAllBonds() {
        List<Bond> bonds = bondService.getAllBonds();
        return ResponseEntity.ok(bonds);
    }

    @PostMapping("/bonds/add")
    public String addBond(@RequestBody Bond bond) {
        bondService.addBond(bond);
        return "new bond added";
    }

    @GetMapping("/stocks/{tickerSymbol}")
    public ResponseEntity<Stock> getStockByTickerSymbol(@PathVariable String tickerSymbol) {
        Stock stock = stockService.getStockByTickerSymbol(tickerSymbol);
        return ResponseEntity.ok(stock);
    }

    @GetMapping("/bonds/{tickerSymbol}")
    public ResponseEntity<Bond> getBondByTickerSymbol(@PathVariable String tickerSymbol) {
        Bond bond = bondService.getBondByTickerSymbol(tickerSymbol);
        return ResponseEntity.ok(bond);
    }

    @GetMapping("/totals")
    public ResponseEntity<Map<String, Double>> getTotals() {
        double totalStockValue = stockService.getTotalStockValue();
        double totalBondValue = bondService.getTotalBondValue();

        Map<String, Double> totals = new HashMap<>();
        totals.put("Stocks", totalStockValue);
        totals.put("Bonds", totalBondValue);

        return ResponseEntity.ok(totals);
    }

    @GetMapping("/stocks/price/{tickerSymbol}")
    public BigDecimal getPrice(@PathVariable String tickerSymbol) {
        return stockService.getPrice(tickerSymbol);
    }
}