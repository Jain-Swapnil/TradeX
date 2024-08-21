package com.ServerSide.PortfolioServerSide.Service;

import com.ServerSide.PortfolioServerSide.Entity.AssetBook;
import com.ServerSide.PortfolioServerSide.Repo.AssetBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AssetBookService {

    @Autowired
    private AssetBookRepository assetBookRepository;

    private StockService stockService;

    private BondService bondService;

    public List<AssetBook> getOwnedAssets() {
        return assetBookRepository.findAll();
    }
}
