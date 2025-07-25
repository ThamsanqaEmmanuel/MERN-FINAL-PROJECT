import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ViewStatus from "@/components/ViewStatus";
import ContactForm from "./components/ContactForm";
import UserProfile from "@/components/UserProfile"; 
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        {/* Global Navbar rendered once */}
        <Navbar />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            
            <Route
              path="/admin/admindashboard"
              element={token ? <AdminDashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/dashboard"
              element={token ? <Dashboard /> : <Navigate to="/login" />}
            />
            
            <Route
              path="/contact"
              element={token ? <ContactForm /> : <Navigate to="/login" />}
            />
            <Route
              path="/view-status"
              element={token ? <ViewStatus /> : <Navigate to="/login" />}
            /> 
            <Route
             path="/user-profile"
             element={token ? <UserProfile /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
