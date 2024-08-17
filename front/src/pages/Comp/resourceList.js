import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ResourceList = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // Fetch course details
    const fetchCourse = async () => {
        try {
          const courseResponse = await fetch(`http://entertrainer-2.onrender.com/courses/${courseId}`);
          const courseData = await courseResponse.json();
          console.log('Course Data:', courseData); // Log course data
          setCourse(courseData);
        } catch (error) {
          console.error('Error fetching course details:', error);
        }
      };

    // Fetch resources for the given course
    const fetchResources = async () => {
      try {
        const resourcesResponse = await fetch(`http://entertrainer-2.onrender.com/resources/getAllResources/${courseId}`);
        const resourcesData = await resourcesResponse.json();
        setResources(resourcesData.weeks);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchCourse();
    fetchResources();
  }, [courseId]);

  return (
    <div className="container mt-5">
      <h2>Resources for Course {course.name}</h2>

      {Object.keys(resources).map((weekNumber) => (
        <div key={weekNumber} className="mt-3">
          <h4>Week {weekNumber}</h4>
          <ul>
            {resources[weekNumber].map((resource, index) => (
              <li key={index}>
                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                  Resource {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ResourceList;