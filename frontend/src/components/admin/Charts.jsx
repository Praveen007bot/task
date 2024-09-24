import React from 'react'
import Sidebar from './Sidebar/Sidebar'

const Charts = () => {
  return (
    <div className="flex">
      {/* Sidebar Section */}
      <div className="w-[16%]">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* You can add your main content here */}
        <h1 className="text-3xl font-semibold">Charts</h1>
        {/* Other content goes here */}
      </div>
    </div>
  )
}

export default Charts