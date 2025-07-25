import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getUserProfile, updateUserProfile } from "../services/api";
import { Pencil } from "lucide-react";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    phone: "",
  });

  const [editing, setEditing] = useState({
    name: false,
    surname: false,
    email: false,
    address: false,
    phone: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggleEdit = (field) => {
    setEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async () => {
    try {
      const res = await updateUserProfile({
        name: user.name,
        surname: user.surname,
        address: user.address,
        phone: user.phone,
      });
      setUser(res.data);
      alert("Profile updated!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-10 p-6 shadow-md border border-gray-300">
      <CardContent className="flex flex-col items-center space-y-6">
        <img
          src="https://via.placeholder.com/150"
          alt="Avatar"
          className="rounded-full w-24 h-24 object-cover"
        />
        <h2 className="text-xl font-bold">
          {user.name} {user.surname}
        </h2>
        <p className="text-gray-500">@{user.name?.toLowerCase() || "username"}</p>

        <div className="w-full space-y-4">
          {["name", "surname", "email", "address", "phone"].map((field) => (
            <div key={field} className="flex items-center justify-between">
              <label className="font-semibold capitalize w-24">{field}</label>
              {editing[field] && field !== "email" ? (
                <Input
                  value={user[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="flex-1 ml-2"
                />
              ) : (
                <span className="text-gray-700 flex-1 ml-2">
                  {user[field] || "—"}
                </span>
              )}
              {field !== "email" && (
                <button
                  type="button"
                  onClick={() => handleToggleEdit(field)}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  <Pencil size={16} />
                </button>
              )}
            </div>
          ))}
          <Button onClick={handleSave} className="w-full mt-4">
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;