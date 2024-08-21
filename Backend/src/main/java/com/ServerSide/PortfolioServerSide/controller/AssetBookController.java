package com.ServerSide.PortfolioServerSide.controller;

import com.ServerSide.PortfolioServerSide.Entity.AssetBook;
import com.ServerSide.PortfolioServerSide.Service.AssetBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin
public class AssetBookController {

    @Autowired
    private AssetBookService assetBookService;

    @GetMapping("/owned")
    public ResponseEntity<List<AssetBook>> getOwnedAssets() {
        List<AssetBook> assets = assetBookService.getOwnedAssets();
        return ResponseEntity.ok(assets);
    }

}
