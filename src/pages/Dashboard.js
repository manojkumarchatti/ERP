import React from 'react';
import { Bar,Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import products from '../db/data'
import orders from '../db/orders';

const data1 = {
  labels: products.map(datum=>datum.name),
  datasets: [
    {
      label: 'Stock Quantity',
      data: products.map(product=>parseInt(product.stock_quantity)),
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
    },
  ],
};

const data2 = {
  labels: products.map(datum=>datum.name),
  datasets: [
    {
      label: 'Stock Price',
      data: products.map(product=>parseInt(product.price.slice(1,-1))),
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    xAxes: [{
      ticks: {
        autoSkip: false,
        maxRotation: 90,
        minRotation: 90
      }
    }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const statusCounts = orders.reduce((counts, order) => {
  counts[order.status] = (counts[order.status] || 0) + 1;
  return counts;
}, {});

const data3 = {
  labels: Object.keys(statusCounts),
  datasets: [
    {
      data: Object.values(statusCounts),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#A3A0FB'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#A3A0FB']
    }
  ]
};

const Dashboard = () => (
  <>
    <div className='header'>
      <h1 className='title'>Product Stock Quantity</h1>
    </div>
    <div style={{height: '500px', width: '1000px'}}>
    <Bar data={data1}  options={options}/>
    </div>
    <div className='header'>
      <h1 className='title'>Product Price Ranges</h1>
    </div>
    <div style={{height: '500px', width: '1000px'}}>
    <Bar data={data2}  options={options}/>
    </div>
    <div className='header'>
      <h1 className='title'>Delivery Statuses</h1>
    </div>
    <div style={{height: '500px', width: '1000px'}}>
    <Pie data={data3} />
    </div>
  </>
);

export default Dashboard;
