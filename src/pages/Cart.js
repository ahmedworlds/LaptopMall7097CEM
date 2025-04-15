import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';

const Cart = ({ toggleCartPanel }) => {
  const { cart, removeFromCart } = useContext(CartContext);

  //  total price 
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className="container my-5">
      <h1 className="text-center mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/products">Go shopping!</Link></p>
      ) : (
        <>
          <section>
            {cart.map((item) => (
              <div key={item.id} className="card mb-3">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="card-title">{item.name}</h2>
                    <p className="card-text"><strong>Price:</strong> ${item.price}</p>
                    <p className="card-text"><strong>Quantity:</strong> {item.quantity}</p>
                  </div>
                  <div>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
          <div className="d-flex justify-content-between align-items-center">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <Link
              to="/checkout"
              className="btn btn-primary"
              onClick={toggleCartPanel} 
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </main>
  );
};

export default Cart;