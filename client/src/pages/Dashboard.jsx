import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApplyForm from "../components/ApplyForm";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="p-4">
      <ApplyForm />
    </div>
  );
};

export default Dashboard;