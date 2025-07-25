import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUser } from "../services/api";  

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const response = await loginUser({ email, password });
    const { data } = response;

    if (!data.token) {
      alert("Login failed: no token received");
      setLoading(false);
      return;
    }

    // Store token and user info
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("name", data.name);
    localStorage.setItem("isAdmin", data.isAdmin); // optional

    // Redirect based on role
    if (data.isAdmin) {
      navigate("/admin/admindashboard");
    } else {
      navigate("/dashboard");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert(err?.response?.data?.error || "Login failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full " style={{ width: "400px", height: "400px" }}>
        <CardContent className="space-y-4 py-6">
          <h2 className="text-xl font-semibold text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
