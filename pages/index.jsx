import React from "react";
import Sidebar from "@/components/Sidebar";
import Home from "./home";

const Index = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Home />
    </div>
  );
};

export default Index;
