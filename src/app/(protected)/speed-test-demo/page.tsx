"use client";

import React, { useState, useEffect } from "react";
import { SpeedTest } from "@/components/ui/SpeedTest";
import { getQuestionsForCapability, SpeedTestQuestion, DEFAULT_TIME_PER_QUESTION } from "@/data/speed-test-questions";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSavedItems } from '@/app/contexts/SavedItemsContext';

const CAPABILITY_TITLES: Record<string, string> = {
  'data-tech': 'Data & Tech Capable',
  'ai-ethics-responsibility': 'AI Ethics & Responsibility',
  'workforce-enablement': 'Workforce Enablement',
  'leadership-strategy': 'Leadership & Strategy',
  'governance-policy-risk': 'Governance, Policy & Risk',
  'foundations-ecosystem': 'Foundations & Ecosystem',
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
  const [retryCount, setRetryCount] = useState(0);
  const [currentSet, setCurrentSet] = useState(0);
  const { addSavedItem, savedItems } = useSavedItems();
  const [isSaved, setIsSaved] = useState(false);

  // Load questions for the specified capability
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        const allQuestions = getQuestionsForCapability(capability);
        
        // Get 10 questions starting from currentSet * 10
        const startIndex = currentSet * 10;
        const endIndex = startIndex + 10;
        const questionsForSet = allQuestions.slice(startIndex, endIndex);
        
        // If we don't have enough questions, cycle back to the beginning
        if (questionsForSet.length < 10) {
          const remainingNeeded = 10 - questionsForSet.length;
          const additionalQuestions = allQuestions.slice(0, remainingNeeded);
          setQuestions([...questionsForSet, ...additionalQuestions]);
        } else {
          setQuestions(questionsForSet);
        }
      } catch (error) {
        console.error('Error loading questions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadQuestions();
  }, [capability, currentSet]);

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
    setRetryCount(prev => prev + 1); // Force component remount
  };

  const handleNext = () => {
    setResults([]);
    setIsCompleted(false);
    setScore(0);
    setCurrentSet(prev => prev + 1); // Load next set of questions
    setRetryCount(prev => prev + 1); // Force component remount
  };

  const title = CAPABILITY_TITLES[capability] || CAPABILITY_TITLES['default'];
  const savePath = `/speed-test-demo?capability=${capability}`;
  const isAlreadySaved = savedItems?.some((i) => i.path === savePath) ?? false;
  const handleSave = () => {
    if (isAlreadySaved) return;
    addSavedItem({
      title: `${title} – Speed Test`,
      type: 'speed-test',
      path: savePath,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1500);
  };

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-2 mt-8">
          <Link 
            href={`/skills/${capability}`}
            className="inline-flex items-center text-blue-700 hover:underline font-medium mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            {title}
          </Link>
          {/* Heading centered, no blue background, mirroring Scenario */}
          <div className="mb-6 text-center">
            <Link href={`/skills/${capability}`} className="text-2xl sm:text-3xl font-bold text-primary hover:underline focus:underline">
              Speed Test
            </Link>
          </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {questions.length > 0 ? (
            isCompleted ? (
              <div className="bg-blue-50 rounded-lg shadow-sm p-6">
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                  {(() => {
                    const ratio = questions.length > 0 ? score / questions.length : 0;
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
                      <>
                        <h2 className={`text-3xl font-bold mb-4 ${color}`}>{title}</h2>
                        <p className="text-xl mb-6 text-gray-800">You scored {score} out of {questions.length} correct.</p>
                      </>
                    );
                  })()}
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                      onClick={handleRetry}
                      className="px-6 py-3 bg-[#B681FC] text-white rounded-md hover:bg-[#B681FC]/90 transition-colors font-medium"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-6 py-3 bg-[#2158F4] text-white rounded-md hover:bg-[#2158F4]/90 transition-colors font-medium"
                    >
                      Next
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaved || isAlreadySaved}
                      className={`inline-flex items-center gap-2 border border-primary text-primary bg-white hover:bg-primary/5 px-6 py-3 rounded-md font-medium transition-colors ${
                        isSaved || isAlreadySaved ? 'opacity-60 cursor-not-allowed' : ''
                      }`}
                      aria-label={isAlreadySaved ? 'Already saved' : 'Save this speed test'}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 3a2 2 0 00-2 2v12l7-3 7 3V5a2 2 0 00-2-2H5z" />
                      </svg>
                      {isAlreadySaved ? 'Saved' : isSaved ? 'Saved!' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <SpeedTest
                key={`speed-test-${retryCount}`}
                questions={questions}
                onComplete={handleComplete}
                timePerQuestion={30}
                sessionId={`${capability}-${currentSet}-${retryCount}-${questions[0]?.id ?? 'q'}`}
              />
            )
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
  );
}
