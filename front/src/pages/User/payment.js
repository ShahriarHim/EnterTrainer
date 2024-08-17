import React, { useState, useEffect } from 'react';
import './payment.css';
import jwt_decode from "jwt-decode"
import { useNavigate, useParams } from 'react-router-dom';


const Payment = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [alert, setAlert] = useState('');
  const { courseId } = useParams(); // State to store courseId
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [token, setToken] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('jw_token');
    const decodedToken = jwt_decode(token);
    const { id, userType } = decodedToken;

    // Set the values in state
    setUserId(id);
    setUserType(userType);
    setToken(token);

    console.log('Token:', token);
    console.log('User ID:', id);
    console.log('User Type:', userType);
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
      if (userType === 'Student') {
        if (cardNumber.length === 10) {
          // const token = localStorage.getItem('jw_token');

          // Decode the token to get user data
          // const decodedToken = jwt_decode(token);
          // const userId = decodedToken.id;



          const requestBody = JSON.stringify({ user_Id: userId, course_Id: courseId });
          // console.log('userId', userId);
          // console.log("course Id", courseId);
          const response = await fetch('http://entertrainer-2.onrender.com/course/subscribe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Include the JWT token in the header
            },
            body: requestBody,
          });

          if (response.ok) {
            const responseData = await response.json();
            setAlert(responseData.message);
            navigate('/enrolled-courses');
          } else {
            throw new Error('Failed to subscribe');
          }
        };
      } else {
        const requestBody = JSON.stringify({ instructorId: userId, courseId: courseId });
        const response = await fetch('http://entertrainer-2.onrender.com/course/instructor-enrollment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the JWT token in the header
          },
          body: requestBody,
        });
        if (response.ok) {
          const responseData = await response.json();
          // alert('Courses Added!');
          setAlert(responseData.message);
          navigate('/taken-courses');
        } else {
          throw new Error('Failed to Add');
        }

      }
    } catch (error) {
      console.error('Fetch request failed:', error);
      setAlert('Failed to make the request. Please try again.');
    }
  };





  return (
    <div className="centered-container">
      <div className="card px-4">
        {userType === 'Student' && (
          <p className="h8 py-3">Payment Details</p>
        )}
        {userType === 'Student' && (
          <div className="row gx-3">
            {/* Person Name input */}
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

            {/* Card Number input */}
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


          </div>
        )}
        {userType === 'INS' && (
          <div className="col-12">
            <br></br><br></br>
            <div className="d-flex flex-column">
              <p className="text mb-1">Enter Instructor ID</p>
              <input
                className="form-control mb-3"
                type="text"
                placeholder="Instructor ID"
              />
            </div>
          </div>
        )}

        {/* Alert message */}
        {alert && <p className="alert">{alert}</p>}

        {/* Enrollment/Confirmation button */}
        <div className="col-12">
          <div
            className="btn btn-primary mb-3"
            onClick={handlePayment}
          >
            {/* Button text based on user type */}
            {userType === 'INS' ? (
              <>
                <span className="ps-3">Confirm</span>
                <span className="fas fa-arrow-right"></span>
              </>
            ) : (
              <>
                <span className="ps-3">Enroll</span>
                <span className="fas fa-arrow-right"></span>
              </>

            )}
          </div>
        </div>
      </div>
    </div>

  )
};


export default Payment;