export default function LearningCoachPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 10 Minute Daily Drill Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10 Minute Daily Drill</h2>
          <div className="flex items-center gap-3 mb-4">
            <button 
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              aria-label="My Priorities"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
              </svg>
              My Priorities
            </button>
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="State something specific to learn..." 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400"
              />
              <button 
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary text-white px-3 py-1 rounded-md hover:bg-primary/90 transition-colors"
                aria-label="Go"
              >
                Go
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-2">10 minute learning based on what you need to learn the most</p>
        </section>
        
        {/* Ongoing Skill Development Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ongoing Skill Development</h2>
          <p className="text-gray-600 mb-4">Track your progress and focus on areas that need improvement.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-md p-4">
              <h3 className="font-medium text-gray-900">Prompt Engineering</h3>
              <div className="h-2 bg-gray-100 rounded-full mt-2">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-md p-4">
              <h3 className="font-medium text-gray-900">AI Tools & Applications</h3>
              <div className="h-2 bg-gray-100 rounded-full mt-2">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-md p-4">
              <h3 className="font-medium text-gray-900">AI Concepts & Terminology</h3>
              <div className="h-2 bg-gray-100 rounded-full mt-2">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* My Toolkit Section */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Toolkit</h2>
          <p className="text-gray-600 mb-4">Resources and tools to enhance your AI capabilities.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-md p-4 flex items-start">
              <div className="bg-purple-100 p-2 rounded-md mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Capability Assessment</h3>
                <p className="text-sm text-gray-600 mt-1">Evaluate your AI skills across 6 key domains</p>
              </div>
            </div>
            <div className="border border-gray-200 rounded-md p-4 flex items-start">
              <div className="bg-purple-100 p-2 rounded-md mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Learning Resources</h3>
                <p className="text-sm text-gray-600 mt-1">Curated articles, videos, and tutorials</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
