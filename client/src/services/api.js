// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if needed
});

// Add auth token to headers automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Users
export const registerUser = (data) => API.post("/users/register", data);
export const loginUser = (data) => API.post("/users/login", data);
export const getUserProfile = () => API.get("/users/profile");
export const updateUserProfile = (data) => API.put("/users/profile", data);
export const getAllUsers = () => API.get("/users/all");
export const getUserById = (id) => API.get(`/users/admin/${id}`);
export const updateUserById = (id, data) => API.put(`/users/admin/${id}`, data);
export const deleteUserById = (id) => API.delete(`/users/admin/${id}`);

// Applications
export const createApplication = (data) => API.post("/applications", data);
export const getUserApplication = () => API.get("/applications");
export const updateUserApplication = (data) => API.put("/applications", data);
export const getAllApplications = () => API.get("/applications/all");
export const getApplicationById = (id) => API.get(`/applications/admin/${id}`);
export const updateApplicationById = (id, data) => API.put(`/applications/admin/${id}`, data);
export const deleteApplicationById = (id) => API.delete(`/applications/admin/${id}`);

// Contacts
export const getContacts = () => API.get("/contacts");
export const createContact = (data) => API.post("/contacts", data);
export const deleteContactById = (id) => API.delete(`/contacts/${id}`);

export default API;
