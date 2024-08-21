import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const CashFlowBook = () => {
  const [cashflows, setCashflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCashflows = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/cashflows');
        console.log('Fetched cashflows:', response.data); // Log fetched data
        setCashflows(response.data);
      } catch (error) {
        console.error('Error fetching cashflows', error);
        setError('Failed to fetch cashflows');
      } finally {
        setLoading(false);
      }
    };

    fetchCashflows();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <TableContainer component={Paper} style={{ marginTop: '40px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ticker Symbol</TableCell>
            <TableCell>PNL</TableCell>
            <TableCell>Transaction Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cashflows.map((cashflow) => (
            <TableRow key={cashflow.id}>
              <TableCell>{cashflow.tickerSymbol}</TableCell>
              <TableCell>{cashflow.pnl}</TableCell>
              <TableCell>{new Date(cashflow.transactionDate).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CashFlowBook;
