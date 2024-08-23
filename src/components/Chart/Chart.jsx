import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, BarElement, Filler } from 'chart.js';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, BarElement, Filler);

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({ cases: {}, deaths: {}, recovered: {} });

  useEffect(() => {
    const fetchMyAPI = async () => {
      try {
        const initialDailyData = await fetchDailyData();
        console.log('Daily data in Chart:', initialDailyData);
        setDailyData(initialDailyData);
      } catch (error) {
        console.error('Error fetching daily data:', error);
      }
    };

    fetchMyAPI();
  }, []);

  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
              data: [confirmed, recovered, deaths],
            },
          ],
        }}
        options={{
          plugins: {
            legend: { display: false },
            title: { display: true, text: `Current state in ${country}` },
          },
        }}
      />
    ) : null
  );

  const lineChart = (
    dailyData.cases && Object.keys(dailyData.cases).length ? (
      <Line
        data={{
          labels: Object.keys(dailyData.cases),
          datasets: [
            {
              data: Object.values(dailyData.cases),
              label: 'Infected',
              borderColor: '#3333ff',
              backgroundColor: 'rgba(0, 0, 255, 0.5)',
              fill: true,
            },
            {
              data: Object.values(dailyData.deaths),
              label: 'Deaths',
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
              fill: true,
            },
            {
              data: Object.values(dailyData.recovered),
              label: 'Recovered',
              borderColor: 'green',
              backgroundColor: 'rgba(0, 255, 0, 0.5)',
              fill: true,
            },
          ],
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    ) : null
  );

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  );
};

export default Chart;
