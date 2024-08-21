
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuySellForm from './components/BuySellForm.js'; // Adjust path if necessary
import CashFlowBook from './components/cashflowbook.js';
import AssetBook from './components/assetsowned.js';
import OrderBook from './components/orderbook.js';
import Navbar from './components/navbar.js';
import AssetClasses from './components/AssetClasses.js';
import InstrumentDetails from './components/instruments.js';
import Dashboard from './components/Dashboard.js';

import { Container } from '@mui/material';


         

function App() {
  return (
    <Router>
             <Navbar />
      <Container>
        <Routes>
        <Route path="/yourAssets" element={<AssetBook />} />
          <Route path="/placeOrder" element={<BuySellForm />} />
          <Route path="/cashflow-book" element={<CashFlowBook />} />
          <Route path="/order-book" element={<OrderBook />} />
          <Route path="/instrument/:type/:ticker" element={<InstrumentDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<AssetClasses />} />

          {/* Add other routes here */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
