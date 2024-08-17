import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';


const SendMessage = ({ courseId }) => {
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');




    const handleMessageSubmit = async () => {
        try {
            const token = localStorage.getItem('jw_token');

            // Decode the token to get user data
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.id;
            console.log('user id', userId);
            const response = await axios.post('http://entertrainer-2.onrender.com/course-content/messages', {
                courseId,
                userId,
                message
            });
            if (response.status === 201) {
                setResponseMessage('Message sent successfully!');
                // Clear the message input after sending
                setMessage('');
            } else {
                setResponseMessage('Failed to send message');
            }
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            setResponseMessage('Failed to send message');
            // Handle error if needed
        }

};

return (
    <div>
    <nav className="chat-input">
        <input
            type="text"
            name="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />
        <div className="icondiv">
            {/* <i className="fa fa-paperclip"></i> */}
            <i className="fa fa-arrow-circle-right" onClick={handleMessageSubmit}></i>
        </div>
    </nav>
    <div>{responseMessage}</div>
</div>
);
};

export default SendMessage;