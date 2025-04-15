
import React, { useState, useEffect } from 'react';
import { getLaptopDetails } from '../services/aiHelper';
import { log } from '../utils/logger';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    price: '',
    image: '',
    specifications: '',
    rating: ''
  });

  // products
  useEffect(() => {
    fetch('/api/admin/productmanagement')
      .then(res => res.json())
      .then(data => {
        // Ensure data is an array
        const productsArray = Array.isArray(data) ? data : [];
        setProducts(productsArray);
      })
      .catch(() => {
        setProducts([]); // Set empty array on error
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/admin/productmanagement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(newProduct)
    })
    .then(res => res.json())
    .then(data => {
      setProducts([...products, { ...newProduct, id: data.productId }]);
      // Reset form
      setNewProduct({
        name: '',
        brand: '',
        price: '',
        image: '',
        specifications: '',
        rating: ''
      });
    })
    .catch(() => {});
  };

  const handleAIWizard = async () => {
    if (!newProduct.name) {
      alert('Please enter a product name first');
      return;
    }

    try {
      const details = await getLaptopDetails(newProduct.name);
      
      if (details) {
        setNewProduct({
          ...newProduct,
          ...details
        });
        log('Updated product details:', details);
      } else {
        log('No details returned from AI service');
      }
    } catch (error) {
      log('AI Wizard Error:', error);
      alert('Failed to get product details from AI service');
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">Product Management</h3>
      
      {/* Product List */}
      <div className="card mb-5">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">Current Products</h4>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Image</th>
                <th>Specifications</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(products) && products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>£{product.price}</td>
                  <td><img src={product.image} alt={product.name} className="img-thumbnail" style={{width: '80px'}} /></td>
                  <td className="text-truncate" style={{maxWidth: '200px'}}>{product.specifications}</td>
                  <td><span className="badge bg-success">{product.rating}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Form */}
      <div className="card">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">Add New Product</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name:</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  required
                />
                <button 
                  type="button" 
                  onClick={handleAIWizard}
                  className="btn btn-dark"
                >
                  AI Wizard 🪄
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Brand:</label>
              <input
                type="text"
                className="form-control"
                value={newProduct.brand}
                onChange={e => setNewProduct({...newProduct, brand: e.target.value})}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Price:</label>
              <input
                type="number"
                className="form-control"
                step="0.01"
                value={newProduct.price}
                onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Image URL:</label>
              <input
                type="text"
                className="form-control"
                value={newProduct.image}
                onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label">Specifications:</label>
              <textarea
                className="form-control"
                rows="3"
                value={newProduct.specifications}
                onChange={e => setNewProduct({...newProduct, specifications: e.target.value})}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Rating:</label>
              <input
                type="number"
                className="form-control"
                step="0.1"
                min="0"
                max="5"
                value={newProduct.rating}
                onChange={e => setNewProduct({...newProduct, rating: e.target.value})}
                required
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-dark">Add Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;