"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { SpeedTestQuestion } from "@/data/speed-test-questions";

export interface SpeedTestProps {
  questions: SpeedTestQuestion[];
  onComplete: (results: { correct: boolean; questionId: string }[]) => void;
  timePerQuestion?: number;
  className?: string;
}

export const SpeedTest: React.FC<SpeedTestProps> = ({
  questions,
  onComplete,
  timePerQuestion = 30,
  className = "",
}) => {
  // Question state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<"yes" | "no" | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [results, setResults] = useState<{ correct: boolean; questionId: string }[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(15);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<number | null>(null);
  const testStartTime = useRef<number>(0);
  const resultsRef = useRef<{ correct: boolean; questionId: string }[]>([]);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = useCallback((answer: "yes" | "no") => {
    if (isCompleted) return;

    const isCorrect = answer === currentQuestion.correctAnswer;
    
    // Update answer feedback
    setIsAnswerCorrect(isCorrect);
    setSelectedAnswer(answer);
    
    // Update results
    const newResults = [
      ...results,
      { correct: isCorrect, questionId: currentQuestion.id }
    ];
    setResults(newResults);
    resultsRef.current = newResults;
    
    // If it's the last question, complete the test
    if (currentIndex >= questions.length - 1) {
      setIsCompleted(true);
      onComplete(newResults);
      return;
    }
    
    // Move to next question after a delay
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
    }, 1000); // 1 second delay to show feedback
  }, [currentIndex, currentQuestion, isCompleted, onComplete, questions.length]);

  // Initialize timer - restarts when test is reset
  useEffect(() => {
    if (isCompleted) return;

    // Clear any existing timer
    if (timerRef.current) {
      cancelAnimationFrame(timerRef.current);
    }

    // Set up timer variables
    const totalDuration = 15000; // 15 seconds
    const startTime = Date.now();
    const endTime = startTime + totalDuration;
    
    // Initialize timer display
    setProgress(100);
    setTimeLeft(15);

    // Timer update function
    const tick = () => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      const progressPercent = (remaining / totalDuration) * 100;
      
      // Update display
      setProgress(Math.max(0, progressPercent));
      setTimeLeft(Math.ceil(remaining / 1000));

      if (remaining > 0) {
        timerRef.current = requestAnimationFrame(tick);
      } else {
        // Timer finished
        setProgress(0);
        setTimeLeft(0);
        setIsCompleted(true);
        onComplete(resultsRef.current);
      }
    };

    // Start the timer
    timerRef.current = requestAnimationFrame(tick);

    // Cleanup
    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [isCompleted, onComplete]); // Restart when isCompleted changes

  // Update results ref when results change
  useEffect(() => {
    resultsRef.current = results;
  }, [results]);

  // Update onComplete callback when results change
  useEffect(() => {
    if (isCompleted) {
      onComplete(resultsRef.current);
    }
  }, [isCompleted, onComplete]);

  if (isCompleted) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-sm">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">Test Complete!</h3>
        <p className="text-lg mb-2 text-gray-800">
          You scored {results.filter(r => r.correct).length} out of {results.length} correct
        </p>
        <div className="mt-4 text-sm text-gray-600">
          Time: 15 seconds
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return <div>No questions available</div>;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">Time Remaining</span>
          <span className="text-lg font-bold text-blue-600">{timeLeft}s</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-sm text-gray-500 mt-2 text-right">
          Question {currentIndex + 1} of {questions.length}
        </div>
      </div>

      <div className={`p-6 rounded-lg shadow-sm transition-colors duration-300 ${
        selectedAnswer !== null
          ? isAnswerCorrect
            ? 'bg-green-50 border-2 border-green-200'
            : 'bg-red-50 border-2 border-red-200'
          : 'bg-white'
      }`}>
        <h3 className="text-lg font-medium mb-6 text-black">{currentQuestion.question}</h3>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={() => handleAnswer('yes')}
            disabled={selectedAnswer !== null}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors duration-300 ${
              selectedAnswer === 'yes'
                ? isAnswerCorrect
                  ? 'bg-[#00C48C] text-white'
                  : 'bg-[#FF5A5F] text-white'
                : selectedAnswer !== null
                ? 'opacity-50 bg-gray-100 text-gray-500'
                : 'bg-[#2158F4] text-white hover:bg-[#2158F4]/90'
            }`}
          >
            Yes
          </button>
          <button
            onClick={() => handleAnswer('no')}
            disabled={selectedAnswer !== null}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors duration-300 ${
              selectedAnswer === 'no'
                ? isAnswerCorrect
                  ? 'bg-[#00C48C] text-white'
                  : 'bg-[#FF5A5F] text-white'
                : selectedAnswer !== null
                ? 'opacity-50 bg-gray-100 text-gray-500'
                : 'bg-[#2158F4] text-white hover:bg-[#2158F4]/90'
            }`}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeedTest;
