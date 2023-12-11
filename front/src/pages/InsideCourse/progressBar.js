import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import "./progressBar.css"
const ProgressBar = () => {
  const [totalWeeks, setTotalWeeks] = useState(0);
  const [submittedWeeks, setSubmittedWeeks] = useState(0);
  const [progress, setProgress] = useState(0);
  // const [userType, setUserType] = useState('');
  const [userId, setUserId] = useState('');
  const { courseId } = useParams();
  const [courseName, setCourseName] = useState('');

  useEffect(() => {
    const fetchCourseContent = async () => {
      const token = localStorage.getItem('jw_token');
      if (token) {
        const decodedToken = jwtDecode(token);
        // setUserType(decodedToken.userType);
        setUserId(decodedToken.id);
      }

      try {
        // Fetch total weeks from the first URL
        const response = await axios.get(`/course-content/${courseId}/weeks`);
        const weeks = response.data;
        setTotalWeeks(weeks.length);

        // Fetch submissions for the user and course
        const submissionsResponse = await axios.get(`http://localhost:5000/extras/submissions/${userId}/${courseId}`);
        const submissions = submissionsResponse.data.submissions;

        // Calculate the number of weeks with submissions
        const submittedWeeksCount = submissions.reduce((count, submission) => {
          return count + (submission.weekNumber !== undefined ? 1 : 0);
        }, 0);

        setSubmittedWeeks(submittedWeeksCount);

        // Calculate progress percentage
        if (totalWeeks > 0) {
          const calculatedProgress = (submittedWeeksCount / totalWeeks) * 100;
          setProgress(calculatedProgress);
        }
      } catch (error) {
        console.error('Error fetching course content or submissions:', error);
      }
    };

    const fetchCourseName = async () => {
      try {
        const courseResponse = await axios.get(`/course/${courseId}`);
        setCourseName(courseResponse.data.name);
      } catch (error) {
        console.error('Error fetching course name:', error);
      }
    };

    fetchCourseContent();
    fetchCourseName();
  }, [courseId, totalWeeks, userId]);
  const handleDownloadCertificate = () => {
    try {
      // Create a download link and trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = 'https://drive.google.com/uc?export=download&id=1XmocFmuRPNkx5ZGrAeoMLrDIno9UK3Qm';
      downloadLink.download = 'Certificate.pdf';
      downloadLink.click();
    } catch (error) {
      console.error('Error downloading certificate:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };
  
  return (
    <div className="progress-bar-container">
      <Link to={`/manage-course/${courseId}`}>
        Go to Home
      </Link>
      <h3>Course Progress - {courseName}</h3>
      <br></br>
      <h5>Total Weeks: {totalWeeks}</h5>
      <h5>Completed Weeks: {submittedWeeks}</h5>
      <div className='progress-bar'>
        <progress value={progress} max="100">
          {progress}%
        </progress>
      </div>

      {progress === 100 && (
        <button onClick={handleDownloadCertificate}>
          Download Certificate
        </button>
      )}
    </div>
  );
};

export default ProgressBar;
