import React, { useState, useEffect } from 'react';
import './chat.css';
import SendMessage from './sendMessage';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import useInterval from './useInterval';


const defaultAvatar = 'https://cdn4.iconfinder.com/data/icons/business-and-office-glyphs-vol-2/52/chat__comment__message__user__avatar-512.png'; // Replace with your default avatar URL

const Chat = ({ courseMessages, courseId }) => {
    const [messages, setMessages] = useState(courseMessages);
    const token = localStorage.getItem('jw_token');
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/course-content/messages/${courseId}`); // Adjust the endpoint
            console.log('Fetched messages:', response.data);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchMessages();
        };
        fetchData();
    }, [fetchMessages, courseId]); // Include fetchMessages in the dependency array

    useInterval(() => {
        fetchMessages();
    }, 2000);

    useEffect(() => {
        setMessages(courseMessages); // Update state when courseMessages prop changes
    }, [courseMessages]);


    return (
        <div className="chat-wrapper">
            <div className="chat-container">
                <div className="chat-messages">
                    {courseMessages.map((message) => (
                        <div className={`message ${message.userId === userId ? 'sent' : 'received'}`} key={message._id}>
                            <div className="sender-details">
                                {/* Default avatar */}
                                <img src={defaultAvatar} alt="Default avatar" />

                                {/* Display the sender's name */}
                                <span className="sender-name">
                                    {message.userId.name}
                                </span>
                            </div>

                            {/* Display the message content */}
                            <div className="message-contents" style={{ fontSize: '25px', color: '#000' }}>
                                <p>{message.message}</p>
                            </div>

                            {/* Display the message timestamp */}
                            <div className="message-timestamp">
                                {new Date(message.timestamp).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chat input */}
                <SendMessage courseId={courseId} />
            </div>
        </div>
    );
};

export default Chat;
