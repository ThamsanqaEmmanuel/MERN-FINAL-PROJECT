import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUserById,
  deleteUserById,
  getContacts,
  deleteContactById,
  getAllApplications,
  deleteApplicationById
} from "../services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchContacts();
    fetchApplications();
  }, []);

  const fetchUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
  };

  const fetchContacts = async () => {
    const res = await getContacts();
    setContacts(res.data);
  };

  const fetchApplications = async () => {
    const res = await getAllApplications();
    setApplications(res.data);
  };

  const handleEdit = (user) => {
    setEditingUser({ ...user });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateUserById(editingUser._id, editingUser);
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async (id, type) => {
    if (type === "user") {
      await deleteUserById(id);
      fetchUsers();
    } else if (type === "contact") {
      await deleteContactById(id);
      fetchContacts();
    } else if (type === "application") {
      await deleteApplicationById(id);
      fetchApplications();
    }
    setEditingUser(null);
  };

  const getUserName = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? `${user.name} ${user.surname}` : "Unknown User";
  };

  return (
    <div className="p-6 space-y-10">
      {/* Users Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">All Users</h2>
        {users.map((user) => (
          <div key={user._id} className="border p-4 rounded mb-4 shadow">
            {editingUser && editingUser._id === user._id ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="name" value={editingUser.name} onChange={handleChange} placeholder="Name" />
                <Input name="surname" value={editingUser.surname} onChange={handleChange} placeholder="Surname" />
                <Input name="email" value={editingUser.email} onChange={handleChange} placeholder="Email" />
                <Input name="phone" value={editingUser.phone} onChange={handleChange} placeholder="Phone" />
                <div className="flex gap-2 mt-2">
                  <Button onClick={handleUpdate}>Save</Button>
                  <Button onClick={() => setEditingUser(null)} variant="secondary">Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Surname:</strong> {user.surname}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <div className="flex gap-2 mt-2">
                  <Button onClick={() => handleEdit(user)}>Edit</Button>
                  <Button onClick={() => handleDelete(user._id, "user")} variant="destructive">Delete</Button>
                </div>
              </div>
            )}
          </div>
        ))}
        {users.length === 0 && <p className="text-center text-gray-500">No users available</p>}
      </section>

      {/* Contacts Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
        {contacts.map((contact) => (
          <div key={contact._id} className="border p-4 rounded mb-4 shadow">
            <p><strong>From:</strong> {getUserName(contact.user)}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Message:</strong> {contact.message}</p>
            <Button onClick={() => handleDelete(contact._id, "contact")} variant="destructive" className="mt-2">Delete</Button>
          </div>
        ))}
        {contacts.length === 0 && <p className="text-center text-gray-500">No contacts available</p>}
      </section>

      {/* Applications Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">RDP Applications</h2>
        {applications.map((app) => (
          <div key={app._id} className="border p-4 rounded mb-4 shadow">
            <p><strong>Applicant:</strong> {getUserName(app.user)}</p>
            <p><strong>ID Number:</strong> {app.idNumber}</p>
            <p><strong>Date Applied:</strong> {new Date(app.dateApplied).toLocaleDateString()}</p>
            <Button onClick={() => handleDelete(app._id, "application")} variant="destructive" className="mt-2">Delete</Button>
          </div>
        ))}
        {applications.length === 0 && <p className="text-center text-gray-500">No applications available</p>}
      </section>
    </div>
  );
};

export default AdminDashboard;
