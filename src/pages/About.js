import React from 'react';

const About = () => {
  return (
    <main className="container my-5" role="main" itemScope itemType="http://schema.org/AboutPage">
      <meta itemProp="description" content="Learn about Laptop Mall - Your trusted destination for quality laptops and expert technical support since 2023." />
      <meta itemProp="keywords" content="laptop store, computer shop, tech support, laptop accessories" />
      
      <header className="bg-transparent shadow-none">
        <h1 className="text-center mb-4 text-dark"  itemProp="name">About Us</h1>
      </header>

      <section className="row" aria-label="Company Information">
        <div className="col-md-6 mb-4" itemScope itemType="http://schema.org/Organization">
          <meta itemProp="foundingDate" content="2023" />
          <meta itemProp="name" content="Laptop Mall" />
          <article className="pe-4">
            <h2 className="mb-3">Our Story</h2>
            <p className="mb-4" itemProp="description">
              Founded in 2023, Laptop Mall has become a trusted destination for quality laptops and tech accessories. 
              We pride ourselves on offering expert guidance and superior customer service.
            </p>
            <h3 className="mb-3">Why Choose Us?</h3>
            <ul className="list-unstyled">
              <li className="mb-2">✓ Expert technical support</li>
              <li className="mb-2">✓ Competitive pricing</li>
              <li className="mb-2">✓ Wide range of products</li>
              <li className="mb-2">✓ Fast delivery service</li>
            </ul>
          </article>
        </div>
        
        <div className="col-md-6 mb-4">
          <img
            src="/images/about-us.jpg"
            alt="Our Store Front"
            className="img-fluid rounded"
            itemProp="image"
          />
        </div>
      </section>
    </main>
  );
};

export default About;