"use client";

import Link from 'next/link';

export default function QuickRefreshersComingSoonPage() {
  return (
    <div className="min-h-screen bg-light-blue-background flex items-center justify-center">
      <div className="text-center p-8">
        <div className="bg-white rounded-xl shadow-lg p-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Coming Soon</h1>
          <p className="text-lg text-gray-600 mb-8">This learning module is under construction. Check back later!</p>
          <Link href="/skills/data-tech">
            <span className="text-primary hover:underline cursor-pointer">
              &larr; Back to Data & Tech Capable
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
