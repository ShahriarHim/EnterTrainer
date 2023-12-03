import React from 'react';
import { useLocation } from 'react-router-dom';
export default function Events(){
    const [data,setData] = React.useState([]);
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const myParam1 = urlParams.get('serial');
    console.log(myParam1)
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/events/?serial=${myParam1}`);
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
            Events serial: {myParam1}
            {
                data && (
                    <div className="courses-container">
                        {data.map((events,index) => (
                            <div
                                key={index}
                                className="course-card"
                            >
                                <div className="course-card-content">
                                    <h3 style={{ color: '#fff', textAlign: 'center' }}>{events.title}</h3>
                                    <p style={{ color: 'black', textAlign: 'center' }}>{events.description}</p>
                                    <p style={{ color: 'black', textAlign: 'center' }}>Event date: {events.date}</p>
                                    <p style={{ color: 'black', textAlign: 'center' }}>Event Created At:{events.createdAt}</p>
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
                                        <a href={`/events`} style={{color:"white"}}>Go Back</a>
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
