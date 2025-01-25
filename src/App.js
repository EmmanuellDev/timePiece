import React, { useState, useEffect } from 'react';
import BG from "../src/img/bg.png";

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
    const hours = (`0${Math.floor((time / 3600000) % 24)}`).slice(-2);
    const days = Math.floor(time / 86400000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s.${milliseconds}`;
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
      style={{ backgroundImage: `url(${BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="text-5xl font-extrabold shadow-lg p-4 rounded bg-black bg-opacity-50">
        {formatTime(time)}
      </div>
      <div className="flex flex-col space-y-4 mt-8">
        {!isRunning ? (
          <button
            className="px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-green-600"
            onClick={handleStart}
          >
            Start
          </button>
        ) : (
          <button
            className="px-6 py-3 bg-yellow-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-yellow-600"
            onClick={handlePause}
          >
            Pause
          </button>
        )}
        <button
          className="px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-red-600"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
