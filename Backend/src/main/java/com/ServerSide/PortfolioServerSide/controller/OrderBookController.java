package com.ServerSide.PortfolioServerSide.controller;

import com.ServerSide.PortfolioServerSide.Entity.CashflowBook;
import com.ServerSide.PortfolioServerSide.Entity.OrderBook;
import com.ServerSide.PortfolioServerSide.Service.OrderBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderBookController {

    @Autowired
    private OrderBookService orderBookService;

    @GetMapping("/viewAll")
    public List<OrderBook> getAllOrders() {
        return orderBookService.getAllOrders();
    }

    @PostMapping("/placeOrder")
    public ResponseEntity<String> placeOrder(@RequestBody OrderBook order) {
        orderBookService.placeOrder(order);
        return ResponseEntity.ok("Order placed successfully");
    }
}
