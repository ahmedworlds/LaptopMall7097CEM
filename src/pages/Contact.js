import React from 'react';

// contact form 
const Contact = () => {
  // handle form is sent
  const handleSubmit = async (e) => {
    // dont refresh the hole page
    e.preventDefault();
    const subject = encodeURIComponent("Contact from Laptop Mall");
    const body = encodeURIComponent(`Name: ${e.target.name.value}\nMessage: ${e.target.message.value}`);
    window.location.href = `mailto:info@laptopmall.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="container my-5" role="main" itemScope itemType="http://schema.org/ContactPage">
      <meta itemProp="description" content="Contact Laptop Mall for sales inquiries, technical support, and customer service." />
      <meta itemProp="keywords" content="contact us, customer support, tech help, laptop sales" />
      <meta itemProp="email" content="support@laptopmall.com" />
      <meta itemProp="telephone" content="+1-234-567-8900" />
      <header className="bg-transparent shadow-none">
        <h1 className="text-center mb-4 text-dark" itemProp="name">Contact Us</h1>
      </header>

      <section className="row" aria-label="Contact Information">
        <div className="col-md-6 mb-4" itemScope itemType="http://schema.org/Organization">
          <h2 className="mb-3">Get in Touch</h2>
          <p>Have questions? Reach out to us! We are here to help you find the perfect laptop.</p>
          <address>
            <ul className="list-unstyled" itemProp="address">
              <li className="mb-2">
                <strong>Email: </strong>
                <a href="mailto:info@laptopmall.com" itemProp="email">info@laptopmall.com</a>
              </li>
              <li className="mb-2">
                <strong>Phone: </strong>
                <a href="tel:+1234567890" itemProp="telephone">+123 456 7890</a>
              </li>
              <li className="mb-2" itemProp="address">
                <strong>Address: </strong>123 Laptop Street, Tech City
              </li>
            </ul>
          </address>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" required />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea className="form-control" id="message" rows="4" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Email</button>
          </form>
        </div>
        
        <div className="col-md-6 mb-4">
          <img
            src="/images/contact-us.jpg"
            alt="Contact Us"
            className="img-fluid rounded"
            itemProp="image"
          />
        </div>
      </section>
    </main>
  );
};

export default Contact;