import React from "react";
import { Button } from "@/components/ui/button";
import DarkModeToggle from "../components/DarkModeToggle";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-10 bg-background text-foreground">
      <section className="text-center space-y-6 max-w-lg">
        <h1 className="text-4xl font-bold">Welcome to the RDP Management System</h1>
        <p className="text-lg">Apply for government housing with ease.</p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/register">Register</Link>
          </Button>
        </div>
        
      </section>
    </main>
  );
};

export default Index;
