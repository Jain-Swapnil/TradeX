package com.ServerSide.PortfolioServerSide.Service;

import com.ServerSide.PortfolioServerSide.Entity.Bond;
import com.ServerSide.PortfolioServerSide.Entity.Stock;
import com.ServerSide.PortfolioServerSide.Repo.BondRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class BondService {

    @Autowired
    private BondRepository bondRepository;

    public List<Bond> getAllBonds() {
        return bondRepository.findAll();
    }
    public void addBond(Bond bond) {
        bondRepository.save(bond);
    }

    public Bond getBondByTickerSymbol(String tickerSymbol) {
        return bondRepository.findById(tickerSymbol)
                .orElseThrow(() -> new RuntimeException("Bond not found with ticker symbol: " + tickerSymbol));
    }

    public Double getTotalBondValue() {
        return bondRepository.findTotalBondValue();
    }

}
