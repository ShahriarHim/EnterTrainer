import React, { useState,useEffect } from 'react';
import './payment.css';
import jwt_decode from "jwt-decode"
import { useNavigate, useParams  } from 'react-router-dom';


const Payment = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [alert, setAlert] = useState('');
  const { courseId } = useParams(); // State to store courseId

  useEffect(() => {
    console.log(localStorage.getItem('jw_token'));
  }, []);
  
  

  const handleCardNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); 
    setCardNumber(input);

    if (input.length === 10) {
      setAlert('Card number is valid');
    } else {
      setAlert('Invalid card number!');
    }
  };

  const handlePayment = async () => {
    try {
      if (cardNumber.length === 10) {
        const token = localStorage.getItem('jw_token');
  
        // Decode the token to get user data
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.id;
        
  
        const requestBody = JSON.stringify({ user_Id: userId, course_Id: courseId });
        // console.log('userId', userId);
        // console.log("course Id", courseId);
        const response = await fetch('http://localhost:5000/course/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the JWT token in the header
          },
          body: requestBody,
        });
  
        if (response.ok) {
          const responseData = await response.json();
          setAlert(responseData.message); // Show subscription status
          navigate('/show-courses'); // Navigate to /home after successful subscription
        } else {
          throw new Error('Failed to subscribe'); // Throw error for non-successful response
        }
      }
    } catch (error) {
      console.error('Fetch request failed:', error);
      setAlert('Failed to make the request. Please try again.');
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