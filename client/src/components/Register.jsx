import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { registerUser } from "../services/api"; 

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    surname: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    gender: "",
    isCitizen: false,
    isDisabled: false,
    oathConfirmed: false,
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCheckbox = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.checked }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.oathConfirmed) {
      alert("You must confirm the oath to proceed.");
      return;
    }

    try {
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full"  style={{ width: "500px", height: "600px" }}>
        <CardContent className="space-y-4 py-6">
          <h2 className="text-xl font-semibold text-center">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              name="surname"
              placeholder="Surname"
              value={form.surname}
              onChange={handleChange}
              required
            />
            <Input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <Input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isCitizen"
                name="isCitizen"
                checked={form.isCitizen}
                onCheckedChange={(checked) =>
                  setForm((prev) => ({ ...prev, isCitizen: checked }))
                }
              />
              <Label htmlFor="isCitizen">I am a South African citizen</Label>
            </div>


            <div className="flex items-center space-x-2">
              <Checkbox
                id="oathConfirmed"
                name="oathConfirmed"
                checked={form.oathConfirmed}
                onCheckedChange={(checked) =>
                  setForm((prev) => ({ ...prev, oathConfirmed: checked }))
                }
                required
              />
              <Label htmlFor="oathConfirmed">
                I confirm that all information is correct.
              </Label>
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
