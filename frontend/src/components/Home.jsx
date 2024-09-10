import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Header />
      <section className="bg-gray-100 text-center py-44">
        <h2 className="text-4xl font-bold mb-4">
          Achieve Your Goals with Ease
        </h2>
        <p className="text-lg mb-8">
          GoalManager helps you organize, track, and accomplish your objectives
          efficiently.
        </p>
        <Link
          to={"/Goals"}
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Get Started
        </Link>
      </section>
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg">
              <h4 className="text-xl font-semibold mb-4">Goal Setting</h4>
              <p>Set measurable goals to achieve your desired outcomes.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h4 className="text-xl font-semibold mb-4">Task Management</h4>
              <p>Break down goals into manageable tasks and stay on track.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h4 className="text-xl font-semibold mb-4">Progress Tracking</h4>
              <p>
                Visualize your progress and stay motivated with detailed
                insights.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
