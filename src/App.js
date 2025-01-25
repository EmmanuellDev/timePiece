import React, { useState, useEffect } from 'react';
import { FaClock, FaPlay, FaPause, FaRedo } from 'react-icons/fa';

function App() {
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem('stopwatch-time');
    return savedTime ? parseInt(savedTime, 10) : 0;
  }); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(() => {
    const savedState = localStorage.getItem('stopwatch-isRunning');
    return savedState === 'true';
  });

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          const updatedTime = prevTime + 10;
          localStorage.setItem('stopwatch-time', updatedTime);
          return updatedTime;
        });
      }, 10);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    localStorage.setItem('stopwatch-isRunning', isRunning);
  }, [isRunning]);

  const formatTime = (time) => {
    const milliseconds = (`0${(time % 1000) / 10}`).slice(-2);
    const seconds = (`0${Math.floor((time / 1000) % 60)}`).slice(-2);
    const minutes = (`0${Math.floor((time / 60000) % 60)}`).slice(-2);
    const hours = Math.floor((time / 3600000) % 24);
    const days = Math.floor(time / 86400000);

    return `${days > 0 ? `${days}:` : ''}${hours > 0 ? `${hours}:` : ''}${minutes}:${seconds}.${milliseconds}`;
  };

  const handleStart = () => setIsRunning(true);

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    localStorage.removeItem('stopwatch-time');
    localStorage.removeItem('stopwatch-isRunning');
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen text-white"
      style={{ backgroundColor: 'black' }}
    >
      {/* Top Section: Clock Icon and Stopwatch Text */}
      <div className="flex flex-col items-center mb-4">
        <FaClock className="text-7xl text-gray-300" />
        <div className="text-3xl font-bold text-gray-300">Stopwatch</div>
      </div>

      {/* Bottom Section: Timer and Buttons */}
      <div className="flex flex-col items-center">
        {/* Timer */}
        <div className="text-6xl font-extrabold shadow-lg p-4 rounded bg-gray-800 bg-opacity-75 mb-8">
          {formatTime(time)}
        </div>

        {/* Buttons: Start/Pause/Reset */}
        <div className="flex space-x-4 mb-8">
          {!isRunning ? (
            <button
              className="p-4 bg-green-500 text-white text-xl font-semibold rounded-full shadow-lg hover:bg-green-600"
              onClick={handleStart}
            >
              <FaPlay />
            </button>
          ) : (
            <button
              className="p-4 bg-yellow-500 text-white text-xl font-semibold rounded-full shadow-lg hover:bg-yellow-600"
              onClick={handlePause}
            >
              <FaPause />
            </button>
          )}
          <button
            className="p-4 bg-red-500 text-white text-xl font-semibold rounded-full shadow-lg hover:bg-red-600"
            onClick={handleReset}
          >
            <FaRedo />
          </button>
        </div>
      </div>

      {/* Footer: Developed by Emma with Sixtyfour Convergence font */}
      <footer
        className="absolute bottom-14 text-gray-400"
        style={{ fontFamily: 'Sixtyfour Convergence, sans-serif' }}
      >
        Developed by Emma
      </footer>
    </div>
  );
}

export default App;