
import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import { log } from '../utils/logger';

// shows all the money made by users
const SalesReport = () => {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({
    customerSales: [],
    timelineSales: []
  });

  useEffect(() => {
    log('Fetching sales data...');
    fetch('/api/admin/salesreport', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        log('Response status:', res.status);
        if (!res.ok) {
          return res.json().then(err => {
            throw new Error(err.error || 'Failed to fetch sales data');
          });
        }
        return res.json();
      })
      .then(data => {
        log('Sales data:', data);
        setSales(data);
      })
      .catch(err => {
        log('Detailed error:', err);
        setError(err.message);
      });
  }, []);

  useEffect(() => {
    if (sales.length > 0) {
      // group and sum sales by customer
      const customerSalesMap = sales.reduce((acc, sale) => {
        const customer = sale.user_name;
        acc[customer] = (acc[customer] || 0) + Number(sale.total_amount);
        return acc;
      }, {});

      // Convert to chart format
      const customerData = [["Customer", "Sales"]];
      Object.entries(customerSalesMap).forEach(([customer, total]) => {
        customerData.push([customer, total]);
      });

      // prepare data for timeline chart
      const timelineData = [["Date", "Amount"]];
      sales.forEach(sale => {
        timelineData.push([new Date(sale.created_at), Number(sale.total_amount)]);
      });

      setChartData({
        customerSales: customerData,
        timelineSales: timelineData
      });
    }
  }, [sales]);

  return (
    <div className="container py-4">
      {/* Charts Section First */}
      <div className="row mb-4">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-dark text-white">
              <h4 className="mb-0">Sales by Customer</h4>
            </div>
            <div className="card-body">
              {chartData.customerSales.length > 0 && (
                <Chart
                  chartType="PieChart"
                  data={chartData.customerSales}
                  options={{
                    title: "Sales Distribution",
                    is3D: true,
                    backgroundColor: 'transparent'
                  }}
                  width="100%"
                  height="400px"
                />
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-dark text-white">
              <h4 className="mb-0">Sales Timeline</h4>
            </div>
            <div className="card-body">
              {chartData.timelineSales.length > 0 && (
                <Chart
                  chartType="LineChart"
                  data={chartData.timelineSales}
                  options={{
                    title: "Sales Over Time",
                    curveType: "function",
                    legend: { position: "bottom" },
                    backgroundColor: 'transparent'
                  }}
                  width="100%"
                  height="400px"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table Section After */}
      <div className="card">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Sales Report</h3>
          <span className="badge bg-light text-dark">Total Records: {sales.length}</span>
        </div>
        
        <div className="card-body table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {sales.map(sale => (
                <tr key={sale.id}>
                  <td>{sale.id}</td>
                  <td>{sale.user_name}</td>
                  <td>
                    <span className="badge bg-success">
                      £{Number(sale.total_amount).toFixed(2)}
                    </span>
                  </td>
                  <td>{new Date(sale.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger mt-4" role="alert">
          Error loading sales: {error}
        </div>
      )}
    </div>
  );
};

export default SalesReport;