import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const LiveSession = () => {
  const { courseId } = useParams();
  const [userType, setUserType] = useState('');
  const [userId, setUserId] = useState('');
  const [liveSessions, setLiveSessions] = useState([]);
  const [showCreateSession, setShowCreateSession] = useState(false);
  const [newSession, setNewSession] = useState({
    topic: '',
    link: '',
    date: new Date(),
    time: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('jw_token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserType(decodedToken.userType);
      setUserId(decodedToken.id);
    }

    // Fetch existing live sessions for the current courseId
    axios.get(`http://entertrainer-2.onrender.com/extras/sessions/${courseId}`)
      .then((response) => {
        setLiveSessions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching live sessions:', error.response ? error.response.data.message : error.message);
      });
  }, [courseId]);

  const handleCreateSession = () => {
    setShowCreateSession(!showCreateSession);
  };

  const handleSubmitSession = () => {
    axios.post(`http://entertrainer-2.onrender.com/extras/create-session/${courseId}`, newSession)
      .then((response) => {
        setLiveSessions([...liveSessions, response.data]);
        alert('Live Session Created');
        setNewSession({
          topic: '',
          link: '',
          date: new Date(),
          time: '',
        });
        setShowCreateSession(false);
      })
      .catch((error) => {
        console.error('Error creating live session:', error.response ? error.response.data.message : error.message);
      });
  };

  const handleJoinSession = (sessionLink) => {
    window.open(sessionLink, '_blank');
  };

  const handleDeleteMeeting = (meetingId) => {
    axios.delete(`http://entertrainer-2.onrender.com/extras/sessions/${courseId}/${meetingId}`)
      .then(() => {
        // Filter out the deleted meeting from the list
        const updatedMeetings = liveSessions.filter(session => session._id !== meetingId);
        setLiveSessions(updatedMeetings);
        alert('Meeting deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting meeting:', error.response ? error.response.data.message : error.message);
        // Handle error, show error message, etc.
      });
  };

  
  return (
    <div>
      <div style={{ backgroundColor: '#333', color: '#fff', padding: '20px', width: '200px', height: '100%', position: 'fixed', left: 0, top: 0 }}>
        {/* Sidebar/Navigation */}
        <Link to={`/manage-course/${courseId}`} style={{ display: 'block', textAlign: 'center', color: '#06BBCC', marginBottom: '20px' }}>
          Back to Course
        </Link>
        {userType === 'INS' && (
          <button onClick={handleCreateSession} style={{ display: 'block', textAlign: 'center', backgroundColor: '#06BBCC', color: '#fff', padding: '10px', border: 'none', cursor: 'pointer' }}>
            Create Live Session
          </button>
        )}
      </div>
      <div style={{ marginLeft: '200px', padding: '20px', width: '50%' }}>
        {/* Main content */}
        {(userType === 'INS' && showCreateSession) && (
          <div>
            {/* Form for creating a live session */}
            <h2>Create Live Session</h2>
            {/* ... (Form inputs similar to previous code) */}
            <label>Topic:</label>
            <input
              type="text"
              value={newSession.topic}
              onChange={(e) => setNewSession({ ...newSession, topic: e.target.value })}
            />
            <label>Link:</label>
            <input
              type="text"
              value={newSession.link}
              onChange={(e) => setNewSession({ ...newSession, link: e.target.value })}
            />
            <label>Date:</label>
            <input
              type="date"
              value={newSession.date.toISOString().split('T')[0]} // Format date as YYYY-MM-DD
              onChange={(e) => setNewSession({ ...newSession, date: new Date(e.target.value) })}
            />
            <label>Time:</label>
            <input
              type="text"
              value={newSession.time}
              onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
            />
            <button onClick={handleSubmitSession}>Create Session</button>
          </div>
        )}
        {/* Display existing live sessions */}
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2>Live Sessions</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
              {liveSessions.map((session) => (
                <div key={session._id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px', width: '300px', backgroundColor: '#D4E6F1' }}>
                  {/* Display session details */}
                  <h3>{session.topic}</h3>
                  <p>Date: {session.date}</p>
                  <p>Time: {session.time}</p>
                  <button onClick={() => handleJoinSession(session.link)} style={{ backgroundColor: '#239B56', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px' }}>Join</button>
                  {userType === 'INS' && (
                  <button onClick={() => handleDeleteMeeting(session._id)} style={{ backgroundColor: '#EC7063', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', marginTop: '10px' }}>Delete</button>
                  )}
                </div>  
              ))}
              </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSession;
