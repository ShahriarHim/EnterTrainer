import React, { useState } from 'react';
import './payment.css';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [alert, setAlert] = useState('');

  const handleCardNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setCardNumber(input);

    if (input.length === 10) {
      setAlert('Card number is valid');
    } else {
      setAlert('Invalid card number!');
    }
  };

  const handlePayment = () => {
    if (cardNumber.length === 10) {
      setAlert('Subscription successful!');
    } else {
      setAlert('Invalid card number. Please enter exactly 10 digits.');
    }
  };
  
  

  return (
    <div className="payment-card">
      <h2>Payment Details</h2>
      <div className="card-number">
        <label>Card Number:</label>
        <input type="text" value={cardNumber} onChange={handleCardNumberChange} maxLength="10" />
      </div>
      {alert && <p className="alert">{alert}</p>}
      <button onClick={handlePayment}>Subscribe</button>
    </div>
  );
};

export default Payment;
