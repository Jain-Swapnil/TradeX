import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AssetBook = () => {
  const [AssetBook, setAssets] = useState([]);
  const [instruments, setInstruments] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/assets/owned');
        console.log('Assets:', response.data); // Debugging
        setAssets(response.data);
      } catch (error) {
        console.error('Error fetching assets', error);
      }
    };

    const fetchInstruments = async () => {
      try {
        const responseStocks = await axios.get('http://localhost:8082/api/assets/stocks');
        const responseBonds = await axios.get('http://localhost:8082/api/assets/bonds');
        const allInstruments = [...responseStocks.data, ...responseBonds.data];
        console.log('Instruments:', allInstruments); // Debugging
        setInstruments(allInstruments);
      } catch (error) {
        console.error('Error fetching instruments', error);
      }
    };

    fetchAssets();
    fetchInstruments();
  }, []);

  // Map through AssetBook and replace averagePrice with instrument price if tickerSymbol matches
  const updatedAssets = AssetBook.map((asset) => {
    const matchedInstrument = instruments.find(instrument => instrument.tickerSymbol === asset.tickerSymbol);
    const updatedPrice = matchedInstrument ? matchedInstrument.stockPrice || matchedInstrument.bondPrice : asset.averagePrice;
    console.log('Matching Asset:', asset.tickerSymbol, 'Updated Price:', updatedPrice); // Debugging
    return {
      ...asset,
      averagePrice: updatedPrice !== undefined ? updatedPrice : asset.averagePrice,
    };
  });

  return (
    <TableContainer component={Paper} style={{ marginTop: 40 + 'px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ticker Symbol</TableCell>
            <TableCell>Volume</TableCell>
            <TableCell>Average Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {updatedAssets.map((asset) => (
            <TableRow key={asset.assetId}>
              <TableCell>{asset.tickerSymbol}</TableCell>
              <TableCell>{asset.volume}</TableCell>
              <TableCell>{asset.averagePrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AssetBook;
