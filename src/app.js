import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import Products from './pages/Products';
import Orders from './pages/Orders';
import Layout from './components/Layout';
const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
