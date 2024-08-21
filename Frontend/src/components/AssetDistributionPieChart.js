import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AssetDistributionPieChart = ({ style }) => {
  const [chartData, setChartData] = useState(null); // Initialize as null to handle loading state

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/assets/totals');
        const totals = response.data;

        const data = {
          labels: ['Stocks', 'Bonds'],
          datasets: [
            {
              label: 'Asset Distribution',
              data: [totals.Stocks, totals.Bonds],
              backgroundColor: ['#FF6384', '#36A2EB'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            },
          ],
        };

        setChartData(data);
      } catch (error) {
        console.error('Error fetching totals:', error);
        setChartData(null); // Set to null in case of an error
      }
    };

    fetchTotals();
  }, []);

  return (
    <div>
      <h2>Distribution Across Asset Classes</h2>
      {chartData && chartData.datasets && chartData.datasets.length > 0 ? (
        <Pie data={chartData} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default AssetDistributionPieChart;

