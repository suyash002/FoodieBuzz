import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} from '../redux/slices/cartSlice';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  // Handle payment
  const handlePayment = async () => {
    const res = await loadRazorpayScript();
  
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }
  
    const options = {
      key: 'rzp_test_Mkl4nkfO1KzILS',
      amount: totalAmount * 100,
      currency: 'INR',
      name: 'Foodiebuzz',
      description: 'Test Transaction',
      image: 'https://yourlogo.url/logo.png',
      handler: function (response) {
        alert('Payment successful!');
        navigate('/orders', { state: { cartItems, totalAmount } });
        dispatch(clearCart());
      },
      prefill: {
        name: 'Suyash Upadhyay',
        email: 'getontosuyash@gmail.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#F37254',
      },
    };
  
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-info">
                <h2>{item.name}</h2>
                <p>₹ {item.price}</p>
                <div className="quantity-controls">
                  <div className="wrap">
                    <button
                      onClick={() => dispatch(decrementQuantity(item.id))}
                      className="btn quantity-btn"
                    >
                      −
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(incrementQuantity(item.id))}
                      className="btn quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="btn secondary"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h2>Total: ₹ {totalAmount}</h2>
            <button onClick={handlePayment} className="btn primary">
              Place Order
            </button>
            <button onClick={() => dispatch(clearCart())} className="btn secondary">
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
