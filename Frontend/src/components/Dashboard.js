import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart,
  BarChart,
  Bar,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import {
  CircularProgress,
  Alert,
  Container,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid
} from '@mui/material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF8042', '#36A2EB'];

const PurchaseDistributionCharts = () => {
  const [assets, setAssets] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [timeseriesData, setTimeseriesData] = useState({});
  const [selectedAssets, setSelectedAssets] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/assets/owned');
        setAssets(response.data);
      } catch (error) {
        setError('Error fetching assets');
        console.error('Error fetching assets:', error);
      }
    };

    const fetchInstruments = async () => {
      try {
        const responseStocks = await axios.get('http://localhost:8082/api/assets/stocks');
        const responseBonds = await axios.get('http://localhost:8082/api/assets/bonds');
        setInstruments([...responseStocks.data, ...responseBonds.data]);
      } catch (error) {
        setError('Error fetching instruments');
        console.error('Error fetching instruments:', error);
      }
    };

    const fetchTimeseriesData = async () => {
      try {
        const timeseries = {};
        for (let asset of assets) {
          const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${asset.tickerSymbol}&apikey=P5MB96P3BIJ81YSL`);
         // const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${asset.tickerSymbol}&apikey=P5MB96P3BIJ81YSL`);
          
          console.log(`API Response for ${asset.tickerSymbol}:`, response.data); // Debugging statement
          const seriesData = response.data["Time Series (Daily)"];
          
          if (!seriesData) {
            console.error(`No time series data found for ${asset.tickerSymbol}`);
            continue; // Skip this asset if no data
          }
          
          const dates = Object.keys(seriesData).slice(0, 100).reverse();
          const prices = dates.map(date => parseFloat(seriesData[date]['4. close']));
    
          timeseries[asset.tickerSymbol] = {
            labels: dates,
            data: prices,
          };
        }
        setTimeseriesData(timeseries);
      } catch (error) {
        console.error('Error fetching timeseries data:', error.response || error.message || error);
        setError('Error fetching timeseries data');
      }
    };
    

    const fetchData = async () => {
      await fetchAssets();
      await fetchInstruments();
      await fetchTimeseriesData(); // Fetch timeseries data after assets are loaded
      setLoading(false);
    };

    fetchData();
  }, [assets]);

  const handleSelectionChange = (ticker) => {
    setSelectedAssets(prevState => ({
      ...prevState,
      [ticker]: !prevState[ticker],
    }));
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  // Calculate purchase amount distribution across asset classes
  const assetClassDistribution = assets.reduce((acc, asset) => {
    const instrument = instruments.find(inst => inst.tickerSymbol === asset.tickerSymbol);
    if (instrument) {
      const assetClass = instrument.stockPrice ? 'Stocks' : 'Bonds';
      const purchaseAmount = asset.volume * (instrument.stockPrice || instrument.bondPrice);

      if (acc[assetClass]) {
        acc[assetClass] += purchaseAmount;
      } else {
        acc[assetClass] = purchaseAmount;
      }
    }
    return acc;
  }, {});

  const assetClassData = Object.keys(assetClassDistribution).map(key => ({
    name: key,
    value: assetClassDistribution[key],
  }));

  // Calculate purchase amount distribution across instruments
  const instrumentDistribution = assets.map(asset => {
    const instrument = instruments.find(inst => inst.tickerSymbol === asset.tickerSymbol);
    return {
      name: asset.tickerSymbol,
      value: asset.volume * (instrument ? (instrument.stockPrice || instrument.bondPrice) : 0),
    };
  });

  const barChartPnlData = {
    labels: ['2024-07-01', '2024-07-02', '2024-07-03', '2024-07-04'],
    datasets: [
      {
        label: 'Profit/Loss',
        data: [100, -50, 200, -10],
        backgroundColor: '#c2c2f0',
      },
    ],
  };

  const barChartPnLSummaryData = {
    labels: ['Realized PNL', 'Unrealized PNL', 'Net PNL'],
    datasets: [
      {
        label: 'PNL Summary',
        data: [1200, 300, 1500],
        backgroundColor: ['#c2c2f0', '#b3b3e6', '#99ccff'],
      },
    ],
  };

  const transformedData = barChartPnlData.labels.map((label, index) => ({
    date: label,
    pnl: barChartPnlData.datasets[0].data[index],
  }));

  const transformedPnLSummaryData = barChartPnLSummaryData.labels.map((label, index) => ({
    category: label,
    value: barChartPnLSummaryData.datasets[0].data[index],
    color: barChartPnLSummaryData.datasets[0].backgroundColor[index],
  }));

  const combinedTimeseriesData = {
    labels: timeseriesData[Object.keys(timeseriesData)[0]]?.labels || [],
    datasets: Object.keys(timeseriesData).map(ticker => ({
      label: `${ticker} Stock Price`,
      data: selectedAssets[ticker] ? timeseriesData[ticker]?.data : [],
      borderColor: getRandomColor(),
      backgroundColor: 'rgba(153, 204, 255, 0.2)',
      fill: false,
      hidden: !selectedAssets[ticker],
    })),
  };

  return (
    <Container style={{ marginTop: 40 }}>
      <Typography variant="h4" gutterBottom>Purchase Amount Distribution</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Across Asset Classes</Typography>
          <PieChart width={400} height={400}>
            <Pie
              data={assetClassData}
              cx={200}
              cy={200}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {assetClassData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6">Across Instruments</Typography>
          <PieChart width={400} height={400}>
            <Pie
              data={instrumentDistribution}
              cx={200}
              cy={200}
              outerRadius={150}
              fill="#82ca9d"
              dataKey="value"
              label
            >
              {instrumentDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6">Profit/Loss Over Time</Typography>
          <BarChart
            width={600}
            height={400}
            data={transformedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pnl" fill="#c2c2f0" />
          </BarChart>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6">PNL Summary</Typography>
          <BarChart
            width={600}
            height={400}
            data={transformedPnLSummaryData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            {transformedPnLSummaryData.map((entry, index) => (
              <Bar
                key={`bar-${index}`}
                dataKey="value"
                fill={entry.color}
                stackId="a"
              />
            ))}
          </BarChart>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Instrument Price Timeseries</Typography>
          {assets.map(asset => (
            <FormControlLabel
              key={asset.assetId}
              control={
                <Checkbox
                  checked={selectedAssets[asset.tickerSymbol] || false}
                  onChange={() => handleSelectionChange(asset.tickerSymbol)}
                />
              }
              label={asset.tickerSymbol}
            />
          ))}
          <LineChart
            width={800}
            height={400}
            data={combinedTimeseriesData.datasets}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            {combinedTimeseriesData.datasets.map((dataset, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey="data"
                stroke={dataset.borderColor}
                activeDot={{ r: 8 }}
                dot={false}
              />
            ))}
          </LineChart>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PurchaseDistributionCharts;
