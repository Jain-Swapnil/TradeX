package com.ServerSide.PortfolioServerSide.Service;

import com.ServerSide.PortfolioServerSide.Entity.CashflowBook;
import com.ServerSide.PortfolioServerSide.Repo.CashflowBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CashflowBookService {

    @Autowired
    private CashflowBookRepository cashflowBookRepository;

    public List<CashflowBook> getAllCashflows() {
        return cashflowBookRepository.findAll();
    }

    public Optional<CashflowBook> getCashflowById(Long id) {
        return cashflowBookRepository.findById(id);
    }

    public CashflowBook saveCashflow(CashflowBook cashflowBook) {
        return cashflowBookRepository.save(cashflowBook);
    }

    public void deleteCashflow(Long id) {
        cashflowBookRepository.deleteById(id);
    }
}
