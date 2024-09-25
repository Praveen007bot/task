import React from 'react';
import Navbar from './Header';

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-10 p-6">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">About Our Goal Tracking App</h1>
        <p className="text-gray-600 text-lg mb-6">
          Our goal tracking app helps you set, track, and achieve your personal and professional goals.
          Whether you're working on improving a skill, developing healthy habits, or advancing your career,
          this app provides a simple yet powerful tool to keep you on track.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Why Goal Tracking?</h2>
        <p className="text-gray-600 text-lg mb-6">
          Setting goals is the first step toward turning your vision into reality. By tracking your goals,
          you can measure your progress, stay motivated, and make adjustments along the way to ensure you
          stay on the right path. Our app is designed to make this process easy and intuitive.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Key Features</h2>
        <ul className="list-disc pl-5 text-gray-600 mb-6">
          <li>Easy goal creation and customization</li>
          <li>Track your daily, weekly, or monthly progress</li>
          <li>Visual progress charts and reminders</li>
          <li>Set milestones and deadlines to stay focused</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Get Started Today</h2>
        <p className="text-gray-600 text-lg">
          Start your goal-setting journey with us today. Simply create an account, set your goals, and begin tracking.
          Stay focused, stay motivated, and achieve greatness one step at a time!
        </p>
      </div>
    </div>
  );
};

export default About;
