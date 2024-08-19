import React from "react";

const BodyContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
  max-w-7xl mx-auto p-5"
    >
      {children}
    </div>
  );
};

export default BodyContainer;
