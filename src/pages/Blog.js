import React from 'react';

const Blog = () => {
  return (
    <main className="container my-5">
      <h1 className="text-center mb-4">Latest News</h1>
      <section className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <img
              src="/images/blog1.jpg"
              alt="New MacBook Air Released"
              className="card-img-top"
            />
            <div className="card-body">
              <h2 className="card-title">New MacBook Air Released</h2>
              <p className="card-text">
                Apple has launched the new MacBook Air with the M2 chip.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <img
              src="/images/blog2.jpg"
              alt="Best Laptops for Students"
              className="card-img-top"
            />
            <div className="card-body">
              <h2 className="card-title">Best Laptops for Students</h2>
              <p className="card-text">
                Check out our top picks for students on a budget.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <img
              src="/images/blog3.jpg"
              alt="Gaming Laptops in 2023"
              className="card-img-top"
            />
            <div className="card-body">
              <h2 className="card-title">Gaming Laptops in 2023</h2>
              <p className="card-text">
                Discover the best gaming laptops of the year.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;