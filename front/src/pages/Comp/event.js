import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

const Event = () => {
    const [userType, setUserType] = useState("");
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [eventDetails, setEventDetails] = useState({
        eventName: "",
        eventPlace: "",
        eventDetails: "",
        eventDate: "",
        eventReference: "", // Removing initial value here
    });

    useEffect(() => {
        const token = localStorage.getItem("jw_token");
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            setUserId(decodedToken.id);
            setUserType(decodedToken.userType);
            setUserName(decodedToken.userName);
            console.log('userId', userId);
            console.log('userType', userType);
            console.log('userName', userName);
            // Fetch other necessary details from token if required
        }
    }, []);

    const handleEventFormSubmit = (e) => {
        e.preventDefault();
        // Update eventReference before submitting
        const updatedEventDetails = {
            ...eventDetails,
            eventReference: userName, // Assign the username as eventReference before sending the request
        };

        // Example POST request to save event details
        axios.post("http://localhost:5000/extras/create-event", updatedEventDetails)
            .then((response) => {
                // Handle success
                console.log("Event created:", response.data);
                alert('Event Created Successfully!')
                // Reset the form or update state as needed
                setEventDetails({
                    eventName: "",
                    eventPlace: "",
                    eventDetails: "",
                    eventDate: "",
                    eventReference: "",
                });
                setShowAddEvent(false); // Close the form after submission
            })
            .catch((error) => {
                // Handle error
                alert('Error creating event!!!')
                console.error("Error creating event:", error.response ? error.response.data.error : error.message);
            });
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <div style={{ backgroundColor: "#333", color: "#fff", padding: "20px", width: "200px", height: "100%", position: "fixed", left: 0, top: 0 }}>
                <Link to={`/home`} style={{ display: "block", textAlign: "center", color: "#06BBCC", marginBottom: "20px" }}>
                    Back to Home
                </Link>
                {userType === "INS" && (
                    <button onClick={() => setShowAddEvent(!showAddEvent)} style={{ display: "block", textAlign: "center", backgroundColor: "#06BBCC", color: "#fff", padding: "10px", border: "none", cursor: "pointer" }}>
                        Add Event
                    </button>
                )}
            </div>
            {showAddEvent && (
                <form onSubmit={handleEventFormSubmit} style={{ marginLeft: "200px", padding: "20px" }}>
                    <h2>Add Event</h2>
                    <label>Event Name:</label>
                    <input
                        type="text"
                        value={eventDetails.eventName}
                        onChange={(e) => setEventDetails({ ...eventDetails, eventName: e.target.value })} />

                    <label>Event Place:</label>
                    <input
                        type="text"
                        value={eventDetails.eventPlace}
                        onChange={(e) => setEventDetails({ ...eventDetails, eventPlace: e.target.value })} />

                    <label>Event Details:</label>
                    <textarea
                        value={eventDetails.eventDetails}
                        onChange={(e) => setEventDetails({ ...eventDetails, eventDetails: e.target.value })} style={{ width: "100%" }}></textarea>

                    <label>Event Date:</label>
                    <input
                        type="date"
                        value={eventDetails.eventDate}
                        onChange={(e) => setEventDetails({ ...eventDetails, eventDate: e.target.value })} />

                    <label>Event Reference:</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setEventDetails({ ...eventDetails, eventReference: e.target.value })}
                    />


                    <button type="submit">Create Event</button>
                </form>
            )}
        </div>
    );
};

export default Event;
