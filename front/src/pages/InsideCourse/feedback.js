import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const FeedbackManagement = () => {
  const { courseId } = useParams();
  const [userType, setUserType] = useState('');
  const [userId, setUserId] = useState('');
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userAssignments, setUserAssignments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jw_token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserType(decodedToken.userType);
      setUserId(decodedToken.id);
    }

    // Fetch enrolled users for the course
    axios.get(`http://localhost:5000/course/enrolled-users/${courseId}`)
      .then((response) => {
        setEnrolledUsers(response.data.userSubscribed || []);
      })
      .catch((error) => {
        console.error('Error fetching enrolled users:', error.response ? error.response.data.error : error.message);
      });
  }, [courseId]);
  useEffect(() => {
    // Fetch user assignments when a user is selected
    if (selectedUser) {
      axios.get(`http://localhost:5000/extras/submissions/${selectedUser.userId}/${courseId}`)
        .then((response) => {
          const userSubmissions = response.data.submissions || [];
          setUserAssignments(userSubmissions);

          // Check for feedback for the selected user and course
          axios.get(`http://localhost:5000/course/${courseId}/feedback/${selectedUser.userId}`)
            .then((feedbackResponse) => {
              const feedbackList = feedbackResponse.data.feedbackList || [];
              const assignmentsWithFeedback = userSubmissions.map((assignment) => {
                const matchingFeedback = feedbackList.find((feedback) => feedback.assignmentId === assignment._id);
                return {
                  ...assignment,
                  feedback: matchingFeedback ? matchingFeedback.feedback : '',
                  marks: matchingFeedback ? matchingFeedback.marks : '',
                  grade: matchingFeedback ? matchingFeedback.grade : '',
                  feedbackSubmitted: false,
                };
              });
              setUserAssignments(assignmentsWithFeedback);
            })
            .catch((feedbackError) => {
              console.error('Error fetching feedback:', feedbackError.response ? feedbackError.response.data.error : feedbackError.message);
            });
        })
        .catch((error) => {
          console.error('Error fetching user submissions:', error.response ? error.response.data.error : error.message);
        });
    }
  }, [selectedUser, courseId]);
  useEffect(() => {
    // Fetch user assignments and feedback when a user is selected or if the user is a student
    const fetchUserId = userType === 'Student' ? userId : selectedUser?._id;

    if (fetchUserId) {
      Promise.all([
        axios.get(`http://localhost:5000/extras/submissions/${fetchUserId}/${courseId}`),
        axios.get(`http://localhost:5000/course/${courseId}/feedback/${fetchUserId}`)
      ]).then(([submissionsResponse, feedbackResponse]) => {
        const submissions = submissionsResponse.data.submissions || [];
        const feedbackList = feedbackResponse.data.feedbackList || [];

        // Combine submissions with feedback
        const combinedData = submissions.map(submission => {
          const feedback = feedbackList.find(f => f.assignmentId === submission._id);
          return {
            ...submission,
            feedback: feedback?.feedback || '',
            marks: feedback?.marks || '',
            grade: feedback?.grade || ''
          };
        });

        setUserAssignments(combinedData);
      }).catch(error => {
        console.error('Error fetching data:', error.response ? error.response.data.error : error.message);
      });
    }
  }, [selectedUser, courseId, userId, userType]);

  // Function to handle feedback submission
  const handleFeedbackSubmit = (assignmentId, feedback, marks, grade) => {
    // Assuming you have the feedback ID associated with the assignment
    const feedbackId = assignmentId; // You might need to adjust this based on your actual data structure
  
    // Check if feedbackId exists, indicating an existing feedback
    if (feedbackId) {
      // If feedbackId exists, update the feedback
      axios.put(`http://localhost:5000/course/feedback/${feedbackId}`, {
        feedback,
        marks,
        grade,
      })
        .then((response) => {
          console.log('Feedback updated successfully:', response.data);
          // Update the feedbackSubmitted flag for the assignment
          const updatedAssignments = userAssignments.map((a) => {
            if (a._id === assignmentId) {
              return { ...a, feedbackSubmitted: true };
            }
            return a;
          });
          setUserAssignments(updatedAssignments);
        })
        .catch((error) => {
          console.error('Error updating feedback:', error.response ? error.response.data.error : error.message);
        });
    } else {
      // If feedbackId does not exist, submit new feedback
      axios.post(`http://localhost:5000/course/${courseId}/submit-feedback`, {
        studentId: selectedUser.userId,
        instructorId: userId,
        assignmentId,
        feedback,
        marks,
        grade,
      })
        .then((response) => {
          console.log('Feedback submitted successfully:', response.data);
          // Update the feedbackSubmitted flag for the assignment
          const updatedAssignments = userAssignments.map((a) => {
            if (a._id === assignmentId) {
              return { ...a, feedbackSubmitted: true };
            }
            return a;
          });
          setUserAssignments(updatedAssignments);
        })
        .catch((error) => {
          console.error('Error submitting feedback:', error.response ? error.response.data.error : error.message);
        });
    }
  };
  
  return (
    <div>
      {/* Main Content */}
      <div>
        {/* Select User and Show Assignments */}
        {userType === 'INS' && (
          <div>
            <h2>Select User and Show Assignments</h2>
            <label>Select User:</label>
            <select
              value={selectedUser ? selectedUser.userId : ''}
              onChange={(e) => {
                const selected = enrolledUsers.find((user) => user.userId === e.target.value);
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
              <div>
                <h3>Assignments for {selectedUser.userName}</h3>
                {userAssignments.length === 0 ? (
                  <p>No assignments submitted by the user.</p>
                ) : (
                  userAssignments.map((assignment) => (
                    <div key={assignment._id}>
                      <h4>Week {assignment.weekNumber} Submission</h4>
                      <p>Submission Link: {assignment.submissionLink}</p>
                      <p>Submission Date: {assignment.submissionDate}</p>

                      {/* Feedback Form */}
                      <h5>Feedback Form</h5>
                      <p>{assignment.feedbackSubmitted ? 'Feedback submitted successfully' : ''}</p>
                      <textarea
                        placeholder="Enter feedback"
                        value={assignment.feedback || ''}
                        onChange={(e) => {
                          const updatedAssignments = userAssignments.map((a) => {
                            if (a._id === assignment._id) {
                              return { ...a, feedback: e.target.value, feedbackSubmitted: false };
                            }
                            return a;
                          });
                          setUserAssignments(updatedAssignments);
                        }}
                      ></textarea>
                      <br />
                      <label>Marks:</label>
                      <input
                        type="number"
                        value={assignment.marks || ''}
                        onChange={(e) => {
                          const updatedAssignments = userAssignments.map((a) => {
                            if (a._id === assignment._id) {
                              return { ...a, marks: e.target.value, feedbackSubmitted: false };
                            }
                            return a;
                          });
                          setUserAssignments(updatedAssignments);
                        }}
                      />
                      <br />
                      <label>Grade:</label>
                      <input
                        type="text"
                        value={assignment.grade || ''}
                        onChange={(e) => {
                          const updatedAssignments = userAssignments.map((a) => {
                            if (a._id === assignment._id) {
                              return { ...a, grade: e.target.value, feedbackSubmitted: false };
                            }
                            return a;
                          });
                          setUserAssignments(updatedAssignments);
                        }}
                      />
                      <br />
                      <button onClick={() => handleFeedbackSubmit(assignment._id, assignment.feedback, assignment.marks, assignment.grade)}>Submit Feedback</button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
        {userType === 'Student' && (
          <div>
            <h2>Your Feedback</h2>
            {userAssignments.length === 0 ? (
              <p>No assignments submitted.</p>
            ) : (
              userAssignments.map((assignment) => (
                <div key={assignment._id}>
                  <h4>Week {assignment.weekNumber} Submission</h4>
                  <p>Submission Link: {assignment.submissionLink}</p>
                  <p>Submission Date: {assignment.submissionDate}</p>

                  {/* Feedback Display */}
                  <h5>Feedback</h5>
                  <p>{assignment.feedback || 'No feedback available'}</p>
                  <p>Marks: {assignment.marks}</p>
                  <p>Grade: {assignment.grade}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackManagement;