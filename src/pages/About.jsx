// src/pages/About.jsx
import React from 'react';
import flowImage from '../assets/flowchart.png'; // replace with your image path
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <>
      <Navbar />
      {/* Add padding-top to offset fixed navbar */}
      <div className="pt-20 max-w-6xl mx-auto p-6 font-sans">
        <h1 className="text-3xl font-bold mb-8 text-center">Authentication Flow</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side: Flow steps */}
          <div className="md:w-1/2">
            <ol className="list-decimal list-inside space-y-2 text-lg">
              <li><strong>Start</strong></li>
              <li><strong>Login Page:</strong> User enters credentials</li>
              <li>
                <strong>Authenticate Credentials:</strong>
                <ul className="list-disc list-inside ml-6">
                  <li>If invalid → Show error → Back to login</li>
                  <li>If valid → Check role</li>
                </ul>
              </li>
              <li>
                <strong>Role Check:</strong>
                <ul className="list-disc list-inside ml-6">
                  <li>If Admin → Go to Admin Dashboard</li>
                  <li>If User → Go to User Dashboard</li>
                </ul>
              </li>
              <li>
                <strong>User Dashboard:</strong>
                <ul className="list-disc list-inside ml-6">
                  <li>Can view data</li>
                  <li>No edit/delete buttons</li>
                </ul>
              </li>
              <li>
                <strong>Admin Dashboard:</strong>
                <ul className="list-disc list-inside ml-6">
                  <li>Can view, edit, delete data</li>
                </ul>
              </li>
              <li><strong>Logout:</strong> Return to login page</li>
              <li><strong>End</strong></li>
            </ol>
          </div>

          {/* Right side: Image */}
          <div className="md:w-1/2 flex justify-center items-start">
            <img
              src={flowImage}
              alt="Authentication Flow Diagram"
              className="max-w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
