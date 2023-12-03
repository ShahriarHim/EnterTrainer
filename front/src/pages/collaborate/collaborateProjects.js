import axios from 'axios';
import React from 'react';
import Navbar from '../Comp/navbar';
export default function CollaborateProjects(){
    const [data,setData] = React.useState([]);
    React.useEffect(() => {
        axios.get('http://localhost:5000/collaborate-projects')
        .then((response) => {
            setData(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },[]);
    console.log(data);
    return(
        <>
        <Navbar />
        <div>
            List of Collaboration Projects
            <div>
                <a href="/add-collaborate-projects">Create Project</a>
            </div>
            {data && (
                <div className="courses-container">
                    {data.map((projects,index) => (
                        <div
                            key={index}
                            className="course-card"
                        >
                            <div className="course-card-content">
                                <h3 style={{ color: '#fff', textAlign: 'center' }}>{projects.title}</h3>
                                <p style={{ color: 'black', textAlign: 'center' }}>{projects.description}</p>
                                <div style={
                                    {
                                        display:"flex",
                                        justifyContent:"center",
                                        alignItems:"center",
                                        backgroundColor:"blue",
                                        buttonRadius:"15px",
                                        width:"120px",
                                        margin:"auto",
                                        color:"white",
                                    }
                                }>
                                    <a href={`/collaborate-one/?serial=${projects.serial}`}>View Project</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </>
    )
}