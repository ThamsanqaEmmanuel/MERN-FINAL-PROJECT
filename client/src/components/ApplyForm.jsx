import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createApplication } from "../services/api";

const ApplyForm = () => {
  const [form, setForm] = useState({
    idNumber: "",
    dateApplied: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    setForm((prev) => ({ ...prev, dateApplied: today }));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setForm((prev) => ({ ...prev, file: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(form.dateApplied) > new Date()) {
      alert("Date cannot be in the future");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in");
      return;
    }

    const data = new FormData();
    data.append("userId", userId);
    data.append("idNumber", form.idNumber);
    data.append("dateApplied", form.dateApplied);
    data.append("file", form.file);

    setLoading(true);
    try {
      await createApplication(data); // api.js must send FormData
      alert("Application submitted");
      setForm({ idNumber: "", dateApplied: "", file: null });
    } catch (err) {
      console.error(err);
      alert("Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-4">Apply for RDP</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="idNumber"
          value={form.idNumber}
          onChange={handleChange}
          placeholder="ID Number"
          required
        />
        <Input
          type="date"
          name="dateApplied"
          value={form.dateApplied}
          onChange={handleChange}
          required
        />
        <Input
          type="file"
          name="file"
          onChange={handleChange}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </div>
  );
};

export default ApplyForm;
