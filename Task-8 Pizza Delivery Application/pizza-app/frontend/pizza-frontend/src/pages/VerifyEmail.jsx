import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await API.get(`/auth/verify/${token}`);
        setMessage(res.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 3000);

      } catch (err) {
        setMessage("Verification failed or invalid link.");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div style={container}>
      <div style={card}>
        <h2>📧 Email Verification</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(to right, #c9d6ff, #e2e2e2)",
};

const card = {
  background: "white",
  padding: "40px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
};

export default VerifyEmail;