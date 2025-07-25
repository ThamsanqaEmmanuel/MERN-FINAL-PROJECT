import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getUserApplication, updateUserApplication } from "../services/api";

const ViewStatus = () => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    idNumber: "",
    documentUrl: "",
  });

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const { data } = await getUserApplication();
        if (data) {
          setApplication(data);
          setForm({
            idNumber: data.idNumber || "",
            documentUrl: data.documentUrl || "",
          });
        }
      } catch (err) {
        console.error("Error fetching application", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserApplication(form);
      alert("Application updated successfully");
    } catch (err) {
      alert("Failed to update application");
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!application) return <div>No application found. Please apply first.</div>;

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-4">View / Edit Application Status</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">ID Number</label>
          <Input
            name="idNumber"
            value={form.idNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Document URL</label>
          <Input
            name="documentUrl"
            value={form.documentUrl}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Update Application</Button>
      </form>
    </div>
  );
};

export default ViewStatus;
