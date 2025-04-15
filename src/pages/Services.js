import React from 'react';

const Services = () => {
  return (
    <main className="container my-5" role="main" itemScope itemType="http://schema.org/Service">
      <meta itemProp="description" content="Professional laptop services including repairs, upgrades, maintenance, and technical support." />
      <meta itemProp="keywords" content="laptop repair, computer maintenance, tech support, hardware upgrade" />
      <meta itemProp="provider" content="Laptop Mall" />
      <header className="bg-transparent shadow-none">
        <meta itemProp="description" content="Explore our services for laptop sales, repairs, and accessories" />
        <h1 className="text-center mb-4 text-dark" itemProp="name">Our Services</h1>
      </header>
      
      <section className="row" aria-label="Services Overview">
        <article className="col-md-4 mb-4" itemScope itemType="http://schema.org/Service">
          <div className="card h-100" role="article">
            <img
              src="/images/service-sales.jpg"
              alt="Laptop Sales - Display of modern laptops"
              className="card-img-top"
              itemProp="image"
            />
            <div className="card-body">
              <h2 className="card-title" itemProp="name">Laptop Sales</h2>
              <p className="card-text" itemProp="description" aria-label="Laptop sales service description">
                Explore our wide range of laptops from top brands like Apple, Dell,
                HP, and more. We offer the latest models at competitive prices.
              </p>
            </div>
          </div>
        </article>

        <article className="col-md-4 mb-4">
          <div className="card h-100" role="article">
            <img
              src="/images/service-repair.jpg"
              alt="Laptop Repair - Technician working on laptop"
              className="card-img-top"
            />
            <div className="card-body">
              <h2 className="card-title">Repair Services</h2>
              <p className="card-text" itemProp="description">
                Get your laptop repaired by our expert technicians. We handle
                everything from screen replacements to hardware upgrades.
              </p>
            </div>
          </div>
        </article>

        <article className="col-md-4 mb-4">
          <div className="card h-100" role="article">
            <img
              src="/images/service-accessories.jpg"
              alt="Laptop Accessories - Various computer peripherals"
              className="card-img-top"
            />
            <div className="card-body">
              <h2 className="card-title">Accessories</h2>
              <p className="card-text" itemProp="description">
                Find the perfect accessories for your laptop, including bags,
                chargers, mice, and more.
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Services;