import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FocusMode = () => {
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState("");
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  // Add a new subtask
  const handleAddSubtask = () => {
    if (newSubtask.trim() !== "") {
      setSubtasks([...subtasks, { text: newSubtask, completed: false }]);
      setNewSubtask("");
    }
  };

  // Toggle subtask completion
  const toggleSubtaskCompletion = (index) => {
    const updatedSubtasks = subtasks.map((subtask, i) =>
      i === index ? { ...subtask, completed: !subtask.completed } : subtask
    );
    setSubtasks(updatedSubtasks);
  };

  // Convert seconds to mm:ss format for the timer
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl text-center">
        <div className="mb-6">
          <h4 className="text-xl font-semibold mb-4">
            Focus Timer: {formatTime(timer)}
          </h4>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`py-2 px-4 rounded ${
              isRunning ? "bg-red-600" : "bg-blue-600"
            } text-white mr-4`}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={() => setTimer(0)}
            className="py-2 px-4 bg-gray-500 text-white rounded"
          >
            Reset Timer
          </button>
        </div>

        <div className="mb-6">
          <h4 className="text-xl font-semibold mb-4">Subtasks</h4>
          <ul className="mb-4">
            {subtasks.map((subtask, index) => (
              <li
                key={index}
                className="flex justify-between items-center mb-2"
              >
                <span className={`${subtask.completed ? "line-through" : ""}`}>
                  {subtask.text}
                </span>
                <button
                  onClick={() => toggleSubtaskCompletion(index)}
                  className={`py-1 px-2 rounded ${
                    subtask.completed ? "bg-green-500" : "bg-gray-400"
                  } text-white`}
                >
                  {subtask.completed ? "Completed" : "Mark as Done"}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex mb-4">
            <input
              type="text"
              className="w-full p-2 border rounded mr-2"
              placeholder="New Subtask"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
            />
            <button
              onClick={handleAddSubtask}
              className="bg-blue-600 text-white py-2 px-4 rounded"
            >
              Add Subtask
            </button>
          </div>
        </div>

        <button
          onClick={() => alert("Goal marked as complete!")}
          className="bg-green-600 text-white py-2 px-6 rounded mb-4"
        >
          Mark Goal as Complete
        </button>
        <Link to={"/"}>
          <button className="bg-gray-500 text-white py-2 px-6 rounded ml-8">
            Exit Focus Mode
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FocusMode;
