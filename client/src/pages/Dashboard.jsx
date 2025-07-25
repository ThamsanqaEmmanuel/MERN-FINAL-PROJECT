import React from "react";
import ApplyForm from "../components/ApplyForm";
import ViewStatus from "../components/ViewStatus";
import ContactForm from "../components/ContactForm";

const Dashboard = ({ activeSection, onNavChange }) => {
  const renderSection = () => {
    switch (activeSection) {
      case "apply":
        return <ApplyForm />;
      case "status":
        return <ViewStatus />;
      case "contact":
        return <ContactForm />;
      default:
        return <ApplyForm />;
    }
  };

  return (
    <div className="p-4">
      {renderSection()}
    </div>
  );
};

export default Dashboard;
