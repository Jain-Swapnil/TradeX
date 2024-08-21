// src/components/Navbar.js

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TradeX
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/PlaceOrder">
            Order Book
          </Button>
          <Button color="inherit" component={Link} to="/yourAssets">
            Asset Book
          </Button>
          <Button color="inherit" component={Link} to="/order-book">
            Trade Book
          </Button>
          <Button color="inherit" component={Link} to="/cashflow-book">
            Cash Flow Book
          </Button>
          <Button color="inherit" component={Link} to="/dashboard">
            View Dashboard
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
