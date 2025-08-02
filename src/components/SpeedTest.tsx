"use client";

import React, { useState, useEffect } from "react";

interface SpeedTestProps {
  question: string;
  correctAnswer: "yes" | "no";
  onFinish?: (result: { correct: boolean; timedOut: boolean }) => void;
  disabled?: boolean;
}

const TIMER_SECONDS = 30;

export const SpeedTest: React.FC<SpeedTestProps> = ({
  question,
  correctAnswer,
  onFinish,
  disabled = false,
}) => {
  const [selected, setSelected] = useState<"yes" | "no" | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (selected || timedOut) return;
    if (timer === 0) {
      setTimedOut(true);
      setIsCorrect(false);
      if (onFinish) onFinish({ correct: false, timedOut: true });
      return;
    }
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, selected, timedOut, onFinish]);

  const handleAnswer = (ans: "yes" | "no") => {
    if (selected || timedOut) return;
    setSelected(ans);
    const correct = ans === correctAnswer;
    setIsCorrect(correct);
    if (onFinish) onFinish({ correct, timedOut: false });
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow text-center">

      <div className="mb-8">
        <p className="text-xl font-medium text-gray-900">{question}</p>
      </div>
      <div className="flex justify-center gap-8">
        <button
          onClick={() => handleAnswer("yes")}
          disabled={!!selected || timedOut || disabled}
          className={`px-8 py-4 rounded-lg text-lg font-semibold transition-all focus:outline-none border-2 \
  ${selected === "yes"
    ? (isCorrect === true
        ? "bg-green-500 border-green-600 text-white"
        : isCorrect === false
          ? "bg-red-500 border-red-600 text-white"
          : "bg-gray-100 border-gray-300 text-gray-900 hover:bg-primary/10 hover:border-primary")
    : "bg-gray-100 border-gray-300 text-gray-900 hover:bg-primary/10 hover:border-primary"}
  ${timedOut ? "opacity-60 cursor-not-allowed" : ""}
`}
        >
          Yes
        </button>
        <button
          onClick={() => handleAnswer("no")}
          disabled={!!selected || timedOut || disabled}
          className={`px-8 py-4 rounded-lg text-lg font-semibold transition-all focus:outline-none border-2 \
  ${selected === "no"
    ? (isCorrect === false
        ? "bg-red-500 border-red-600 text-white"
        : isCorrect === true
          ? "bg-green-500 border-green-600 text-white"
          : "bg-gray-100 border-gray-300 text-gray-900 hover:bg-primary/10 hover:border-primary")
    : "bg-gray-100 border-gray-300 text-gray-900 hover:bg-primary/10 hover:border-primary"}
  ${timedOut ? "opacity-60 cursor-not-allowed" : ""}
`}
        >
          No
        </button>
      </div>
      {/* Feedback area always rendered to prevent layout shift */}
      <div className="mt-6 min-h-[28px] flex items-center justify-center">
        {selected ? (
          isCorrect ? (
            <span className="text-green-600 font-semibold">Correct!</span>
          ) : (
            <span className="text-red-600 font-semibold">Incorrect.</span>
          )
        ) : timedOut ? (
          <span className="text-red-600 font-semibold">Time's up!</span>
        ) : (
          // Empty span to reserve space
          <span className="invisible">placeholder</span>
        )}
      </div>
    </div>
  );
};

export default SpeedTest;
