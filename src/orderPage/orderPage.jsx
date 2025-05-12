import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './OrderPage.css';

const OrdersPage = () => {
  const location = useLocation();
  const { cartItems, totalAmount } = location.state || {};

  const steps = ['Preparation', 'Delivery', 'Completed'];
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const timer = setInterval(() => {
        setActiveStep((prevStep) =>
          prevStep < steps.length - 1 ? prevStep + 1 : prevStep
        );
      }, 5000); // Advance step every 5 seconds

      return () => clearInterval(timer); // Cleanup on unmount
    }
  }, [cartItems]);

  return (
    <div className="orders-container">
      <h1>Order Confirmation</h1>

      {/* Conditionally render Stepper Component */}
      {cartItems && cartItems.length > 0 && (
        <div className="stepper">
          {steps.map((label, index) => (
            <div key={index} className="step">
              <div
                className={`step-circle ${
                  index < activeStep
                    ? 'completed'
                    : index === activeStep
                    ? 'active'
                    : ''
                }`}
              >
                {index + 1}
              </div>
              <div className="step-label">{label}</div>
              {index < steps.length - 1 && <div className="step-line" />}
            </div>
          ))}
        </div>
      )}

      {/* Order Details */}
      {cartItems && cartItems.length > 0 ? (
        <div className="order-details">
          {cartItems.map((item) => (
            <div key={item.id} className="order-item">
              <img src={item.image} alt={item.name} />
              <div className="order-info">
                <h2>{item.name}</h2>
                <p>Price: ₹ {item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="order-summary">
            <h2>Total Amount: ₹ {totalAmount}</h2>
          </div>
        </div>
      ) : (
        <p>No order details available.</p>
      )}
    </div>
  );
};

export default OrdersPage;
