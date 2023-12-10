import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProgressBar = ({ courseId }) => {
  const [totalWeeks, setTotalWeeks] = useState(0);
  const [submittedWeeks, setSubmittedWeeks] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchCourseContent = async () => {
      try {
        const response = await axios.get(`/course-content/${courseId}`);
        const weeks = response.data.weeks;
        setTotalWeeks(weeks.length);

        // Calculate the number of weeks with submissions
        const submittedWeeksCount = weeks.filter((week) => week.assignments.length > 0).length;
        setSubmittedWeeks(submittedWeeksCount);

        // Calculate progress percentage
        if (totalWeeks > 0) {
          const calculatedProgress = (submittedWeeksCount / totalWeeks) * 100;
          setProgress(calculatedProgress);
        }
      } catch (error) {
        console.error('Error fetching course content:', error.response.data.error);
      }
    };

    fetchCourseContent();
  }, [courseId, totalWeeks, submittedWeeks]);

  return (
    <div>
      <h3>Course Progress</h3>
      <p>Total Weeks: {totalWeeks}</p>
      <p>Submitted Weeks: {submittedWeeks}</p>
      <progress value={progress} max="100">
        {progress}%
      </progress>
    </div>
  );
};

export default ProgressBar;
