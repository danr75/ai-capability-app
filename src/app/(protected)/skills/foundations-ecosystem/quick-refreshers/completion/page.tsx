"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function CompletionPage() {
  const [isRedoing, setIsRedoing] = useState(false);
  
  const handleRedo = () => {
    setIsRedoing(true);
    // Redirect after a brief delay to show button state change
    setTimeout(() => {
      window.location.href = '/skills/foundations-ecosystem/quick-refreshers';
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-10">
        {/* Header with back button */}
        <div className="mb-4">
          <Link 
            href="/skills/foundations-ecosystem"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Foundations & Ecosystem
          </Link>
        </div>

        {/* Main header */}
        <div className="bg-primary text-white p-6 rounded-lg mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Memory Boost</h1>
          </div>
        </div>

        {/* Completion content */}
        <section className="bg-blue-50 rounded-lg shadow-sm p-6">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Congratulations on completing this memory boost!</h2>
            
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={handleRedo}
                className={`bg-[#B681FC] hover:bg-[#B681FC]/90 text-white px-6 py-3 rounded-md font-medium transition-colors shadow-sm ${
                  isRedoing ? 'opacity-70' : ''
                }`}
                disabled={isRedoing}
              >
                {isRedoing ? 'Redirecting...' : 'Redo'}
              </button>
              
              <Link
                href="/skills/foundations-ecosystem/quick-refreshers-2"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition-colors shadow-sm inline-block"
              >
                Next
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
