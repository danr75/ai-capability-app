'use client';
import Link from 'next/link';

export default function DataTechPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with back button */}
        <div className="mb-6">
          <Link 
            href="/learning-coach" 
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Skills Development
          </Link>
        </div>

        {/* Main header */}
        <div className="bg-primary text-white p-6 rounded-lg mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">Data & Tech Capable</h1>
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">● On Track</span>
          </div>
          <p className="text-lg">Build the technical foundation and capabilities for successful AI implementation</p>
        </div>

        {/* Capability Progress Bar */}
        <div className="mb-8 mt-8">
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-8 flex items-center">
              <div className="bg-primary h-8 rounded-full transition-all duration-300 flex items-center justify-center relative" style={{width: '50%'}}>
                <span className="text-sm font-medium text-white">50%</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Aware</span>
            <span>Participate</span>
          </div>
        </div>

        {/* Modules Section */}
        <div className="mt-8 mb-8">
          <div className="flex items-center gap-4">
            {/* Left Arrow */}
            <button 
              onClick={() => {
                const container = document.getElementById('modules-container');
                if (container) {
                  container.scrollBy({ left: -200, behavior: 'smooth' });
                }
              }}
              className="flex-shrink-0 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>

            {/* Scrollable Modules Container */}
            <div id="modules-container" className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="space-y-4">
                {/* First row */}
                <div className="flex gap-3 min-w-max">
                  <div className="flex items-center gap-3 px-4 py-2 bg-green-50 rounded-full border border-green-200">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-green-700">High Risk Use Cases</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-green-50 rounded-full border border-green-200">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-green-700">What are Tokens</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-green-50 rounded-full border border-green-200">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-green-700">Large Language Models Explained</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-blue-700">Data Pipeline Architecture</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full border border-gray-200 opacity-60">
                    <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-500">Model Training Fundamentals</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full border border-gray-200 opacity-60">
                    <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-500">Deep Learning Concepts</span>
                  </div>
                </div>
                
                {/* Second row */}
                <div className="flex gap-3 min-w-max">
                  <div className="flex items-center gap-3 px-4 py-2 bg-green-50 rounded-full border border-green-200">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-green-700">What are AI agents</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-green-50 rounded-full border border-green-200">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-green-700">AI Agent Risks</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-green-50 rounded-full border border-green-200">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-green-700">Use Case Identification</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full border border-gray-200 opacity-60">
                    <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-500">API Integration Patterns</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full border border-gray-200 opacity-60">
                    <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-500">Performance Optimization</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full border border-gray-200 opacity-60">
                    <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-500">Neural Network Basics</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full border border-gray-200 opacity-60">
                    <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-500">Computer Vision Basics</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Arrow */}
            <button 
              onClick={() => {
                const container = document.getElementById('modules-container');
                if (container) {
                  container.scrollBy({ left: 200, behavior: 'smooth' });
                }
              }}
              className="flex-shrink-0 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Strengthen & Apply Your Knowledge Section */}
        <div className="mt-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Strengthen & Apply Your Knowledge</h2>
          <p className="text-gray-600">Reinforce key concepts and improve retention through targeted practice and real-world application.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Refreshers */}
          <Link href="/skills/data-tech/quick-refreshers" className="block">
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow h-full">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Smart Refresh
                  </h3>
                  <p className="text-sm text-gray-600">
                    Strengthen memory with tailored review of weaker areas and essential concepts.
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Scenario Challenges */}
          <Link href="/skills/data-tech/scenario-challenges" className="block">
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow h-full">
              <div className="flex items-start mb-4">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Scenario Practice
                  </h3>
                  <p className="text-sm text-gray-600">
                    Apply what you've learned in realistic, practical data & tech situations.
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Speed Test */}
          <Link href="/speed-test-demo?capability=data-tech" className="block">
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow h-full">
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Challenge Mode
                  </h3>
                  <p className="text-sm text-gray-600">
                    Sharpen your knowledge under time pressure with concept-focused quizzes.
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Micro-Actions */}
          <Link href="/skills/data-tech/lab-mode" className="block">
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow h-full">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Real-World Simulation
                  </h3>
                  <p className="text-sm text-gray-600">
                    Test your skills with realistic scenarios that reflect job-relevant applications.
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
