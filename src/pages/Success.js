import React, { useState, useEffect } from 'react';

// shows after buying somthing
const Success = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length > 0) {
      localStorage.removeItem('cart');
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sessionId = queryParams.get('session_id'); 

    // log('Session ID from URL:', sessionId); 

    if (sessionId) {
      fetch(`http://localhost:5000/verify-payment-session?session_id=${sessionId}`)
        .then((res) => {
          // log('Backend response:', res); 
          return res.json();
        })
        .then((data) => {
          // log('Payment verification data:', data); 

          if (data.status === 'success') {
            const parsedCart = data.cart.map(item => ({
              ...item,
              price: parseFloat(item.price),
            }));

            //  payment was successful
            setOrderDetails({
              ...data,
              cart: parsedCart,
            });
          } else {
            // failed payment
            setOrderDetails({ error: 'Payment Failed' });
          }
          setLoading(false);
        })
        .catch(() => {
          // log('Error verifying payment:', error);
          setOrderDetails({ error: 'Payment Failed' }); 
          setLoading(false); 
        });
    } else {
      // log('No session_id in URL');
      setOrderDetails({ error: 'No session_id in URL' }); 
      setLoading(false); 
    }
  }, []);

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  // error state
  if (orderDetails?.error) {
    return (
      <div className="container my-5 text-center">
        <h1>{orderDetails.error}</h1>
      </div>
    );
  }

  // success state with order details
  return (
    <div className="container my-5 text-center">
      {/* Payment Success Title */}
      <h1 className="text-success">Payment Successful</h1>

      {/* Success Image */}
      <img
        src="/images/payment-success.gif"
        alt="Payment Success"
        className="img-fluid d-block mx-auto mb-4"
        style={{ width: '150px', height: '150px' }}
      />

      {/* Order Details Section */}
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <h3 className="mb-3">Order Details</h3>
        <p><strong>Order ID:</strong> {orderDetails.orderId.slice(-20)}</p>
        <p><strong>Total Amount:</strong> £{parseFloat(orderDetails.totalAmount).toFixed(2)}</p>
        <h4 className="mt-3">Items Purchased:</h4>
        <ul className="list-group list-group-flush">
          {orderDetails.cart.map((item, index) => (
            <li key={index} className="list-group-item">
              {item.name} - £{item.price.toFixed(2)} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Success;