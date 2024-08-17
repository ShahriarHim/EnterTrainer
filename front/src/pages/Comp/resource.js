import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Resource = () => {
  const [userType, setUserType] = useState("");
  const [weekResources, setWeekResources] = useState({});
  const [newResourceLink, setNewResourceLink] = useState("");
  const [newResourceWeek, setNewResourceWeek] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAddResource, setShowAddResource] = useState(false);

  // Fetch the courseId from the URL parameters
  const { courseId } = useParams();

  useEffect(() => {
    // Decode the user type from the JWT token
    const token = localStorage.getItem("jw_token");
    if (token) {
      const decodedToken = jwt_decode(token);
      setUserType(decodedToken.userType);
    }

    // Fetch all resources for the current course
    getAllResources(courseId);
  }, [courseId]); // Include courseId in the dependency array

  const extractTokenFromGoogleDriveLink = (link) => {
    // Extract token from Google Drive link
    const tokenStartIndex = link.indexOf("/d/") + 3;
    const tokenEndIndex = link.indexOf("/", tokenStartIndex);
    
    if (tokenStartIndex !== -1 && tokenEndIndex !== -1) {
      const token = link.substring(tokenStartIndex, tokenEndIndex);
      return token;
    } else {
      console.error("Invalid Google Drive link format. Unable to extract token.");
      return null;
    }
  };

  const handleAddOrUpdateResource = async () => {
    try {
      // Extract token from the provided Google Drive link
      const extractedToken = extractTokenFromGoogleDriveLink(newResourceLink);

      if (!extractedToken) {
        // Handle invalid link format
        setAlertMessage("Invalid Google Drive link format. Please provide a valid link.");
        return;
      }

      // Construct download link
      const downloadLink = `https://drive.google.com/uc?export=download&id=${extractedToken}`;

      const resourceData = {
        courseId,
        weekNumber: newResourceWeek,
        link: downloadLink,
      };

      const response = await axios.post(
        "http://entertrainer-2.onrender.com/resources/addOrUpdateResource",
        resourceData
      );

      if (response.data.newResource) {
        setAlertMessage("Resource added successfully!");
      } else {
        setAlertMessage("Resource updated successfully!");
      }

      // Clear the form fields
      setNewResourceWeek("");
      setNewResourceLink("");

      // Fetch updated resources
      getAllResources(courseId);
    } catch (error) {
      console.error(
        "Error adding/updating resource:",
        error.response.data.error
      );
      setAlertMessage("Error adding/updating resource. Please try again.");
    }
  };

  const getAllResources = async (courseId) => {
    try {
      const response = await axios.get(
        `http://entertrainer-2.onrender.com/resources/getAllResources/${courseId}`
      );
      setWeekResources(response.data.weeks);
    } catch (error) {
      console.error("Error fetching resources:", error.response.data.error);
    }
  };

  // Function to handle resource download
  const handleDownload = (link) => {
    // Simulate download using window.open
    window.open(link, "_blank");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "20px",
          width: "200px",
          height: "100%",
          position: "fixed",
          left: 0,
          top: 0,
        }}
      >
        <Link
          to={`/manage-course/${courseId}`}
          style={{
            display: "block",
            textAlign: "center",
            color: "#06BBCC",
            marginBottom: "20px",
          }}
        >
          Back to Course
        </Link>
        {userType === "INS" && (
          <button
            onClick={() => setShowAddResource(!showAddResource)}
            style={{
              display: "block",
              textAlign: "center",
              backgroundColor: "#06BBCC",
              color: "#fff",
              padding: "10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add Resource
          </button>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: '200px', padding: '20px' }}>
        <h3 style={{ textAlign: 'center', color: 'red' }}>
          Resources
        </h3>
        {userType === 'INS' && showAddResource && (
          <div>
            <div>
              <label>Add Resource - Week:</label>
              <input
                type="text"
                placeholder="Week Number"
                value={newResourceWeek}
                onChange={(e) => setNewResourceWeek(e.target.value)}
              />
            </div>
            <div>
              <label>Resource Link:</label>
              <input
                type="text"
                placeholder="Resource Link"
                value={newResourceLink}
                onChange={(e) => setNewResourceLink(e.target.value)}
              />
            </div>
            <button onClick={handleAddOrUpdateResource}>Add/Update Resource</button>
            {alertMessage && <p>{alertMessage}</p>}
          </div>
        )}

        <div>
          {Object.keys(weekResources).map((weekNumber) => (
            <div key={weekNumber}>
              <h4>Week {weekNumber}:</h4>
              {Array.isArray(weekResources[weekNumber]) ? (
                weekResources[weekNumber].map((resource, index) => (
                  <div key={index}>
                    <h6>
                      Resource Here:
                    </h6>
                    <p>
                    <button

                      style={{
                        width: '100px',
                        backgroundColor: '#06BBCC',
                        color: '#fff',
                        padding: '5px 10px',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleDownload(resource.link)}
                    >
                      Download Now
                    </button>
                    </p>
                  </div>
                ))
              ) : (
                <div>
                  <p>
                    Resource Here:{' '}
                    <button
                      style={{
                        backgroundColor: '#06BBCC',
                        color: '#fff',
                        padding: '5px 10px',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleDownload(weekResources[weekNumber].link)}
                    >
                      Download Now
                    </button>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resource;
