import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

const ProjectManagement = () => {
  const { courseId } = useParams();
  const [userType, setUserType] = useState('');
  const [userId, setUserId] = useState('');
  const [projects, setProjects] = useState([]);
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [showCreateProject, setCreateProject] = useState(false);
  const [newProject, setNewProject] = useState({
    insName: '',
    name: '',
    details: '',
    participants: [],
    submissionDate: new Date(),
  });

  useEffect(() => {
    const token = localStorage.getItem('jw_token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserType(decodedToken.userType);
      setUserId(decodedToken.id);
    }

    axios.get(`http://localhost:5000/extras/showProjects/${userId}`)
      .then((response) => {
        console.log('Response:', response.data); // Log the entire response object

        if (response.data && response.data.projects) {
          const updatedProjects = response.data.projects.map((project) => ({
            ...project,
            allowSubmission: !project.submission,
          }));
          setProjects(updatedProjects);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching user projects:', error.response ? error.response.data.error : error.message);
      });



    axios.get(`http://localhost:5000/course/enrolled-users/${courseId}`)
      .then((response) => {
        const userSubscribed = response.data.userSubscribed || [];
        if (!Array.isArray(userSubscribed)) {
          console.error('userSubscribed is not an array:', userSubscribed);
          return;
        }
        setEnrolledUsers(userSubscribed);
      })
      .catch((error) => {
        console.error('Error fetching enrolled users:', error.response.data.error);
      });
  }, [courseId, userId]);

  const handleCreateProject = () => {
    if (newProject.participants.length === 0) {
      alert('Please select at least one participant.');
      return;
    }

    axios.post(`http://localhost:5000/projects/create-project/${courseId}`, newProject)
      .then((response) => {
        const updatedProjects = [...projects, { ...response.data.project, allowSubmission: true }];
        setProjects(updatedProjects);
        alert('Project Created');
        setNewProject({
          insName: '', // Corrected property name here
          name: '',
          details: '',
          participants: [],
          submissionDate: new Date(),
        });
        setCreateProject(false);
      })
      .catch((error) => {
        console.error('Error creating project:', error.response ? error.response.data.error : error.message);
      });
  };


  const handleSubmissionChange = (e, projectId) => {
    const updatedProjects = projects.map((proj) => {
      if (proj._id === projectId) {
        return { ...proj, submission: e.target.value };
      }
      return proj;
    });
    setProjects(updatedProjects);
  };

  const handleSubmit = (project) => {
    // Log the project ID to check if it's being passed correctly
    console.log('Project ID:', project._id);

    // Check if submission exists for the project
    axios.get(`http://localhost:5000/extras/check-submission/${project._id}`)
      .then((response) => {
        if (response.data.submitted) {
          alert('Project already submitted');
        } else {
          // If submission doesn't exist, submit the work
          axios.post(`http://localhost:5000/extras/submit-work/${project._id}/${userId}`, {
            submission: project.submission,
          })
            .then((submitResponse) => {
              const updatedProjects = projects.map((proj) => {
                if (proj._id === project._id) {
                  return {
                    ...proj,
                    submission: submitResponse.data.projectSubmission.submission,
                    allowSubmission: false,
                  };
                }
                return proj;
              });
              setProjects(updatedProjects);
              alert('Project submitted');
            })
            .catch((submitError) => {
              console.error('Error submitting work:', submitError.response ? submitError.response.data.error : submitError.message);
            });
        }
      })
      .catch((error) => {
        console.error('Error checking submission:', error.response ? error.response.data.error : error.message);
      });
  };


  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{ backgroundColor: '#333', color: '#fff', padding: '20px', width: '200px', height: '100%', position: 'fixed', left: 0, top: 0 }}>
        <Link to={`/manage-course/${courseId}`} style={{ display: 'block', textAlign: 'center', color: '#06BBCC', marginBottom: '20px' }}>
          Back to Course
        </Link>
        {userType === 'INS' && (
          <button onClick={() => setCreateProject(!showCreateProject)} style={{ display: 'block', textAlign: 'center', backgroundColor: '#06BBCC', color: '#fff', padding: '10px', border: 'none', cursor: 'pointer' }}>
            Create Project
          </button>
        )}
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '200px', padding: '20px', width: '50%' }}>
        {/* Check user type and display content accordingly */}
        {userType === 'INS' && showCreateProject && (
          <div>
            {/* Project Creation Form */}
            <h2>Create Project</h2>
            <label>Instructor Name:</label>
            <input
              type="text"
              value={newProject.insName}
              onChange={(e) => setNewProject({ ...newProject, insName: e.target.value })}
            />
            <label>Project Name:</label>
            <input
              type="text"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            />

            <label>Project Details:</label>
            <textarea
              value={newProject.details}
              onChange={(e) => setNewProject({ ...newProject, details: e.target.value })}
              style={{ width: '100%' }}
            ></textarea>

            <label>Participants:</label>
            <Select
              isMulti
              options={enrolledUsers.map((user) => ({ value: user.userId, label: user.userName }))}
              value={newProject.participants.map((participant) => ({ value: participant, label: participant }))}
              onChange={(selectedOptions) => setNewProject({ ...newProject, participants: selectedOptions.map((option) => option.value) })}
              styles={{
                // Customize styles here
                menu: (provided, state) => ({
                  ...provided,
                  borderBottom: '1px dotted pink',
                  color: state.isSelected ? 'red' : 'blue',
                  padding: 20,
                }),
                option: (provided, state) => ({
                  ...provided,
                  borderBottom: '1px dotted pink',
                  color: state.isSelected ? 'red' : 'blue',
                  padding: 20,
                }),
              }}
            />

            <label>Submission Date:</label>
            <DatePicker
              selected={newProject.submissionDate}
              onChange={(date) => setNewProject({ ...newProject, submissionDate: date })}
            />

            <button onClick={() => handleCreateProject()}>Create Project</button>
          </div>
        )}

        {/* Display existing projects */}

        {userType === 'INS' && (
          <div>
            <h2>Assigned Projects</h2>
            <ul>
              {projects.map((project) => (
                <li key={project._id}>
                  <strong>{project.name}</strong>
                  <p>{project.details}</p>
                  {/* Display other project details here */}
                </li>
              ))}
            </ul>
          </div>
        )}
        {userType === 'Student' && (
          <div>
            <h1 style={{ color: 'red' }}>User Projects</h1>
            <div style={{ display: 'flex' }}>

              {projects.map((project) => (
                <div key={project._id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px', width: '300px', backgroundColor: 'grey' }}>
                  <h2 style={{ color: 'white' }}>Instructor: {project.insName}</h2>
                  <h3 style={{ color: '#06BBCC' }}>Project Name: {project.name}</h3>
                  <br></br>
                  <h4 style={{ color: '#06BBCC' }}>Project Details: </h4>
                  <p style={{ color: 'white' }}> {project.details}</p>
                  <br></br>
                  <h4 style={{ color: '#06BBCC' }}> Project Participants:</h4>
                  <h5>
                    {project.participants.map((participant, index) => (
                      <span style={{ color: 'white' }} key={participant._id}>
                        {participant.name}
                        {index !== project.participants.length - 1 ? ' , ' : ''}
                      </span>
                    ))}
                  </h5>
                  <label style={{ color: 'maroon' }} htmlFor={`submission_${project._id}`}>Submission Date:</label>
                  <input
                    type="date"
                    id={`submission_${project._id}`}
                    value={project.submissionDate.slice(0, 10)} // Assuming submissionDate is in YYYY-MM-DD format
                    disabled // Disable editing for display purposes
                    style={{ marginLeft: '0px' }}
                  />

                  <div>
                    <input
                      type="text"
                      placeholder="Enter submission URL or details"
                      value={project.submission || ''}
                      onChange={(e) => handleSubmissionChange(e, project._id)}
                    />
                    <button onClick={() => handleSubmit(project)}>Submit Work</button>
                  </div>



                </div>
              ))}



            </div>
          </div>
        )}
      </div>

    </div>

  )
};
export default ProjectManagement;
