import React from "react";
import { useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import Congratulations from "../Animations/congratulations.json";
export default function CongratulationsPage() {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(-1);
    };
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh"
        }}>
        <h1>Congratulations</h1>
        <Lottie animationData={Congratulations} style={{ width: "30%" }} />
        <button onClick={handleNavigate}>Go Back</button>
        </div>
    );
}