
import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../App';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_hc2EkRSerTEECYnSaqvVDQdh'); 

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const [address, setAddress] = useState(null); 
  const [coordinates, setCoordinates] = useState(null); 

  // total price 
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  //  GPS coordinates and address 
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          setCoordinates({ latitude, longitude });

          try {
            const apiKey = '1aa8180ceaef4d26be004c84ac310d51'; 
            const url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}&pretty=1&no_annotations=1`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch address');
            const data = await response.json();
            setAddress(data.results[0]?.formatted || 'Address not found');
          } catch (_error) {
            // log('Geocoding error:', error);
            setAddress('Address not found');
          }
        },
        () => {
          alert('Unable to retrieve your location. Please try again.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  }, []);

  // Stripe Checkout
  const handleCheckout = async () => {
    if (!coordinates) {
      alert('Unable to retrieve your location. Please try again.');
      return;
    }

    const { latitude, longitude } = coordinates;

    //  user ID from JWT token 
    const token = localStorage.getItem('token');
    let userId;
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
      userId = decodedToken.userId; // Extract userId
    }

    if (!userId) {
      alert('User not logged in. Please log in to proceed.');
      return;
    }
    // Remove log('User ID:', userId);
    
    try {
      // Create sales order
      await fetch('http://localhost:5000/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          cart,
          totalAmount: totalPrice,
          latitude,
          longitude,
        }),
      });

      // Stripe Checkout
      const stripe = await stripePromise;

      // Create a checkout Session
      const response = await fetch('http://localhost:5000/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart,
          userId,
          latitude,
          longitude,
        }),
      });

      const session = await response.json();

      localStorage.removeItem('cart');

      // Redirect to Stripe Checkout page
      const { error } = await stripe.redirectToCheckout({ sessionId: session.id });

      if (error) {
        alert('An error occurred while processing your order. Please try again.');
      }
    } catch (error) {
      // log('Error during checkout:', error);
      alert('An error occurred while processing your order. Please try again.');
    }
  };

  return (
    <main className="container my-5">
      <h1 className="text-center mb-4">Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. Please add items before checking out.</p>
      ) : (
        <>

          <section>
            {cart.map((item) => (
              <div key={item.id} className="card mb-3">
                <div className="card-body">
                  <h2 className="card-title">{item.name}</h2>
                  <p className="card-text"><strong>Price:</strong> ${item.price}</p>
                  <p className="card-text"><strong>Quantity:</strong> {item.quantity}</p>
                </div>
              </div>
            ))}
          </section>

          <div className="d-flex justify-content-between align-items-center">
            <h3>Total: £{totalPrice.toFixed(2)}</h3>
            <button className="btn btn-success" onClick={handleCheckout}>
              Pay Now
            </button>
          </div>

          {/* Display Address */}
          {coordinates && (
            <div className="mb-3 m-5">
              <h4>Delivery Address (Auto Detected)</h4>
              <p><strong>Latitude:</strong> {coordinates.latitude}</p>
              <p><strong>Longitude:</strong> {coordinates.longitude}</p>
              <p><strong>Formatted Address:</strong> {address || 'Fetching address...'}</p>
            </div>
          )}

        </>
      )}
    </main>
  );
};

export default Checkout;