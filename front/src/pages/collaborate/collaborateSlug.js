import React from 'react';
import {useLocation} from "react-router-dom";
export default function Collaborate(){
    const [data,setData] = React.useState([]);
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const myParam1 = urlParams.get('serial');
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/collaborate-projects/?serial=${myParam1}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setData(data.data);
                } else {
                    console.error('Failed to fetch courses');
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchData();
    },[myParam1]);
    return(
        <div>
            Collaborate serial: {myParam1}
            {
                data && (
                    <div className="courses-container">
                        {data.map((projects,index) => (
                            <div
                                key={index}
                                className="course-card"
                            >
                                <div className="course-card-content">
                                    <h3 style={{ color: '#fff', textAlign: 'center' }}>{projects.title}</h3>
                                    <p style={{ color: 'black', textAlign: 'center' }}>{projects.description}</p>
                                    <p style={{ color: 'black', textAlign: 'center' }}>{projects.requirements}</p>
                                    <p style={{ color: 'black', textAlign: 'center' }}>Project Created At:{projects.createdAt}</p>
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
                                        <a href={`/collaborate-projects`} style={{color:"white"}}>Go Back</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}
