import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

const Event = () => {
    const [userType, setUserType] = useState("");
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [showOngoingEvents, setShowOngoingEvents] = useState(false);
    const [events, setEvents] = useState([]);
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

        axios.get("http://entertrainer-2.onrender.com/extras/show-events")
            .then((response) => {
                setEvents(response.data.events);
            })
            .catch((error) => {
                console.error("Error fetching events:", error.response ? error.response.data.error : error.message);
            });
    }, []);

    const handleEventFormSubmit = (e) => {
        e.preventDefault();
        // Update eventReference before submitting
        const updatedEventDetails = {
            ...eventDetails,
            eventReference: userName, // Assign the username as eventReference before sending the request
        };

        // Example POST request to save event details
        axios.post("http://entertrainer-2.onrender.com/extras/create-event", updatedEventDetails)
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

    const handleApplyClick = (eventId) => {
        // Perform eligibility checks here
        // For example, check if the event allows the user to apply based on some conditions

        // Mock eligibility check - You need to replace this logic with your actual eligibility check logic
        const isEligible = true; // Replace this with your eligibility logic

        // If eligible, update the UI
        const updatedEvents = events.map((event) => {
            if (event._id === eventId && isEligible) {
                return { ...event, applicationStatus: "Application Sent" };
            }
            return event;
        });

        setEvents(updatedEvents);
    };
    useEffect(() => {
        if (userType === "Student") {
            setShowOngoingEvents(true);
        }
    }, [userType]);


    return (
        <div style={{ height: "100vh" }}>
            <div style={{ backgroundColor: "#333", color: "#fff", padding: "20px", width: "200px", height: "100%", position: "fixed", left: 0, top: 0 }}>
                <Link to={`/home`} style={{ display: "block", textAlign: "center", color: "#06BBCC", marginBottom: "20px" }}>
                    Back to Home
                </Link>
                {userType === "INS" && (
                    <div>
                        <button onClick={() => setShowAddEvent(!showAddEvent)} style={{ display: "block", textAlign: "center", backgroundColor: "#06BBCC", color: "#fff", padding: "10px", border: "none", cursor: "pointer" }}>
                            Add Event
                        </button>
                        <button onClick={() => setShowOngoingEvents(!showOngoingEvents)} style={{ display: "block", textAlign: "center", backgroundColor: "#06BBCC", color: "#fff", padding: "10px", border: "none", cursor: "pointer", marginTop: "10px" }}>
                            Show Events
                        </button>
                    </div>
                )}
            </div>
            <div style={{ marginLeft: '20px', padding: '20px', width: '50%' }}>
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

            {/* <h2 style={{ color: 'red', textAlign: 'center' }}>Ongoing Events</h2> */}
            {showOngoingEvents &&(
                <div style={{ marginLeft: '300px', display: "flex" }}>

                    <div style={{ width: '70%' }}>
                        {events.map((event) => (
                            <div key={event._id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px 5px', backgroundColor: 'grey' }}>
                                <h2 style={{ color: 'white' }}>Event Name: {event.eventName}</h2>
                                <h3 style={{ color: '#06BBCC' }}>Event Location:</h3>
                                <p style={{ color: 'white' }}> {event.eventPlace}</p>
                                {/* <br></br> */}
                                <h4 style={{ color: '#06BBCC' }}>Event Details: </h4>
                                <p style={{ color: 'white' }}> {event.eventDetails}</p>
                                {/* <br></br> */}
                                <h4 style={{ color: '#06BBCC' }}> Event Date:</h4>
                                <p style={{ color: 'white' }}> {event.eventDate}</p>
                                <h4 style={{ color: '#06BBCC' }}> Reference:</h4>
                                <p style={{ color: 'white' }}> {event.eventReference}</p>

                                {userType === "Student" && (
                                    <div>
                                        <button onClick={() => handleApplyClick(event._id)}>Apply</button>
                                        {/* Conditionally render eligibility status based on the event and user */}
                                        {/* Show eligibility status here */}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )};
        </div>
    )
};
export default Event;
