import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const FeedbackManagement = () => {
  const { courseId } = useParams();
  const [userType, setUserType] = useState('');
  const [userId, setUserId] = useState('');
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userAssignments, setUserAssignments] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [marks, setMarks] = useState('');
  const [grade, setGrade] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem('jw_token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserType(decodedToken.userType);
      setUserId(decodedToken.id);
    }

    // Fetch enrolled users for the course
    axios
      .get(`http://localhost:5000/course/enrolled-users/${courseId}`)
      .then((response) => {
        setEnrolledUsers(response.data.userSubscribed || []);
      })
      .catch((error) => {
        console.error(
          'Error fetching enrolled users:',
          error.response ? error.response.data.error : error.message
        );
      });

    // Fetch user assignments for the student
    if (userType === 'Student') {
      axios
        .get(`http://localhost:5000/extras/submissions/${userId}/${courseId}`)
        .then((response) => {
          const userSubmissions = response.data.submissions || [];
          setUserAssignments(userSubmissions);

          axios
            .get(`http://localhost:5000/extras/getFeedback/${userId}/${courseId}`)
            .then((response) => {
              const feedbackList = response.data.feedbackList || [];
              setFeedbackList(feedbackList);
            })
            .catch((error) => {
              console.error(
                'Error fetching feedback:',
                error.response ? error.response.data.error : error.message
              );
            });
        })
        .catch((error) => {
          console.error(
            'Error fetching user submissions:',
            error.response ? error.response.data.error : error.message
          );
        });
    }
  },[userId] [courseId]);

  useEffect(() => {
    // Fetch user assignments when a user is selected

      if (selectedUser) {
        axios
          .get(
            `http://localhost:5000/extras/submissions/${selectedUser.userId}/${courseId}`
          )
          .then((response) => {
            const userSubmissions = response.data.submissions || [];
            setUserAssignments(userSubmissions);

            axios
              .get(`http://localhost:5000/extras/getFeedback/${selectedUser.userId}/${courseId}`)
              .then((response) => {
                const feedbackList = response.data.feedbackList || [];
                setFeedbackList(feedbackList);
                console.log('feedbackList', feedbackList);
              })
              .catch((error) => {
                console.error(
                  'Error fetching feedback:',
                  error.response ? error.response.data.error : error.message
                );
              });


          })
          .catch((error) => {
            console.error(
              'Error fetching user submissions:',
              error.response ? error.response.data.error : error.message
            );
          });
      }

  }, [selectedUser, courseId]);




  const handleFeedbackSubmit = async (assignmentId) => {
    try {
      // Find the selected assignment
      const selectedAssignment = userAssignments.find(
        (assignment) => assignment._id === assignmentId
      );

      // Fetch the assignment ID
      const response = await axios.get(
        `http://localhost:5000/extras/assignmentId/${selectedUser.userId}/${courseId}/${selectedAssignment.weekNumber}`
      );
      const fetchedAssignmentId = response.data.assignmentId;

      console.log('Fetched Assignment ID:', fetchedAssignmentId);

      // Submit feedback
      const feedbackResponse = await axios.post(
        `http://localhost:5000/extras/submit-feedback`,
        {
          courseId: courseId,
          studentId: selectedUser.userId,
          instructorId: userId,
          assignmentId: fetchedAssignmentId,
          feedback: feedback,
          marks: marks,
          grade: grade,
        }
      );

      console.log(feedbackResponse.data.message);
      alert(feedbackResponse.data.message);

      // Update the feedbackSubmitted flag for the assignment
      const updatedAssignments = userAssignments.map((a) => {
        if (a._id === assignmentId) {
          return { ...a, feedbackSubmitted: true };
        }
        return a;
      });
      setUserAssignments(updatedAssignments);

      // Clear feedback, marks, and grade fields after submission
      setFeedback('');
      setMarks('');
      setGrade('');
    } catch (error) {
      console.error(
        'Error submitting feedback:',
        error.response ? error.response.data.error : error.message
      );
    }
  };


  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div
        style={{
          backgroundColor: '#333',
          color: '#fff',
          padding: '20px',
          width: '200px',
          height: '100%',
          position: 'fixed',
          left: 0,
          top: 0,
        }}
      >
        <Link
          to={`/manage-course/${courseId}`}
          style={{
            display: 'block',
            textAlign: 'center',
            color: '#06BBCC',
            marginBottom: '20px',
          }}
        >
          Back to Course
        </Link>
      </div>
      <div style={{ flex: 1, marginLeft: '200px', padding: '20px', width: '70' }}>
        {userType === 'INS' && (
          <div>
            <h2>{userType === 'INS' ? 'Select User and Show Assignments' : 'Your Assignments'}</h2>
            <label>Select User:</label>
            <select
              value={selectedUser ? selectedUser.userId : ''}
              onChange={(e) => {
                const selected = enrolledUsers.find(
                  (user) => user.userId === e.target.value
                );
                setSelectedUser(selected);
              }}
            >
              <option value="">Select User</option>
              {enrolledUsers.map((user) => (
                <option key={user.userId} value={user.userId}>
                  {user.userName}
                </option>
              ))}
            </select>

            {selectedUser && (
              <div style={{ width: '100%' }}>
                <h3>Assignments for {selectedUser.userName}</h3>

                {userAssignments.length === 0 ? (
                  <p>No assignments submitted by the user.</p>
                ) : (

                  userAssignments.map((assignment) => (
                    <div key={assignment._id} style={{ width: '100%' }}>
                      {/* <h4>Week {assignment.weekNumber} Submission</h4>
                      <p>Submitted Assignment: {assignment.submissionLink}</p>
                      <p>Submission Date: {assignment.submissionDate}</p> */}
                      <h3>Feedback History</h3>
                      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', border: '1px solid #ddd' }}>
                        <thead style={{ backgroundColor: '#06BBCC' }}>
                          <tr>
                            <th style={tableHeaderStyle}>Week Number</th>
                            <th style={tableHeaderStyle}>Submission</th>
                            <th style={tableHeaderStyle}>Submission Date</th>
                            <th style={tableHeaderStyle}>Feedback</th>
                            <th style={tableHeaderStyle}>Marks</th>
                            <th style={tableHeaderStyle}>Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {feedbackList.map((feedback) => (
                            <tr key={feedback._id} style={{ borderBottom: '1px solid #ddd' }}>
                              <td style={tableCellStyle}>{feedback.assignmentId ? feedback.assignmentId.weekNumber : 'N/A'}</td>
                              <td style={tableCellStyle}>{feedback.assignmentId ? feedback.assignmentId.submissionLink : 'N/A'}</td>
                              <td style={tableCellStyle}>{feedback.assignmentId ? feedback.assignmentId.submissionDate : 'N/A'}</td>
                              <td style={tableCellStyle}>{feedback.feedback}</td>
                              <td style={tableCellStyle}>{feedback.marks}</td>
                              <td style={tableCellStyle}>{feedback.grade}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {/* Feedback Form */}
                      <div style={{ marginTop: '20px', width: '400px' }}>
                        <h5>Feedback Form</h5>
                        <p>{assignment.feedbackSubmitted ? 'Feedback submitted successfully' : ''}</p>
                        {/* <textarea
                        width = "100%"
                        placeholder="Enter feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      ></textarea> */}
                        <input
                          type="text"
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                        />
                        <br />
                        <label>Marks:</label>
                        <input
                          type="number"
                          value={marks}
                          onChange={(e) => setMarks(e.target.value)}
                        />
                        <br />
                        <label>Grade:</label>
                        <input
                          type="text"
                          value={grade}
                          onChange={(e) => setGrade(e.target.value)}
                        />
                        <br />
                        <button onClick={() => handleFeedbackSubmit(assignment._id)}>
                          Submit Feedback
                        </button>
                      </div>
                    </div>
                  ))
                )}


              </div>
            )}
          </div>
        )}


        {userType === 'Student' &&(
          <div>
            {userAssignments.length === 0 ? (
             
              <p>No assignments submitted.</p>
            ) : (
              userAssignments.map((assignment) => (
                <div key={assignment._id} style={{ width: '100%' }}>
                  <h3>Your Feedback </h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', border: '1px solid #ddd' }}>
                    <thead style={{ backgroundColor: '#06BBCC' }}>
                      <tr>
                        <th style={tableHeaderStyle}>Week Number</th>
                        <th style={tableHeaderStyle}>Submission</th>
                        <th style={tableHeaderStyle}>Submission Date</th>
                        <th style={tableHeaderStyle}>Feedback</th>
                        <th style={tableHeaderStyle}>Marks</th>
                        <th style={tableHeaderStyle}>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbackList.map((feedback) => (
                        <tr key={feedback._id} style={{ borderBottom: '1px solid #ddd' }}>
                          <td style={tableCellStyle}>{feedback.assignmentId ? feedback.assignmentId.weekNumber : 'N/A'}</td>
                          <td style={tableCellStyle}>{feedback.assignmentId ? feedback.assignmentId.submissionLink : 'N/A'}</td>
                          <td style={tableCellStyle}>{feedback.assignmentId ? feedback.assignmentId.submissionDate : 'N/A'}</td>
                          <td style={tableCellStyle}>{feedback.feedback}</td>
                          <td style={tableCellStyle}>{feedback.marks}</td>
                          <td style={tableCellStyle}>{feedback.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const tableHeaderStyle = {
  padding: '12px',
  textAlign: 'center',
  borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
  backgroundColor: "#f2f2f2",
  color: 'black',
  padding: '8px',
  textAlign: 'center',
  borderBottom: '1px solid #ddd',
};

export default FeedbackManagement;