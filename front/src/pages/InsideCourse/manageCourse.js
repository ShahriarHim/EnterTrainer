import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './manageCourse.css';
import axios from 'axios';


const ManageCourse = () => {
  const navigate = useNavigate();
  const [weeks, setWeeks] = useState([]);
  const [lessonLinks, setLessonLinks] = useState(['']);
  const [assignmentLinks, setAssignmentLinks] = useState(['']);
  const [lessonTitles, setLessonTitles] = useState(['']);
  const [activeWeek, setActiveWeek] = useState(null);
  const [courseName, setCourseName] = useState('');
  const { courseId } = useParams();
  const [userType, setUserType] = useState('');
  const [userId, setUserId] = useState('');
  const [submissionLink, setSubmissionLink] = useState('');



  const handleNavigate = (route) => {
    navigate(route);
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/course-content/${courseId}/weeks`);
        setWeeks(response.data);
      } catch (error) {
        console.error('Error fetching weeks data:', error.response.data.error);
      }
    };

    fetchData();
    const fetchCourseDetails = async () => {
      try {
        const courseResponse = await axios.get(`/course/${courseId}`);
        setCourseName(courseResponse.data.name);
      } catch (error) {
        console.error('Error fetching course details:', error.response.data.error);
      }
    };

    fetchCourseDetails();

    const token = localStorage.getItem('jw_token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserType(decodedToken.userType);
      setUserId(decodedToken.id);
    }

  }, [courseId]);



  const handleAddWeekData = async () => {
    try {
      const newWeekData = {
        weekNumber: weeks[activeWeek].weekNumber,
        lessons: lessonLinks.map((link, index) => ({ title: lessonTitles[index], link })),
        assignments: assignmentLinks.map((link) => ({ link, submissions: [] })),
      };

      // Make a POST request to add the new week data
      const response = await axios.post(`http://localhost:5000/course-content/${courseId}/weeks`, newWeekData);

      // Handle success - you can update state or perform other actions
      console.log('Week data added successfully:', response.data);

      // Show success alert
      alert('Added week data successfully!');
    } catch (error) {
      // Handle error
      console.error('Error adding week data:', error.response.data.error);

      // Show error alert
      alert('Error adding week data. Please try again.');
    }
  };
  const handleUpdateWeekData = async () => {
    try {
      const updatedWeekData = {
        lessons: lessonLinks.map((link, index) => ({ title: lessonTitles[index], link })),
        assignments: assignmentLinks.map((link) => ({ link, submissions: [] })),
      };

      // Make a PUT request to update the existing week data
      const response = await axios.put(`http://localhost:5000/course-content/${courseId}/weeks/${weeks[activeWeek]._id}`, updatedWeekData);

      // Handle success - you can update state or perform other actions
      console.log('Week data updated successfully:', response.data);

      // Show success alert
      alert('Updated week data successfully!');

      // Optionally, you can update the state with the new data if needed
      setLessonLinks(response.data.week.lessons.map((lesson) => lesson.link));
      setLessonTitles(response.data.week.lessons.map((lesson) => lesson.title));
      setAssignmentLinks(response.data.week.assignments.map((assignment) => assignment.link));
    } catch (error) {
      // Handle error
      console.error('Error updating week data:', error.response.data.error);

      // Show error alert
      alert('Error updating week data. Please try again.');
    }
  };




  const handleAddWeek = () => {
    const newWeekNumber = weeks.length + 1;
    setWeeks((prevWeeks) => [
      ...prevWeeks,
      { weekNumber: newWeekNumber, lessons: [], assignments: [] },
    ]);
    setActiveWeek(newWeekNumber - 1);
  };

  const handleAddLesson = () => {
    setLessonLinks((prevLessonLinks) => [...prevLessonLinks, '']);
    setLessonTitles((prevLessonTitles) => [...prevLessonTitles, '']);
  };

  const handleAddAssignment = () => {
    setAssignmentLinks((prevAssignmentLinks) => [...prevAssignmentLinks, '']);
  };

  const handleRemoveLesson = (index) => {
    setLessonLinks((prevLessonLinks) => [...prevLessonLinks.slice(0, index), ...prevLessonLinks.slice(index + 1)]);
    setLessonTitles((prevLessonTitles) => [...prevLessonTitles.slice(0, index), ...prevLessonTitles.slice(index + 1)]);
  };

  const handleRemoveAssignment = (index) => {
    setAssignmentLinks((prevAssignmentLinks) => [
      ...prevAssignmentLinks.slice(0, index),
      ...prevAssignmentLinks.slice(index + 1),
    ]);
  };

  const handleLessonLinkChange = (index, value) => {
    setLessonLinks((prevLessonLinks) => [
      ...prevLessonLinks.slice(0, index),
      value,
      ...prevLessonLinks.slice(index + 1),
    ]);
  };

  const handleAssignmentLinkChange = (index, value) => {
    setAssignmentLinks((prevAssignmentLinks) => [
      ...prevAssignmentLinks.slice(0, index),
      value,
      ...prevAssignmentLinks.slice(index + 1),
    ]);
  };

  const handleLessonTitleChange = (index, value) => {
    setLessonTitles((prevLessonTitles) => [
      ...prevLessonTitles.slice(0, index),
      value,
      ...prevLessonTitles.slice(index + 1),
    ]);
  };

  const toggleWeekDropdown = (weekIndex) => {
    setActiveWeek((prevActiveWeek) => (prevActiveWeek === weekIndex ? null : weekIndex));

    if (weekIndex !== activeWeek) {
      const selectedWeek = weeks[weekIndex];
      if (selectedWeek) {
        setLessonLinks(selectedWeek.lessons.map((lesson) => lesson.link));
        setLessonTitles(selectedWeek.lessons.map((lesson) => lesson.title));
        setAssignmentLinks(selectedWeek.assignments.map((assignment) => assignment.link));
      } else {
        // Clear the fields if no week is selected
        setLessonLinks(['']);
        setLessonTitles(['']);
        setAssignmentLinks(['']);
      }
    }
  };

  const isExistingWeek = activeWeek !== null && weeks[activeWeek] && weeks[activeWeek].lessons.length > 0;

  const getYouTubeVideoId = (url) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match && match[1];
  };

  // JSX to display the YouTube video
  const renderYouTubeVideo = (lessonLink) => {
    const videoId = getYouTubeVideoId(lessonLink);
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <iframe
            width="600"
            height="400"
            src={embedUrl}
            title="YouTube Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      );
    } else {
      return <p>Invalid YouTube video link</p>;
    }
  };
  const handleSubmissionLinkChange = (value) => {
    setSubmissionLink(value);
  };


  const handleSubmitAssignment = async (weekIndex, assignmentIndex) => {
    try {
      const existingSubmission = weeks[weekIndex].weekNumber;

      if (existingSubmission) {
        // If there's already a submission, show an alert and return
        alert('Assignment already submitted for this week');
        return;
      }
      const submissionDate = new Date().toISOString();
      console.log('id',userId);
      console.log('courseId',courseId);
      console.log('week number',weeks[weekIndex].weekNumber);
      console.log('submissionLink',submissionLink);
      console.log('submissionDate',submissionDate);
      console.log('courseContentId',weeks[weekIndex].id);
      // Make a POST request to submit the assignment
      const response = await axios.post(`http://localhost:5000/extras/submit-assignment`, {
        userId,
        courseId,
        weekNumber: weeks[weekIndex].weekNumber,
        submissionLink: submissionLink,
        submissionDate: submissionDate, // You may need to format the date as needed
      });

      // Handle success - you can update state or perform other actions
      console.log('Assignment submitted successfully:', response.data);

      // Show success alert
      alert('Assignment submitted successfully!');
    } catch (error) {
      // Handle error
      console.error('Error submitting assignment:', error.response.data.error);

      // Show error alert
      alert('Error submitting assignment. Please try again.');
    }
  };


  return (
    <div className="manage-course-container">
      {/* Sidebar */}
      <div className="sidebar">
        <a href="#" onClick={() => handleNavigate('/home')}>
          Home
        </a>
        <a href="#" onClick={() => handleNavigate('/taken-courses')}>
          Courses
        </a>

        {/* Rectangular Card */}
        <div className="info-card">
          <h3>Course Info</h3>
          <button onClick={() => handleNavigate(`/progress/${courseId}`)}>
            Progress
          </button>
          <h6>Course Expiry Date:</h6>
          <p> [Your Date]</p>
          <br></br>
          <h6>Course Handouts:</h6>
          <p> [Handout Link]</p>
          <br></br>
          <h6>Course Resources:</h6>
          <button onClick={() => handleNavigate(`/resource/${courseId}`)}>
            Resources
          </button>
          <button onClick={() => handleNavigate(`/project/${courseId}`)}>
            Project
          </button>
          <button onClick={() => handleNavigate(`/meeting/${courseId}`)}>
            Meeting
          </button>
        </div>



      </div>
      {/* Main Content */}
      <div className="main-content">
        {/* Course Name */}
        <div className="course-name">{courseName}</div>

        {/* Two Row Gap */}
        <br />
        <br />

        {/* Manage and Add Week */}
        <div className="manage-add-week">
          <div className="manage-course">Manage Course</div>
          {userType === 'INS' && (
            <button className="add-week-button" onClick={handleAddWeek}>
              Add Week
            </button>
          )}
        </div>

        {/* Week Sections */}
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="week-section">
            <button className="week-button" onClick={() => toggleWeekDropdown(weekIndex)}>
              Week {week.weekNumber}
            </button>

            {activeWeek === weekIndex && (
              <div className="dropdown-content">
                <div className="week-form">
                  <label>Week No: {week.weekNumber}</label>


                  {isExistingWeek ? (
                    // Display existing data
                    <>
                      {week.lessons.length > 0 && (
                        <div className="lesson-input">
                          <label>Lessons:</label>
                          {week.lessons.map((lesson, lessonIndex) => (
                            <div key={lessonIndex}>
                              <h5>Lesson Title: {lesson.title}</h5>
                              {/* <p>Lesson Link: {lesson.link}</p> */}
                              {renderYouTubeVideo(lesson.link)}
                            </div>
                          ))}
                        </div>
                      )}

                      {week.assignments.length > 0 && (
                        <div className="assignment-input">
                          <label>Assignments:</label>
                          {week.assignments.map((assignment, assignmentIndex) => (
                            <div key={assignmentIndex}>
                              <p>Assignment Link: {assignment.link}</p>
                              <input
                                type="text"
                                placeholder="Submission Link"
                                value={submissionLink}
                                onChange={(e) => handleSubmissionLinkChange(e.target.value)}
                              />

                              <button
                                type="button"
                                onClick={() => handleSubmitAssignment(weekIndex, assignmentIndex)}
                              >
                                Submit Assignment
                              </button>

                            </div>
                          ))}
                        </div>
                      )}
                      {userType === 'INS' && (
                        <button type="button" onClick={handleUpdateWeekData}>
                          Update Data
                        </button>
                      )}
                    </>
                  ) : (

                    <>
                      <div className="lesson-input">
                        <label>Lessons:</label>
                        {lessonLinks.map((lessonLink, index) => (
                          <div key={index}>
                            <input
                              type="text"
                              placeholder="Lesson Link"
                              value={lessonLink}
                              onChange={(e) => handleLessonLinkChange(index, e.target.value)}
                            />
                            <input
                              type="text"
                              placeholder="Lesson Title"
                              value={lessonTitles[index]}
                              onChange={(e) => handleLessonTitleChange(index, e.target.value)}
                            />
                            {index > 0 && (
                              <button type="button" onClick={() => handleRemoveLesson(index)}>
                                Remove Lesson
                              </button>
                            )}
                          </div>
                        ))}
                        <button type="button" onClick={handleAddLesson}>
                          Add Lesson
                        </button>
                      </div>

                      <div className="assignment-input">
                        <label>Assignments:</label>
                        {assignmentLinks.map((assignmentLink, index) => (
                          <div key={index}>
                            <input
                              type="text"
                              placeholder="Assignment Link"
                              value={assignmentLink}
                              onChange={(e) => handleAssignmentLinkChange(index, e.target.value)}
                            />
                            {index > 0 && (
                              <button type="button" onClick={() => handleRemoveAssignment(index)}>
                                Remove Assignment
                              </button>
                            )}
                          </div>
                        ))}
                        <button type="button" onClick={handleAddAssignment}>
                          Add Assignment
                        </button>
                      </div>

                      <button type="button" onClick={handleAddWeekData}>
                        Submit Week Data
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}


      </div>
    </div>
  );
};

export default ManageCourse;
