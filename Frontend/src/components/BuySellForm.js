import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

const BuySellForm = () => {
  const [tickerSymbol, setTickerSymbol] = useState('');
  const [volume, setVolume] = useState('');
  const [action, setAction] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [currentPrice, setCurrentPrice] = useState(null);
  const [originalPrice, setOriginalPrice] = useState(null);
  const [pnl, setPnl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [bonds, setBonds] = useState([]);

  useEffect(() => {
    // Fetch stocks (Equities)
    axios.get('http://localhost:8082/api/assets/stocks')
      .then(response => {
        setStocks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the stocks!', error);
      });

    // Fetch bonds (Money Market)
    axios.get('http://localhost:8082/api/assets/bonds')
      .then(response => {
        setBonds(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the bonds!', error);
      });
  }, []);

  const assets = [...stocks, ...bonds];

  const fetchCurrentPrice = async () => {
    setLoading(true);
    setError(null);
    try {
      //const response = await axios.get(`https://financialmodelingprep.com/api/v3/quote-short/${tickerSymbol}?apikey=RAsHELwH4VfdbHyR8YTJsJqMEpy0EofY`); 
      //const price = response.data[0].price;
     //  const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=IBM&apikey=demo`);
     //const price = response.data["Global Quote"]["05. price"];
       //setCurrentPrice(parseFloat(price));
setCurrentPrice(150);
    } catch (error) {
      setError('Failed to fetch current price');
     } finally {https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=IBM&apikey=demo
       setLoading(false);
     }
  };

  const fetchOriginalPriceFromDatabase = async (tickerSymbol) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8082/api/assets/stocks/price/${tickerSymbol}`);
      return parseFloat(response.data);
    } catch (error) {
      setError('Failed to fetch original price from the database');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (action === 'sell') {
      await fetchCurrentPrice();
      const originalPriceValue = await fetchOriginalPriceFromDatabase(tickerSymbol);
      setOriginalPrice(originalPriceValue);

      if (originalPriceValue && currentPrice) {
        const calculatedPnl = (currentPrice - originalPriceValue) * volume;
        setPnl(calculatedPnl);

        // Add PnL to CashflowBook
        try {
          const cashflowEntry = {
            tickerSymbol,
            pnl: calculatedPnl,
            transactionDate
          };
          await axios.post('http://localhost:8082/api/cashflows/add', cashflowEntry);
        } catch (error) {
          setError('Failed to add PnL to CashflowBook');
        }
      }
    }

    // Ensure volume is a number
    const orderVolume = Number(volume);
    if (isNaN(orderVolume)) {
      setError('Volume must be a number');
      return;
    }

    const order = {
      tickerSymbol,
      volume: orderVolume,
      action,
      transactionDate
    };

    try {
      await axios.post('http://localhost:8082/api/orders/placeOrder', order);
      alert('Order processed successfully');
    } catch (error) {
      setError('Error processing order');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 40 }}>
      {error && <Alert severity="error">{error}</Alert>}
      {loading && <CircularProgress />}
      <FormControl fullWidth style={{ marginTop: 20 }}>
        <InputLabel>Ticker Symbol</InputLabel>
        <Select
          value={tickerSymbol}
          onChange={(e) => setTickerSymbol(e.target.value)}
          required
        >
          {assets.length > 0 ? (
            assets.map(asset => (
              <MenuItem key={asset.tickerSymbol} value={asset.tickerSymbol}>
                {asset.tickerSymbol}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>Loading assets...</MenuItem>
          )}
        </Select>
      </FormControl>
      <TextField
        style={{ marginTop: 20 }}
        label="Volume"
        type="number"
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
        required
        fullWidth
      />
      <FormControl fullWidth style={{ marginTop: 20 }}>
        <InputLabel>Action</InputLabel>
        <Select
          value={action}
          onChange={(e) => setAction(e.target.value)}
          required
        >
          <MenuItem value="buy">Buy</MenuItem>
          <MenuItem value="sell">Sell</MenuItem>
        </Select>
      </FormControl>
      <TextField
        style={{ marginTop: 20 }}
        label="Transaction Date"
        type="date"
        value={transactionDate}
        onChange={(e) => setTransactionDate(e.target.value)}
        required
        fullWidth
        InputLabelProps={{ shrink: true }}
      />

      {action === 'sell' && (
        <div style={{ marginTop: 20 }}>
          <Button variant="contained" color="primary" onClick={fetchCurrentPrice} disabled={loading}>
            Fetch Current Price
          </Button>
          {currentPrice && (
            <div style={{ marginTop: 20 }}>
              <strong>Current Price:</strong> {currentPrice}
            </div>
          )}
          {originalPrice && (
            <div style={{ marginTop: 20 }}>
              <strong>Original Price:</strong> {originalPrice}
            </div>
          )}
          {pnl !== null && (
            <div style={{ marginTop: 20 }}>
              <strong>PNL:</strong> {pnl.toFixed(2)}
            </div>
          )}
        </div>
      )}

      <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>
        Submit
      </Button>
    </form>
  );
};

export default BuySellForm;
