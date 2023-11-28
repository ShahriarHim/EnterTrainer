import React, { useState, useEffect } from 'react';
import './payment.css';
import jwt_decode from "jwt-decode"
import { useNavigate, useParams } from 'react-router-dom';


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
          navigate('/enrolled-courses'); // Navigate to /home after successful subscription
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
    <div className="container p-0">
      <div className="card px-4">
        <p className="h8 py-3">Payment Details</p>
        <div className="row gx-3">
          <div className="col-12">
            <div className="d-flex flex-column">
              <p className="text mb-1">Person Name</p>
              <input 
              className="form-control mb-3" 
              type="text" 
              placeholder="Name" 
              />
            </div>
          </div>
          <div className="col-12">
            <div className="d-flex flex-column">
              <p className="text mb-1">Card Number</p>
              <input
                className="form-control mb-3"
                type="text"
                placeholder="1234 5678 435678"
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength="10"
              />
            </div>
          </div>
          <div class="col-6">
            <div class="d-flex flex-column">
              <p class="text mb-1">Expiry</p>
              <input 
                className="form-control mb-3"
                type="text" 
                placeholder="MM/YYYY"
                />
            </div>
          </div>
          <div class="col-6">
            <div class="d-flex flex-column">
              <p class="text mb-1">CVV/CVC</p>
              <input 
              className="form-control mb-3 pt-2 "
              type="password" 
              placeholder="***"
              />
            </div>
          </div>
          {alert && <p className="alert">{alert}</p>}
          <div className="col-12">
            <div className="btn btn-primary mb-3" onClick={handlePayment}>
              <span className="ps-3">Enroll</span>
              <span className="fas fa-arrow-right"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;