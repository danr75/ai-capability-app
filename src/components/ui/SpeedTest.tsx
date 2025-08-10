"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { SpeedTestQuestion } from "@/data/speed-test-questions";

export interface SpeedTestProps {
  questions: SpeedTestQuestion[];
  onComplete: (results: { correct: boolean; questionId: string }[]) => void;
  timePerQuestion?: number;
  className?: string;
  sessionId?: string; // used to reset internal state/timer when session changes
}

export const SpeedTest: React.FC<SpeedTestProps> = ({
  questions,
  onComplete,
  timePerQuestion = 30,
  className = "",
  sessionId,
}) => {
  // Question state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<"yes" | "no" | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [results, setResults] = useState<{ correct: boolean; questionId: string }[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<number | null>(null);
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
    
    // Move to next question after a short delay for feedback
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
    }, 500); // 500ms delay to show feedback
  }, [currentIndex, currentQuestion, isCompleted, onComplete, questions.length]);

  // Initialize/Restart timer whenever session or questions change
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      cancelAnimationFrame(timerRef.current);
    }

    // Reset state when session or questions change
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setResults([]);
    setIsCompleted(false);
    setProgress(100);
    setTimeLeft(timePerQuestion);

    // Don't start timer if no questions
    if (!questions || questions.length === 0) {
      return;
    }

    const totalDuration = Math.max(1, timePerQuestion) * 1000;
    const startTime = Date.now();
    const endTime = startTime + totalDuration;

    const tick = () => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      const progressPercent = (remaining / totalDuration) * 100;
      setProgress(Math.max(0, progressPercent));
      setTimeLeft(Math.ceil(remaining / 1000));

      if (remaining > 0) {
        timerRef.current = requestAnimationFrame(tick);
      } else {
        setProgress(0);
        setTimeLeft(0);
        setIsCompleted(true);
        onComplete(resultsRef.current);
      }
    };

    timerRef.current = requestAnimationFrame(tick);

    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [sessionId, questions, timePerQuestion]);

  // Update results ref when results change
  useEffect(() => {
    resultsRef.current = results;
  }, [results]);

  // Keyboard shortcuts: 1/Yes, 2/No, arrows, Enter/Space triggers current selection if any
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (isCompleted || !currentQuestion) return;
      if (selectedAnswer !== null) return; // prevent after answering

      if (e.key === '1' || e.key.toLowerCase() === 'y' || e.key === 'ArrowLeft') {
        e.preventDefault();
        handleAnswer('yes');
      } else if (e.key === '2' || e.key.toLowerCase() === 'n' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleAnswer('no');
      } else if (e.key === 'Enter' || e.key === ' ') {
        // optional: do nothing unless we had a pre-selection UI; keeping noop to avoid accidental submits
      }
    };

    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  }, [handleAnswer, isCompleted, currentQuestion, selectedAnswer]);

  if (isCompleted) {
    const correct = results.filter(r => r.correct).length;
    const ratio = results.length > 0 ? correct / results.length : 0;
    let title = "";
    let color = "text-gray-900";
    if (ratio < 0.4) {
      title = "Oh no – Study more!";
      color = "text-red-600";
    } else if (ratio < 0.8) {
      title = "Not bad – Keep going!";
      color = "text-amber-600";
    } else {
      title = "Legend – Smashed it!";
      color = "text-green-600";
    }
    return (
      <div className="bg-blue-50 rounded-lg shadow-sm p-6">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <h3 className={`text-2xl font-bold mb-2 ${color}`}>{title}</h3>
          <p className="text-lg mb-2 text-gray-800">You scored {correct} out of {results.length} correct.</p>
          <div className="mt-2 text-sm text-gray-600">Time: {timePerQuestion} seconds</div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return <div>No questions available</div>;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <section className="bg-blue-50 rounded-lg shadow-sm p-6">
        {/* Timer and progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Time remaining</span>
            <span className={`text-lg font-bold ${timeLeft <= 5 ? 'text-red-600' : 'text-blue-600'}`}>{timeLeft}s</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`${timeLeft <= 5 ? 'bg-red-500' : 'bg-gradient-to-r from-blue-500 to-blue-600'} h-3 rounded-full transition-all duration-75 ease-linear`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm text-gray-500 mt-2 text-right">
            Question {currentIndex + 1} of {questions.length}
          </div>
        </div>

        {/* Question card */}
        <div className={`bg-white rounded-lg shadow-sm p-6 transition-colors duration-300 ${
          selectedAnswer !== null
            ? isAnswerCorrect
              ? 'border-2 border-green-200 bg-green-50'
              : 'border-2 border-red-200 bg-red-50'
            : ''
        }`}>
          <h3 className="text-lg md:text-xl text-gray-900 leading-relaxed mb-6">{currentQuestion.question}</h3>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => handleAnswer('yes')}
              disabled={selectedAnswer !== null}
              className={`flex-1 py-3 px-4 rounded-lg font-medium border transition-all flex items-center gap-3 text-left ${
                selectedAnswer === 'yes'
                  ? isAnswerCorrect
                    ? 'bg-[#DFF6EA] border-[#28C76F] text-[#28C76F]'
                    : 'bg-[#FDEBEC] border-[#EA5455] text-[#EA5455]'
                  : selectedAnswer !== null
                  ? 'opacity-50 bg-white border-gray-200 text-gray-400'
                  : 'bg-white border-blue-200 text-gray-800 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-900 hover:shadow-sm'
              }`}
            >
              <span className={`${
                selectedAnswer === 'yes'
                  ? isAnswerCorrect
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-blue-100 text-blue-700'
              } inline-flex items-center justify-center w-7 h-7 rounded-full text-base font-bold mr-1`}>1</span>
              <span className={`flex-1 ${
                selectedAnswer === 'yes'
                  ? isAnswerCorrect
                    ? 'text-green-700'
                    : 'text-red-600'
                  : 'text-gray-800'
              }`}>Yes</span>
            </button>
            <button
              onClick={() => handleAnswer('no')}
              disabled={selectedAnswer !== null}
              className={`flex-1 py-3 px-4 rounded-lg font-medium border transition-all flex items-center gap-3 text-left ${
                selectedAnswer === 'no'
                  ? isAnswerCorrect
                    ? 'bg-[#DFF6EA] border-[#28C76F] text-[#28C76F]'
                    : 'bg-[#FDEBEC] border-[#EA5455] text-[#EA5455]'
                  : selectedAnswer !== null
                  ? 'opacity-50 bg-white border-gray-200 text-gray-400'
                  : 'bg-white border-blue-200 text-gray-800 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-900 hover:shadow-sm'
              }`}
            >
              <span className={`${
                selectedAnswer === 'no'
                  ? isAnswerCorrect
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-blue-100 text-blue-700'
              } inline-flex items-center justify-center w-7 h-7 rounded-full text-base font-bold mr-1`}>2</span>
              <span className={`flex-1 ${
                selectedAnswer === 'no'
                  ? isAnswerCorrect
                    ? 'text-green-700'
                    : 'text-red-600'
                  : 'text-gray-800'
              }`}>No</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpeedTest;
