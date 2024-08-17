import React, { useState } from "react";

function EnrollModal({ course, onEnroll }) {
  const [studentId, setStudentId] = useState("");
  const [paymentInfo, setPaymentInfo] = useState(""); // Ignored in handling

  const handleEnroll = () => {
    onEnroll(studentId); // Store only student ID
    setStudentId("");
    setPaymentInfo("");
  };

  return (
    <div className="enroll-modal">
      <h2>Enroll in {course.name}</h2>
      <input
        type="text"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Payment Credentials" // Ignored in the logic
        value={paymentInfo}
        onChange={(e) => setPaymentInfo(e.target.value)}
      />
      <button onClick={handleEnroll}>Enroll</button>
      <button onClick={() => onEnroll(null)}>Cancel</button>
    </div>
  );
}

export default EnrollModal;
