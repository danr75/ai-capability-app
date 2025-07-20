"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export type Question = {
  id: number;
  text: string;
  blank: string;
  options: {
    id: string;
    text: string;
    correct: boolean;
  }[];
  explanation: string;
};

type QuickRefresherProps = {
  questions: Question[];
  skillArea: string;
  backLink: string;
  tipText: React.ReactNode;
  completionLink: string;
};

export default function QuickRefresher({
  questions,
  skillArea,
  backLink,
  tipText,
  completionLink
}: QuickRefresherProps) {
  // Track which questions have been answered correctly
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  // Track the furthest question the user has reached
  const [maxQuestionReached, setMaxQuestionReached] = useState<number>(0);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  const progressDots = Array(questions.length).fill(0).map((_, i) => i + 1);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't allow changing answers for already answered questions
      if (answeredQuestions.includes(currentQuestionIndex)) {
        return;
      }
      
      // Number keys 1-4 for selecting options
      if (e.key >= '1' && e.key <= '4') {
        const optionIndex = parseInt(e.key) - 1;
        if (currentQuestion.options[optionIndex]) {
          setSelectedOption(currentQuestion.options[optionIndex].id);
          setIsChecked(false);
        }
      } 
      // Space or Enter to check answer
      else if ((e.key === ' ' || e.key === 'Enter') && selectedOption) {
        handleCheck();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentQuestionIndex, selectedOption, answeredQuestions, currentQuestion.options]);

  const handleOptionSelect = (optionId: string) => {
    if (!answeredQuestions.includes(currentQuestionIndex)) {
      setSelectedOption(optionId);
      setIsChecked(false);
    }
  };

  const handleCheck = () => {
    if (!selectedOption || answeredQuestions.includes(currentQuestionIndex)) {
      return;
    }

    setIsChecked(true);
    
    const selectedOptionObj = currentQuestion.options.find(opt => opt.id === selectedOption);
    
    if (selectedOptionObj?.correct) {
      setIsCorrect(true);
      
      // Mark this question as answered
      if (!answeredQuestions.includes(currentQuestionIndex)) {
        const newAnsweredQuestions = [...answeredQuestions, currentQuestionIndex];
        setAnsweredQuestions(newAnsweredQuestions);
        
        // Check if this was the last question and all questions are now answered
        if (newAnsweredQuestions.length === questions.length) {
          // Navigate to completion page after a short delay
          setTimeout(() => {
            window.location.href = completionLink;
          }, 500);
          return;
        }
      }
      
      // If this is the last question the user has seen, allow them to proceed to the next one
      if (currentQuestionIndex === maxQuestionReached && currentQuestionIndex < questions.length - 1) {
        setMaxQuestionReached(currentQuestionIndex + 1);
      }
      
      // Auto-advance after a short delay
      if (currentQuestionIndex < questions.length - 1) {
        setTimeout(() => {
          handleNextQuestion();
        }, 500);
      }
    } else {
      setIsCorrect(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
      setIsChecked(false);
      setIsCorrect(false);
      
      // If this question was previously answered, show the answer
      if (answeredQuestions.includes(currentQuestionIndex - 1)) {
        const correctOption = questions[currentQuestionIndex - 1].options.find(opt => opt.correct);
        if (correctOption) {
          setSelectedOption(correctOption.id);
          setIsChecked(true);
          setIsCorrect(true);
        }
      }
    }
  };

  const handleNextQuestion = () => {
    // Allow advancing to the next question if it's either already reached or just answered
    if (currentQuestionIndex <= maxQuestionReached && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsChecked(false);
      setIsCorrect(false);
      
      // If this question was previously answered, show the answer
      if (answeredQuestions.includes(currentQuestionIndex + 1)) {
        const correctOption = questions[currentQuestionIndex + 1].options.find(opt => opt.correct);
        if (correctOption) {
          setSelectedOption(correctOption.id);
          setIsChecked(true);
          setIsCorrect(true);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header navigation */}
      <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href={backLink}
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
            Back to {skillArea}
          </Link>
          
          {/* Quick Refreshers heading with blue background */}
          <div className="bg-[#2158F4] text-white rounded-lg p-4 sm:p-6 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold">Quick Refreshers</h1>
            <p className="mt-1">Lesson: {skillArea}</p>
          </div>
        </div>
      </div>

      {/* Main quiz content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Background container */}
        <div className="max-w-4xl mx-auto bg-[#E5EDFF] rounded-lg shadow-sm mb-8 overflow-hidden">
          {/* Progress bar */}
          <div className="p-4">
            <div className="w-full flex items-center px-4 pb-4 max-w-4xl mx-auto">
              {/* Left arrow */}
              <button 
                className={`text-primary hover:text-primary/80 transition-colors ${
                  currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Progress dots */}
              <div className="flex-grow flex justify-center mx-4">
                <div className="flex w-full justify-between">
                  {progressDots.map((_, index) => (
                    <div 
                      key={index} 
                      className={`w-12 h-2 rounded-full ${
                        index <= currentQuestionIndex ? 'bg-[#B681FC]' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Right arrow */}
              <button 
                className={`text-primary hover:text-primary/80 transition-colors ${
                  currentQuestionIndex >= maxQuestionReached ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex >= maxQuestionReached}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <hr className="border-t border-gray-300 mx-6" />
          
          {/* Learning tip */}
          <div className="px-6 py-4">
            <p className="text-base text-gray-600">
              {tipText}
            </p>
          </div>

          <hr className="border-t border-gray-300 mx-6" />
          
          {/* Question */}
          <div className="px-6 py-6 flex items-center">
            <p className="text-lg text-gray-800">
              <span className="bg-[#B681FC] text-white px-3 py-1 rounded font-medium">
                {selectedOption 
                  ? currentQuestion.options.find(option => option.id === selectedOption)?.text
                  : '_______'}
              </span> {currentQuestion.text}
            </p>
          </div>
        </div>
        
        {/* Options and Check button outside the blue background */}
        <div className="max-w-4xl mx-auto mt-4">
          <div className="flex items-center gap-3 px-6">
            {currentQuestion.options.map((option, index) => (
              <div 
                key={option.id}
                className={`border rounded-lg p-3 flex items-center cursor-pointer transition-all flex-1 ${
                  selectedOption === option.id && isChecked && option.correct ? 'bg-[#00C48C] border-[#00C48C]/70 text-white font-bold' : 
                  selectedOption === option.id && isChecked && !option.correct ? 'bg-[#FF5A5F] border-[#FF5A5F]/70 text-white font-bold' :
                  selectedOption === option.id ? 'bg-[#4F8BFF] border-[#4F8BFF]/70 text-white' : 
                  'border-gray-300 hover:border-[#2158F4] hover:shadow-sm'
                }`}
                onClick={() => handleOptionSelect(option.id)}
                onKeyDown={(e) => {
                  if (e.key === `${index + 1}`) {
                    handleOptionSelect(option.id);
                  }
                }}
                tabIndex={0}
              >
                <span className={`${selectedOption === option.id ? 'bg-white text-[#4F8BFF]' : 'bg-[#B681FC] text-white'} px-2 py-1 rounded-full mr-3 font-medium transition-colors`}>
                  {index + 1}
                </span>
                <span className="font-medium text-sm">{option.text}</span>
              </div>
            ))}
          
            {/* Check button */}
            <button
              onClick={handleCheck}
              disabled={!selectedOption || answeredQuestions.includes(currentQuestionIndex)}
              className={`bg-[#B681FC] text-white px-5 py-3 rounded-md font-medium transition-colors flex-none ${
                !selectedOption || answeredQuestions.includes(currentQuestionIndex) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#B681FC]/90 shadow-sm'
              }`}
              style={{ width: '100px' }}
            >
              Check
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
