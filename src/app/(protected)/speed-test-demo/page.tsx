"use client";

import React, { useState, useEffect } from "react";
import { SpeedTest } from "@/components/ui/SpeedTest";
import { getQuestionsForCapability, SpeedTestQuestion, DEFAULT_TIME_PER_QUESTION } from "@/data/speed-test-questions";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const CAPABILITY_TITLES: Record<string, string> = {
  'data-tech': 'Data & Tech Capable',
  'ai-ethics': 'AI Ethics & Responsibility',
  'default': 'AI Capability'
};

export default function SpeedTestDemoPage() {
  const searchParams = useSearchParams();
  const capability = searchParams.get('capability') || 'default';
  const [questions, setQuestions] = useState<SpeedTestQuestion[]>([]);
  const [results, setResults] = useState<{ correct: boolean; questionId: string }[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load questions for the specified capability
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        const capabilityQuestions = getQuestionsForCapability(capability);
        setQuestions(capabilityQuestions);
      } catch (error) {
        console.error('Error loading questions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadQuestions();
  }, [capability]);

  const handleComplete = (testResults: { correct: boolean; questionId: string }[]) => {
    setResults(testResults);
    const correctCount = testResults.filter(r => r.correct).length;
    setScore(correctCount);
    setIsCompleted(true);
  };

  const handleRetry = () => {
    setResults([]);
    setIsCompleted(false);
    setScore(0);
  };

  const title = CAPABILITY_TITLES[capability] || CAPABILITY_TITLES['default'];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header navigation */}
      <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href={`/skills/${capability}`}
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to {title}
          </Link>
          
          {/* Header with blue background */}
          <div className="bg-[#2158F4] text-white rounded-lg p-4 sm:p-6 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold">Speed Test</h1>
            <p className="mt-1">Test your knowledge under time pressure</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          {questions.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              {isCompleted ? (
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">Test Complete!</h2>
                  <p className="text-xl mb-6 text-gray-800">
                    You scored {score} out of {questions.length} correct.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                      onClick={handleRetry}
                      className="px-6 py-3 bg-[#B681FC] text-white rounded-md hover:bg-[#B681FC]/90 transition-colors font-medium"
                    >
                      Try Again
                    </button>
                    <Link
                      href={`/skills/${capability}`}
                      className="px-6 py-3 bg-[#2158F4] text-white rounded-md hover:bg-[#2158F4]/90 transition-colors text-center font-medium"
                    >
                      Back to {title}
                    </Link>
                  </div>
                </div>
              ) : (
                <SpeedTest
                  questions={questions}
                  onComplete={handleComplete}
                  timePerQuestion={DEFAULT_TIME_PER_QUESTION}
                />
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-600">No questions available for this capability.</p>
              <Link 
                href={`/skills/${capability}`}
                className="mt-4 inline-block px-4 py-2 bg-[#2158F4] text-white rounded-md hover:bg-[#2158F4]/90 transition-colors"
              >
                Back to {title}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
