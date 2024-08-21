import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const colors = {
  background: '#f9f9f9',
  header: '#003366',
  subHeader: '#004080',
  cardBackground: '#ffffff',
  text: '#333333',
  border: '#e1e1e1',
  buttonBackground: '#007bff',
  buttonHover: '#0056b3',
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: colors.background,
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    color: colors.header,
    marginBottom: '20px',
    textAlign: 'center',
  },
  section: {
    marginBottom: '20px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: colors.cardBackground,
    border: `1px solid ${colors.border}`,
  },
  subHeader: {
    color: colors.subHeader,
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
  },
  subHeaderIcon: {
    fontSize: '40px',
    marginRight: '10px',
  },
  text: {
    color: colors.text,
    marginBottom: '10px',
    fontSize: '16px',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: colors.buttonBackground,
    color: '#ffffff',
    textAlign: 'center',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '20px',
  },
  buttonHover: {
    backgroundColor: colors.buttonHover,
  },
};

const InstrumentDetails = () => {
  const { type, ticker } = useParams();
  const [instrumentDetails, setInstrumentDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const endpoint = type === 'stock' ? `http://localhost:8082/api/assets/stocks/${ticker}` : `http://localhost:8082/api/assets/bonds/${ticker}`;

    axios.get(endpoint)
      .then(response => {
        setInstrumentDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the instrument details!', error);
      });
  }, [type, ticker]);

  if (!instrumentDetails) {
    return <div style={styles.container}>Loading...</div>;
  }

  const formatNumber = (number) => {
    return number !== undefined && number !== null ? number.toFixed(2) : 'N/A';
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Instrument Details</h1>
      <div style={styles.section}>
        {type === 'stock' ? (
          <>
            <h2 style={styles.subHeader}>
              <i className="fas fa-chart-line" style={styles.subHeaderIcon}></i>
              {instrumentDetails.companyName}
            </h2>
            <p style={styles.text}>Ticker Symbol: <strong>{instrumentDetails.tickerSymbol}</strong></p>
            <p style={styles.text}>Price: <strong>${formatNumber(instrumentDetails.stockPrice)}</strong></p>
            <p style={styles.text}>52-Week High: <strong>${formatNumber(instrumentDetails.week52High)}</strong></p>
            <p style={styles.text}>52-Week Low: <strong>${formatNumber(instrumentDetails.week52Low)}</strong></p>
            <p style={styles.text}>Average Volume: <strong>{instrumentDetails.averageVolume || 'N/A'}</strong></p>
            <p style={styles.text}>Industry: <strong>{instrumentDetails.industry || 'N/A'}</strong></p>
            <p style={styles.text}>Market Exchange: <strong>{instrumentDetails.marketExchange || 'N/A'}</strong></p>
          </>
        ) : (
          <>
            <h2 style={styles.subHeader}>
              <i className="fas fa-balance-scale" style={styles.subHeaderIcon}></i>
              {instrumentDetails.issuer}
            </h2>
            <p style={styles.text}>Ticker Symbol: <strong>{instrumentDetails.tickerSymbol}</strong></p>
            <p style={styles.text}>Coupon Rate: <strong>{instrumentDetails.couponRate !== undefined ? `${instrumentDetails.couponRate}%` : 'N/A'}</strong></p>
            <p style={styles.text}>Face Value: <strong>${formatNumber(instrumentDetails.faceValue)}</strong></p>
            <p style={styles.text}>Maturity Date: <strong>{instrumentDetails.maturityDate ? new Date(instrumentDetails.maturityDate).toLocaleDateString() : 'N/A'}</strong></p>
            <p style={styles.text}>Credit Rating: <strong>{instrumentDetails.creditRating || 'N/A'}</strong></p>
            <p style={styles.text}>Bond Price: <strong>${formatNumber(instrumentDetails.bondPrice)}</strong></p>
          </>
        )}
        <button
          style={styles.button}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
          onClick={() => navigate('/')}
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default InstrumentDetails;







