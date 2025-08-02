"use client";

import React, { useState, useEffect } from "react";
import SpeedTest from "@/components/SpeedTest";
import ResultCard from "@/components/ui/ResultCard";
import Link from "next/link";

const questions = [
  { question: "Is AI short for Artificial Intelligence?", correctAnswer: "yes" },
  { question: "Is machine learning a subset of AI?", correctAnswer: "yes" },
  { question: "Does AI stand for Artificial Ignorance?", correctAnswer: "no" },
  { question: "Can AI be used for image recognition?", correctAnswer: "yes" },
  { question: "Is 'GPT-4' an AI language model?", correctAnswer: "yes" },
  { question: "Does AI always require the internet to function?", correctAnswer: "no" },
  { question: "Is supervised learning a type of machine learning?", correctAnswer: "yes" },
  { question: "Can AI generate realistic human faces?", correctAnswer: "yes" },
  { question: "Is AI only used in robotics?", correctAnswer: "no" },
  { question: "Can AI help detect fraud in banking?", correctAnswer: "yes" },
];

export default function SpeedTestDemoPage() {
  const TOTAL_TIME = 30; // seconds
  const [current, setCurrent] = useState(0);
  const [results, setResults] = useState<{correct: boolean, timedOut: boolean}[]>([]);
  const [completed, setCompleted] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(TOTAL_TIME);
  const animationFrameRef = React.useRef<number>();

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Initialize timer when component mounts or resets
  useEffect(() => {
    if (!completed && !timedOut) {
      const now = Date.now();
      const newEndTime = now + TOTAL_TIME * 1000;
      setStartTime(now);
      setEndTime(newEndTime);
      setRemaining(TOTAL_TIME);
      
      // Start the animation frame loop with the new end time
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      const update = () => {
        const currentTime = Date.now();
        const timeLeft = Math.max(0, (newEndTime - currentTime) / 1000);
        setRemaining(timeLeft);

        if (timeLeft <= 0) {
          setTimedOut(true);
          setCompleted(true);
          return;
        }

        if (!completed && !timedOut) {
          animationFrameRef.current = requestAnimationFrame(update);
        }
      };
      
      animationFrameRef.current = requestAnimationFrame(update);
    }
  }, [completed, timedOut]);

  const handleFinish = (result: {correct: boolean, timedOut: boolean}) => {
    setResults(prev => [...prev, result]);
    if (current < questions.length - 1) {
      setTimeout(() => setCurrent(c => c + 1), 800);
    } else {
      setTimeout(() => setCompleted(true), 800);
    }
  };

  const canAnswer = !completed && !timedOut && remaining > 0;

  useEffect(() => {
    if (!completed && !timedOut && endTime === null) {
      const start = Date.now();
      setStartTime(start);
      setEndTime(start + TOTAL_TIME * 1000);
      setNow(start);
    }
  }, [completed, timedOut, endTime]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header navigation */}
      <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/"
            className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </Link>
          
          {/* Header with blue background */}
          <div className="bg-[#2158F4] text-white rounded-lg p-4 sm:p-6 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold">Speed Test Demo</h1>
            <p className="mt-1">Lesson: Data & Tech Capable</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
        {/* 60s timer bar */}
        <div className="mb-8">
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-4 transition-all duration-1000 ${remaining <= 10 ? "bg-red-500" : "bg-primary"}`}
              style={{
                width: `${Math.max(0, Math.min(100, (remaining / TOTAL_TIME) * 100))}%`,
                transition: 'width 0.1s linear'
              }}
            />
          </div>
          <div className="text-sm text-gray-600 mt-1 text-right">
            {remaining > 0 ? `${Math.ceil(remaining)}s left` : "Time's up!"}
          </div>
        </div>
        {!completed ? (
          <SpeedTest
            key={current}
            question={questions[current].question}
            correctAnswer={questions[current].correctAnswer as "yes" | "no"}
            onFinish={handleFinish}
            disabled={!canAnswer}
          />
        ) : (
          <div className="space-y-4">
            <ResultCard
              correctCount={results.filter(r => r.correct).length}
              attemptedCount={results.length}
              totalCount={questions.length}
              onRedo={() => {
                setCurrent(0);
                setResults([]);
                setCompleted(false);
                setTimedOut(false);
              }}
              onNext={() => alert('Next activity coming soon!')}
            />
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
