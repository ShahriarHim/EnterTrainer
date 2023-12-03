import axios from "axios";
import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Lottie from "lottie-react";
import Rewards from "../Animations/rewards.json";
export default function RewardsPage() {
    const navigate = useNavigate();
    const [call, setCall] = React.useState(false);
    const [error, setError] = React.useState(null);
    const handleNavigate = () => {
        navigate(-1);
    };
    async function PostRewards(){
        const location = useLocation();
        const urlParams = new URLSearchParams(location.search);
        const myParam1 = urlParams.get('courseid'); // course id getting here
        const myParam2 = urlParams.get('userid'); // user id getting here
        try{
            const response = await axios.get("http://localhost:5000/rewards?courseid="+myParam1+"&userid="+myParam2);
            console.log(response.data);
            return response.data;
        }
        catch(err){
            setError(true);
            console.log(err);
            return null;
        }
    }
    if (!call) {
        PostRewards();
        setCall(true);
    }
    console.log(call)
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh"
        }}>
        {
            error ? (
                <div>
                    <h2>You just can't get a reward like that!</h2>
                    <button onClick={handleNavigate}>Go Back</button>
                </div>
            ) : (
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "100vh"
                }}>
                    <h1>Keep moving like this you will win the world in no time!</h1>
                    <h1>Here is your reward: +10 points</h1>
                    <Lottie animationData={Rewards} style={{ width: "30%" }} />
                    <button onClick={handleNavigate}>Go forward</button>
                </div>
            )
        }
        </div>
    );
}
