"use client";

import { useEffect, useState , useRef , ChangeEvent } from "react";
import { Input } from "@/components//ui/input";
import { Button } from "@/components/ui/button";

export default function CountDown() {
    const [duration, setDuration] = useState< number | string>("");
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const timeRef = useRef<NodeJS.Timeout | null>(null);

    const handleSetDuration = (): void => {
        if (typeof duration === "number" && duration > 0) {
            setTimeLeft(duration);
            setIsActive(true);
            setIsPaused(false);
            if (timeRef.current) {
                clearInterval(timeRef.current);
            }
        }
    };

    const handleStart = (): void => {
        if (timeLeft > 0) {
            setIsActive(true);
            setIsPaused(false);
        }
    };


    const handlePause = (): void => {
        if (isActive) {
            setIsPaused(true);
            setIsActive(false);
            if (timeRef.current) {
                clearInterval(timeRef.current);
            }
        }
    };


    const handleReset = (): void => {
        setIsActive(false);
        setIsPaused(false);
        setTimeLeft(typeof duration === "number" ? duration : 0);
        if (timeRef.current) {
            clearInterval(timeRef.current);
        }
    };

    useEffect(() => {
        if (isActive && !isPaused) {
            timeRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timeRef.current!);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => {
            if (timeRef.current) {
                clearInterval(timeRef.current);
            }
        };
    }, [isActive, isPaused]);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDuration(Number(e.target.value) || "");
    }
    
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">

    {/* Timer box container */}
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">

      {/* Title of the countdown timer */}
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
        Countdown Timer
      </h1>

      {/* Input and set button container */}
      <div className="flex items-center mb-6">
        <input
          type="number"
          id="duration"
          placeholder="Enter duration in seconds"
          value={duration}
          onChange={handleDurationChange}
          className="flex-1 mr-4 rounded-md border-2 border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 p-2"
        />
        <button
          onClick={handleSetDuration}
          className="text-gray-800 dark:text-gray-200 border rounded-md px-4 py-2"
        >
          Set
        </button>
      </div>

      {/* Display the formatted time left */}
      <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
        {formatTime(timeLeft)}
      </div>

      {/* Buttons to start, pause, and reset the timer */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleStart}
          className="text-gray-800 dark:text-gray-200 border rounded-md px-4 py-2"
        >
          {isPaused ? "Resume" : "Start"}
        </button>

        <button
          onClick={handlePause}
          className="text-gray-800 dark:text-gray-200 border rounded-md px-4 py-2"
        >
          Pause
        </button>

        <button
          onClick={handleReset}
          className="text-gray-800 dark:text-gray-200 border rounded-md px-4 py-2"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
);
}