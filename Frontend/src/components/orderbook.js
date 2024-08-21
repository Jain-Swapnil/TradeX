

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const OrderBook = () => {
  const [OrderBook, setorders] = useState([]);

  useEffect(() => {
    const fetchorders= async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/orders/viewAll');
        setorders(response.data);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };

    fetchorders();
  }, []);

  return (
    <TableContainer component={Paper}style={{marginTop: 40 + 'px'}}>
      <Table >
        <TableHead >
          <TableRow>

            <TableCell>TickerSymbol</TableCell>
            <TableCell>Volume</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Transaction Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {OrderBook.map((OrderBook) => (
            <TableRow key={OrderBook.orderId}>
              <TableCell>{OrderBook.tickerSymbol}</TableCell>
              <TableCell>{OrderBook.volume}</TableCell>
              <TableCell>{OrderBook.action}</TableCell>
              <TableCell>{new Date(OrderBook.transactionDate).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderBook;
