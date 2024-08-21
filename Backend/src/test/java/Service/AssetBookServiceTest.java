package Service;

import com.ServerSide.PortfolioServerSide.Entity.AssetBook;
import com.ServerSide.PortfolioServerSide.Service.AssetBookService;
import com.ServerSide.PortfolioServerSide.controller.AssetBookController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class AssetBookServiceTest {

    @Mock
    private AssetBookService assetBookService;

    @InjectMocks
    private AssetBookController assetBookController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetOwnedAssets() {

        List<AssetBook> mockAssets = new ArrayList<>();
        mockAssets.add(new AssetBook(1L, "AAPL", new BigDecimal("150.00"), 10));
        mockAssets.add(new AssetBook(2L, "GOOGL", new BigDecimal("2800.00"), 5));

        when(assetBookService.getOwnedAssets()).thenReturn(mockAssets);


        ResponseEntity<List<AssetBook>> response = assetBookController.getOwnedAssets();


        assertEquals(200, response.getStatusCodeValue(), "The status code should be 200");
        assertEquals(mockAssets, response.getBody(), "The response body should match the mock assets list");
    }
}