import React from 'react';

// home page with featured laptops
const Home = () => {
  return (
    <main className="container my-5" role="main" itemScope itemType="http://schema.org/WebPage">
      <meta itemProp="description" content="Discover premium laptops at Laptop Mall. Wide selection of brands, competitive prices, and expert support." />
      <meta itemProp="keywords" content="laptops, gaming laptops, business laptops, MacBook, Dell XPS, HP Spectre" />
      <header className="bg-transparent shadow-none">
        {/* <h1 itemProp="headline">Welcome to Laptop Mall</h1> */}
        <section className="text-center">
          {/* <p className="lead" itemProp="description">Your one-stop shop for the latest and greatest laptops.</p> */}
          <img
            src="/images/home-banner.jpg"
            alt="Laptop Banner"
            className="img-fluid rounded"
            itemProp="image"
          />
        </section>
      </header>

      <section className="mt-5" aria-label="Featured Laptops">
        <h2 className="text-center mb-4">Featured Laptops</h2>
        <div className="row">
          <article className="col-md-4 mb-4" itemScope itemType="http://schema.org/Product">
            <div className="card h-100 border-0">
              <img
                src="https://m.media-amazon.com/images/I/51HfgJrUwpL._AC_SL1000_.jpg"
                alt="MacBook Air M1"
                className="card-img-top"
                itemProp="image"
              />
              <div className="card-body">
                <h3 className="card-title" itemProp="name">MacBook Air M1</h3>
                <p className="card-text">
                  <strong>Price:</strong> <span itemProp="price">$999</span>
                </p>
                <p className="card-text" itemProp="description">
                  <strong>Specifications:</strong> 8GB RAM, 256GB SSD, Apple M1 Chip
                </p>
              </div>
            </div>
          </article>

          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0">
              <img
                src="https://m.media-amazon.com/images/I/71ZQ2AIvBFL._AC_SL1500_.jpg"
                alt="Dell XPS 13"
                className="card-img-top"
              />
              <div className="card-body">
                <h3 className="card-title">Dell XPS 13</h3>
                <p className="card-text">
                  <strong>Price:</strong> $1299
                </p>
                <p className="card-text">
                  <strong>Specifications:</strong> 16GB RAM, 512GB SSD, Intel Core i7
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0">
              <img
                src="https://m.media-amazon.com/images/I/71-ZWCf548L._AC_SL1500_.jpg"
                alt="HP Spectre x360"
                className="card-img-top"
              />
              <div className="card-body">
                <h3 className="card-title">HP Spectre x360</h3>
                <p className="card-text">
                  <strong>Price:</strong> $1199
                </p>
                <p className="card-text">
                  <strong>Specifications:</strong> 16GB RAM, 1TB SSD, Intel Core i7
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;