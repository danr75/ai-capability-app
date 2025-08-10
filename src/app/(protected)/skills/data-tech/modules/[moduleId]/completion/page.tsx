"use client";

import Link from 'next/link';

export default function ModuleCompletionPage({ params }: { params: { moduleId: string } }) {
  const backToModule = `/skills/data-tech/modules/${params.moduleId}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-10">
        {/* Header with back button */}
        <div className="mb-4">
          <Link 
            href="/skills/data-tech"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Data & Tech
          </Link>
        </div>

        {/* Main header */}
        <div className="mb-6">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">Module Complete</h1>
          </div>
        </div>

        {/* Completion card under the heading */}
        <section className="bg-blue-50 rounded-lg shadow-sm p-6">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-900 text-base sm:text-lg mb-6">
              Congratulations on completing this micro module!
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link href={backToModule} className="inline-flex items-center justify-center rounded-md bg-[#B681FC] text-white px-4 py-2 text-sm font-medium hover:bg-[#B681FC]/90">
                Redo
              </Link>
              <Link href={backToModule} className="inline-flex items-center justify-center rounded-md bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary/90">
                Next
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
