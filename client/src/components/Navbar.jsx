import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DarkModeToggle from "./DarkModeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = ({ onNavChange, activeSection }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    navigate("/login");
  };

  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <nav className="flex items-center justify-between p-4 shadow-md bg-white dark:bg-gray-900">
      <Link to="/" className="text-xl font-bold text-primary">
        RDP Portal
      </Link>

      <div className="flex items-center gap-4">
        <DarkModeToggle />

        {token ? (
          <>
            {isDashboard && (
              <>
                
                <Link to="/view-status">
                <Button variant="ghost">View Status</Button>
                </Link>
                <Link to="/contact">
                <Button variant="ghost">Contact</Button>
                </Link>
                

                <div className="flex items-center space-x-2 ml-4">
                 <Link to="/user-profile">
                  <Avatar>
                    <AvatarFallback>
                      {(localStorage.getItem("name")?.[0] || "U").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  </Link>
                  <span className="hidden sm:inline font-semibold text-gray-700 dark:text-gray-300">
                    Welcome, {localStorage.getItem("name") || "User"}
                  </span>
                  <Button variant="destructive" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </>
            )}
            {!isDashboard && (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Button variant="destructive" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline">Register</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
