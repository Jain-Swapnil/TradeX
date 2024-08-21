package com.ServerSide.PortfolioServerSide.controller;

import com.ServerSide.PortfolioServerSide.Entity.CashflowBook;
import com.ServerSide.PortfolioServerSide.Service.CashflowBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cashflows")
@CrossOrigin
public class CashflowBookController {

    @Autowired
    private CashflowBookService cashflowBookService;

    @GetMapping
    public List<CashflowBook> getAllCashflows() {
        return cashflowBookService.getAllCashflows();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CashflowBook> getCashflowById(@PathVariable Long id) {
        Optional<CashflowBook> cashflowBook = cashflowBookService.getCashflowById(id);
        return cashflowBook.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public CashflowBook createCashflow(@RequestBody CashflowBook cashflowBook) {
        return cashflowBookService.saveCashflow(cashflowBook);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CashflowBook> updateCashflow(@PathVariable Long id, @RequestBody CashflowBook cashflowBookDetails) {
        Optional<CashflowBook> optionalCashflowBook = cashflowBookService.getCashflowById(id);

        if (optionalCashflowBook.isPresent()) {
            CashflowBook cashflowBook = optionalCashflowBook.get();
            cashflowBook.setTickerSymbol(cashflowBookDetails.getTickerSymbol());
            cashflowBook.setTransactionDate(cashflowBookDetails.getTransactionDate());
            cashflowBook.setPnl(cashflowBookDetails.getPnl());
            CashflowBook updatedCashflow = cashflowBookService.saveCashflow(cashflowBook);
            return ResponseEntity.ok(updatedCashflow);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCashflow(@PathVariable Long id) {
        Optional<CashflowBook> optionalCashflowBook = cashflowBookService.getCashflowById(id);

        if (optionalCashflowBook.isPresent()) {
            cashflowBookService.deleteCashflow(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
