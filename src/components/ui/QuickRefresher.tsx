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
  module?: string;
  lesson?: string;
  lessonContent?: string;
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-10">
        {/* Header with back button */}
        <div className="mb-4">
          <Link 
            href={backLink}
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {skillArea}
          </Link>
        </div>

        {/* Main header */}
        <div className="bg-primary text-white p-6 rounded-lg mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Memory Boost</h1>
          </div>
        </div>

        {/* Progress navigation section */}
        <section className="bg-blue-50 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
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
            <div className="flex-1 flex justify-center mx-4">
              <div className="flex gap-2">
                {progressDots.map((_, index) => (
                  <div 
                    key={index} 
                    className={`w-8 h-2 rounded-full ${
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
        </section>

        {/* Content section */}
        <section className="bg-blue-50 rounded-lg shadow-sm p-6 mb-8">
          {/* Module and Lesson info */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="text-base text-gray-800">
              <div className="mb-2">
                <span className="font-semibold">Module:</span> {currentQuestion.module || 'High Risk Use Cases'}
              </div>
              <div className="mb-4">
                <span className="font-semibold">Lesson:</span> {currentQuestion.lesson || 'Identifying High Risk AI Use Cases'}
              </div>
              <div className="text-gray-600">
                {currentQuestion.lessonContent || 'High risk AI use cases involve critical decisions affecting safety, privacy, or fairness. Identifying these requires evaluating potential harm, regulatory requirements, and societal impact before deployment.'}
              </div>
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <p className="text-lg text-gray-800 mb-6">
              <span className="bg-[#B681FC] text-white px-3 py-1 rounded font-medium">
                {selectedOption 
                  ? currentQuestion.options.find(option => option.id === selectedOption)?.text
                  : '_______'}
              </span> {currentQuestion.text}
            </p>
            
            {/* Answer options */}
            <div className="flex items-center gap-3">
            {currentQuestion.options.map((option, index) => (
              <div 
                key={option.id}
                className={`border rounded-lg p-3 flex items-center cursor-pointer transition-all flex-1 ${
                  selectedOption === option.id && isChecked && option.correct ? 'bg-[#DFF6EA] border-[#28C76F] text-[#28C76F] font-bold' : 
                  selectedOption === option.id && isChecked && !option.correct ? 'bg-[#FDEBEC] border-[#EA5455] text-[#EA5455] font-bold' :
                  selectedOption === option.id ? 'bg-[#4F8BFF] border-[#4F8BFF]/70 text-white' : 
                  'bg-white border-[#DFE3E8] text-[#4B4B4B] hover:border-[#CED6E0] hover:shadow-sm'
                }`}
                onClick={() => handleOptionSelect(option.id)}
                onKeyDown={(e) => {
                  if (e.key === `${index + 1}`) {
                    handleOptionSelect(option.id);
                  }
                }}
                tabIndex={0}
              >
                <span className={`${
                  selectedOption === option.id && isChecked && option.correct ? 'bg-[#28C76F] text-white' :
                  selectedOption === option.id && isChecked && !option.correct ? 'bg-[#EA5455] text-white' :
                  selectedOption === option.id ? 'bg-white text-[#4F8BFF]' : 
                  'bg-[#DFE3E8] text-[#6E6E6E]'
                } px-2 py-1 rounded-full mr-3 font-medium transition-colors`}>
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
        </section>
      </div>
    </div>
  );
}
