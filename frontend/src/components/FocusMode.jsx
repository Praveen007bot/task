import React, { useState, useEffect } from 'react';

const FocusMode = () => {
  const [time, setTime] = useState(0); // Time in seconds
  const [isPaused, setIsPaused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [customTime, setCustomTime] = useState('');

  // Timer Countdown
  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      setIsActive(false);
      alert("Focus time completed!"); // Using alert instead of ToastAndroid
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, time]);

  // Convert seconds to mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Start Timer
  const startTimer = (minutes) => {
    setTime(minutes * 60); // Convert minutes to seconds
    setIsActive(true);
    setIsPaused(false);
  };

  // Custom Time Handler
  const handleCustomTime = () => {
    const minutes = parseInt(customTime);
    if (!isNaN(minutes) && minutes > 0) {
      startTimer(minutes);
      setCustomTime('');
    } else {
      alert("Please enter a valid number"); // Using alert instead of ToastAndroid
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-8 bg-gradient-to-r from-purple-400 to-blue-500 h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">Focus Mode</h1>
      
      {/* Display Timer */}
      <h2 className="text-6xl font-extrabold mb-10">{formatTime(time)}</h2>

      {/* Time Options */}
      <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-lg">
        <button className="bg-blue-600 hover:bg-blue-700 transition duration-200 p-4 rounded-lg shadow-lg" onClick={() => startTimer(15)}>15 Min</button>
        <button className="bg-blue-600 hover:bg-blue-700 transition duration-200 p-4 rounded-lg shadow-lg" onClick={() => startTimer(30)}>30 Min</button>
        <button className="bg-blue-600 hover:bg-blue-700 transition duration-200 p-4 rounded-lg shadow-lg" onClick={() => startTimer(60)}>1 Hr</button>
        <button className="bg-blue-600 hover:bg-blue-700 transition duration-200 p-4 rounded-lg shadow-lg" onClick={() => startTimer(120)}>2 Hr</button>
      </div>

      {/* Custom Time Input */}
      <div className="flex items-center mb-10  rounded-lg shadow-lg overflow-hidden">
        <input
          type="number"
          className="border-none p-4 w-36 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mr-10"
          value={customTime}
          onChange={(e) => setCustomTime(e.target.value)}
          placeholder="Custom time (min)"
        />
        <button className="bg-blue-600 hover:bg-blue-700 transition duration-200 p-4 text-white rounded-lg" onClick={handleCustomTime}>Start</button>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-between w-full max-w-lg">
        <button className="bg-red-600 hover:bg-red-700 transition duration-200 p-4 rounded-lg shadow-lg mx-2" onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? 'Resume' : 'Pause'}
        </button>

        <button className="bg-red-600 hover:bg-red-700 transition duration-200 p-4 rounded-lg shadow-lg mx-2" onClick={() => {
          setIsActive(false);
          setTime(0);
        }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FocusMode;
