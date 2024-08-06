import React from "react";

const LandingPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/landingPage.jpeg')",
      }}
    >
      <div className="w-full bg-white bg-opacity-80 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Section 1</h2>
            <p>Content for the first section goes here.</p>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Section 2</h2>
            <p>Content for the second section goes here.</p>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Section 3</h2>
            <p>Content for the third section goes here.</p>
          </div>
          {/* Add more sections as needed */}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
