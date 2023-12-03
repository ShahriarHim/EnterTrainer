import axios from 'axios';
import React from 'react';
import Navbar from '../Comp/navbar';
export default function Events(){
    const [data,setData] = React.useState([]);
    React.useEffect(() => {
        axios.get('http://localhost:5000/events')
        .then((response) => {
            setData(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },[]);
    console.log(data)
    return(
        <>
        <Navbar />
        <div>
            List of Events
            <div>
                <a href="/add-events">Create Event</a>
            </div>
            {data && (
                <div className="courses-container">
                    {data.map((events,index) => (
                        <div
                            key={index}
                            className="course-card"
                        >
                            <div className="course-card-content">
                                <h3 style={{ color: '#fff', textAlign: 'center' }}>{events.title}</h3>
                                <p style={{ color: 'black', textAlign: 'center' }}>{events.description}</p>
                                <p style={{ color: 'black', textAlign: 'center' }}>{events.date}</p>
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
                                    <a href={`/event-one/?serial=${events.serial}`}>View Project</a>
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
