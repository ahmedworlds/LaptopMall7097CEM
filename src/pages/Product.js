import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../App'; 
//  the top laptops
const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useContext(CartContext); 
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    fetch('/api/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(() => {});
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value
    };
    setFilters(newFilters);

    // apply all filters 
    let filtered = [...products];
    if (newFilters.brand) {
      filtered = filtered.filter(product => 
        product.brand.toLowerCase().includes(newFilters.brand.toLowerCase())
      );
    }
    if (newFilters.minPrice) {
      filtered = filtered.filter(product => 
        product.price >= Number(newFilters.minPrice)
      );
    }
    if (newFilters.maxPrice) {
      filtered = filtered.filter(product => 
        product.price <= Number(newFilters.maxPrice)
      );
    }
    setFilteredProducts(filtered);
  };

  //  reset function
  const handleReset = () => {
    setFilters({ brand: '', minPrice: '', maxPrice: '' });
    setFilteredProducts([...products]); 
  };

  return (
    <main className="container my-5">
      <h1 className="text-center mb-4">Our Products</h1>
      
      <div className="row mb-4">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by brand"
            name="brand"
            value={filters.brand}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Min price"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Max price"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-3">
          <button 
            className="btn btn-outline-dark w-100"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
      <section className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100 border-0">
              <img 
                src={product.image} 
                alt={product.name} 
                className="card-img-top object-fit-contain" 
                style={{ height: '250px' }}
              />
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p className="card-text"><strong>Brand:</strong> {product.brand}</p>
                <p className="card-text"><strong>Price:</strong> £{product.price}</p>
                <p className="card-text">
                  <strong>Specifications:</strong> {product.specifications}
                </p>
                <p className="card-text"><strong>Rating:</strong> {product.rating} / 5</p>
                <button
                  className="btn btn-dark w-100 btn-lg hover-btn"
                  onClick={() => addToCart(product)} 
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Products;