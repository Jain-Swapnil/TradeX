package Service;
        import com.ServerSide.PortfolioServerSide.Entity.Bond;
        import com.ServerSide.PortfolioServerSide.Repo.BondRepository;
        import com.ServerSide.PortfolioServerSide.Service.BondService;
        import org.junit.jupiter.api.BeforeEach;
        import org.junit.jupiter.api.Test;
        import org.mockito.InjectMocks;
        import org.mockito.Mock;
        import org.mockito.MockitoAnnotations;

        import java.math.BigDecimal;
        import java.time.LocalDate;
        import java.util.ArrayList;
        import java.util.List;
        import java.util.Optional;

        import static org.junit.jupiter.api.Assertions.assertEquals;
        import static org.junit.jupiter.api.Assertions.assertThrows;
        import static org.mockito.Mockito.*;

class BondServiceTest {

    @Mock
    private BondRepository bondRepository;

    @InjectMocks
    private BondService bondService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllBonds() {

        List<Bond> mockBonds = new ArrayList<>();
        mockBonds.add(new Bond("BND1", "Issuer1", new BigDecimal("5.0"), new BigDecimal("1000"), LocalDate.now(), "AAA", new BigDecimal("1020")));
        mockBonds.add(new Bond("BND2", "Issuer2", new BigDecimal("6.0"), new BigDecimal("2000"), LocalDate.now().plusYears(1), "BBB", new BigDecimal("2050")));

        when(bondRepository.findAll()).thenReturn(mockBonds);


        List<Bond> bonds = bondService.getAllBonds();


        assertEquals(2, bonds.size(), "The number of bonds should be 2");
        assertEquals(mockBonds, bonds, "The returned bonds should match the mock bonds");
    }

    @Test
    void testAddBond() {

        Bond bond = new Bond("BND1", "Issuer1", new BigDecimal("5.0"), new BigDecimal("1000"), LocalDate.now(), "AAA", new BigDecimal("1020"));


        bondService.addBond(bond);


        verify(bondRepository, times(1)).save(bond);
    }

    @Test
    void testGetBondByTickerSymbol() {

        Bond mockBond = new Bond("BND1", "Issuer1", new BigDecimal("5.0"), new BigDecimal("1000"), LocalDate.now(), "AAA", new BigDecimal("1020"));

        when(bondRepository.findById("BND1")).thenReturn(Optional.of(mockBond));


        Bond bond = bondService.getBondByTickerSymbol("BND1");


        assertEquals(mockBond, bond, "The returned bond should match the mock bond");
    }

    @Test
    void testGetBondByTickerSymbolNotFound() {

        when(bondRepository.findById("BND1")).thenReturn(Optional.empty());


        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            bondService.getBondByTickerSymbol("BND1");
        });

        assertEquals("Bond not found with ticker symbol: BND1", exception.getMessage());
    }

    @Test
    void testGetTotalBondValue() {

        when(bondRepository.findTotalBondValue()).thenReturn(5000.0);


        Double totalValue = bondService.getTotalBondValue();


        assertEquals(5000.0, totalValue, "The total bond value should be 5000.0");
    }


}

