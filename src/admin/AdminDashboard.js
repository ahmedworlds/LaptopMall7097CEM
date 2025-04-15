
import React from 'react';
import { Routes, Route, Link, Navigate} from 'react-router-dom';
// import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import UserManagement from './UserManagement';
import ProductManagement from './ProductManagement';
import SalesReport from './SalesReport';

// dashbord for admin 
const AdminDashboard = () => {
  // const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  //  admin access check
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="admin-dashboard">

      <nav className="bg-dark mb-4">
        <ul className="nav nav-pills justify-content-center gap-3">
          <li className="nav-item">
            <Link to="/admin/usermanagement" className="nav-link text-light">Users</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/productmanagement" className="nav-link text-light">Products</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/salesreport" className="nav-link text-light">Sales</Link>
          </li>
        </ul>
      </nav>

      <div className="admin-content">
        <Routes>
          <Route index element={<Navigate to="usermanagement" replace />} />
          <Route path="usermanagement" element={<UserManagement />} />
          <Route path="productmanagement" element={<ProductManagement />} />
          <Route path="salesreport" element={<SalesReport />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;