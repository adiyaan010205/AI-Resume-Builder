import React from 'react';

const ResumeBuilder = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Resume Builder</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Resume Details</h2>
          <form className="space-y-4">
            {/* Form fields will go here */}
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
                placeholder="Enter your full name"
              />
            </div>
          </form>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div className="border rounded-md p-4 min-h-[500px]">
            {/* Resume preview will go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder; 