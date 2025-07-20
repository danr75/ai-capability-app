"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useSavedItems } from '@/app/contexts/SavedItemsContext';

export default function CompletionPage() {
  const [isRedoing, setIsRedoing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { addSavedItem, savedItems } = useSavedItems();
  
  const handleRedo = () => {
    setIsRedoing(true);
    // Redirect after a brief delay to show button state change
    setTimeout(() => {
      window.location.href = '/skills/foundations-ecosystem/quick-refreshers';
    }, 300);
  };
  
  const handleSave = () => {
    // Save the refresher to the saved items
    addSavedItem({
      title: 'AI Foundations & Technology Ecosystem',
      type: 'refresher',
      path: '/skills/foundations-ecosystem/quick-refreshers'
    });
    
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };
  
  // Check if this refresher is already saved
  const isAlreadySaved = savedItems.some(item => 
    item.path === '/skills/foundations-ecosystem/quick-refreshers'
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header navigation */}
      <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/skills/foundations-ecosystem"
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
            Back to Foundations & Ecosystem
          </Link>
          
          {/* Quick Refreshers heading with blue background */}
          <div className="bg-[#2158F4] text-white rounded-lg p-4 sm:p-6 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold">Quick Refreshers</h1>
            <p className="mt-1">Lesson: AI Foundations & Technology Ecosystem</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm mb-8 overflow-hidden">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Congratulations on completing this refresher!</h2>
            
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={handleSave}
                className={`${isAlreadySaved || isSaved ? 'bg-gray-400' : 'bg-[#00C48C] hover:bg-[#00C48C]/90'} text-white px-6 py-3 rounded-md font-medium transition-colors shadow-sm`}
                disabled={isAlreadySaved || isSaved}
              >
                {isSaved ? 'Saved!' : isAlreadySaved ? 'Already Saved' : 'Save Progress'}
              </button>
              
              <button
                onClick={handleRedo}
                className={`bg-[#B681FC] hover:bg-[#B681FC]/90 text-white px-6 py-3 rounded-md font-medium transition-colors shadow-sm ${
                  isRedoing ? 'opacity-70' : ''
                }`}
                disabled={isRedoing}
              >
                {isRedoing ? 'Redirecting...' : 'Redo Refresher'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
