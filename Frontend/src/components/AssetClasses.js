import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const colors = {
  background: '#f0f4f8', // Light background
  header: '#003366', // Dark blue for headers
  cardBackground: '#ffffff', // White for card backgrounds
  link: '#007bff', // Blue for links
  linkHover: '#0056b3', // Darker blue for link hover
  text: '#333333', // Dark grey for text
};

const styles = {
  container: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: colors.background,
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    color: colors.header,
    marginBottom: '20px',
  },
  section: {
    marginBottom: '20px',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: colors.cardBackground,
  },
  title: {
    color: colors.header,
    marginBottom: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    marginBottom: '8px',
  },
  link: {
    color: colors.link,
    textDecoration: 'none',
  },
  linkHover: {
    color: colors.linkHover,
  },
};

const AssetClasses = () => {
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

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Asset Classes</h1>
      
      <div style={styles.section}>
        <h2 style={styles.title}>Stocks (Equities)</h2>
        <ul style={styles.list}>
          {stocks.length > 0 ? (
            stocks.map(stock => (
              <li key={stock.tickerSymbol} style={styles.listItem}>
                <Link
                  to={`/instrument/stock/${stock.tickerSymbol}`}
                  style={styles.link}
                  onMouseOver={(e) => e.currentTarget.style.color = styles.linkHover.color}
                  onMouseOut={(e) => e.currentTarget.style.color = styles.link.color}
                >
                  {stock.companyName} ({stock.tickerSymbol})
                </Link>
              </li>
            ))
          ) : (
            <li>Loading stocks...</li>
          )}
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.title}>Bonds (Money Market)</h2>
        <ul style={styles.list}>
          {bonds.length > 0 ? (
            bonds.map(bond => (
              <li key={bond.tickerSymbol} style={styles.listItem}>
                <Link
                  to={`/instrument/bond/${bond.tickerSymbol}`}
                  style={styles.link}
                  onMouseOver={(e) => e.currentTarget.style.color = styles.linkHover.color}
                  onMouseOut={(e) => e.currentTarget.style.color = styles.link.color}
                >
                  {bond.issuer} ({bond.tickerSymbol})
                </Link>
              </li>
            ))
          ) : (
            <li>Loading bonds...</li>
          )}
        </ul>
      </div>
    </div>
  );
};


export default AssetClasses;