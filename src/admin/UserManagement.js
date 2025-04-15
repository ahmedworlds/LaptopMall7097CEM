
import React, { useState, useEffect } from 'react';
import { log } from '../utils/logger';

// manage all the userss
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/admin/usermanagement', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUsers(data);
      })
      .catch(() => {
        setError('Failed to load users');
      });
  }, []);

  const handleRoleChange = (userId, newRole) => {
    fetch(`/api/admin/usermanagement/${userId}/role`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ role: newRole })
    })
      .then(res => res.json())
      .then(data => {
        log('Role updated:', data);
        //update the users list with the new role
        setUsers(users.map(user => 
          user.id === userId ? { ...user, role: newRole } : user
        ));
      })
      .catch(err => {
        log('Error updating role:', err);
        setError('Failed to update role');
      });
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container py-4">
      <h3 className="mb-4">User Management</h3>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <select
                    className="form-select form-select-sm w-auto"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default UserManagement;