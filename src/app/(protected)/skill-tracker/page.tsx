"use client";

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

export default function SkillTrackerPage() {
  // Draggable target state for the top progress bar
  const [targetPercent, setTargetPercent] = useState<number>(88); // initial ~right: 12%
  const [dragging, setDragging] = useState<boolean>(false);
  const progressRef = useRef<HTMLDivElement | null>(null);

  // Convert clientX to percent within the progress container
  const computePercentFromClientX = (clientX: number) => {
    const el = progressRef.current;
    if (!el) return targetPercent;
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const pct = (x / rect.width) * 100;
    return Math.max(0, Math.min(100, pct));
  };

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPercent(computePercentFromClientX(e.clientX));
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        setTargetPercent(computePercentFromClientX(e.touches[0].clientX));
      }
    };
    const stopDrag = () => setDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove as any);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchend', stopDrag);
    };
  }, [dragging]);

  const startDragMouse = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
  };
  const startDragTouch = (e: React.TouchEvent) => {
    setDragging(true);
    if (e.touches && e.touches[0]) {
      setTargetPercent(computePercentFromClientX(e.touches[0].clientX));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Your Progress Section */}
        <section className="bg-blue-50 rounded-lg shadow-sm p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Your Progress</h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div ref={progressRef} className="relative mb-1">
              {/* Progress bar background */}
              <div className="h-4 bg-gray-200 rounded-full"></div>
              
              {/* Actual progress */}
              <div className="absolute top-0 left-0 h-4 bg-primary rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium" style={{ width: `${33}%` }}>
                <span>{`${33}%`}</span>
              </div>
              
              {/* Target marker - positioned above the progress bar */}
              <div className="absolute -top-12" style={{ left: `${targetPercent}%` }}>
                <div
                  className="relative -translate-x-1/2 flex flex-col items-center select-none cursor-pointer"
                  onMouseDown={startDragMouse}
                  onTouchStart={startDragTouch}
                  role="slider"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(targetPercent)}
                  aria-label="Target"
                >
                  <div className="bg-purple-200 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">Target</div>
                  <div className="h-4 w-0.5 bg-purple-600 my-1"></div>
                  <div className="w-4 h-4 rounded-full bg-purple-600"></div>
                </div>
              </div>
            </div>
            
            {/* Level labels */}
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <div>Aware</div>
              <div>Participate</div>
              <div>Lead</div>
              <div>Expert</div>
            </div>
          </div>
          

        </section>
        
        {/* Stats Section */}
        <section className="bg-blue-50 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Stats</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Weekly Progress Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <h3 className="text-gray-600 mb-2">Weekly Progress</h3>
              <div className="flex items-center justify-center">
                <span className="text-4xl font-bold text-primary">3%</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <p className="text-gray-600 mt-2">On Track</p>
            </div>

            {/* Most Improved Card */}
            <div className="bg-green-50 rounded-lg shadow-sm p-6 text-center">
              <h3 className="text-gray-600 mb-2">Most Improved</h3>
              <div className="flex items-center justify-center">
                <span className="text-4xl font-bold text-green-500">+15%</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <p className="text-gray-600 mt-2">Workforce</p>
            </div>

            {/* Needs Attention Card */}
            <Link href="/skills/foundations-ecosystem" className="block">
              <div className="bg-red-50 rounded-lg shadow-sm p-6 text-center hover:shadow-md hover:bg-red-100 transition-all duration-200 cursor-pointer">
                <h3 className="text-gray-600 mb-2">Needs Attention</h3>
                <div className="flex items-center justify-center">
                  <span className="text-4xl font-bold text-red-500">-5%</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                  </svg>
                </div>
                <p className="text-gray-600 mt-2">Foundations</p>
              </div>
            </Link>
          </div>
        </section>
        
        {/* Progress to Next Level Section */}
        <section className="bg-blue-50 rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Progress to next level</h2>
          
          <div className="space-y-8">
            {/* Leadership & Strategy */}
            <Link href="/skills/leadership-strategy" className="block">
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md hover:bg-gray-50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center mb-2">
                  <span className="font-medium text-gray-700">Leadership & Strategy</span>
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-800 rounded-full mr-1"></span>
                    On Track
                  </span>
                </div>
                <div className="relative">
                  <div className="h-4 bg-gray-200 rounded-full"></div>
                  <div className="absolute top-0 left-0 h-4 bg-primary rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium" style={{ width: '85%' }}>
                    <span>85%</span>
                  </div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <div>Aware</div>
                  <div className="ml-auto">Participate</div>
                </div>
              </div>
            </Link>
            
            {/* Governance, Policy & Risk */}
            <Link href="/skills/governance-policy-risk" className="block">
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md hover:bg-gray-50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center mb-2">
                  <span className="font-medium text-gray-700">Governance, Policy & Risk</span>
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-800 rounded-full mr-1"></span>
                    On Track
                  </span>
                </div>
                <div className="relative">
                <div className="h-4 bg-gray-200 rounded-full"></div>
                <div className="absolute top-0 left-0 h-4 bg-primary rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium" style={{ width: '60%' }}>
                  <span>60%</span>
                </div>
              </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <div>Aware</div>
                  <div className="ml-auto">Participate</div>
                </div>
              </div>
            </Link>
            
            {/* Foundations & Ecosystem */}
            <Link href="/skills/foundations-ecosystem" className="block">
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md hover:bg-gray-50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center mb-2">
                  <span className="font-medium text-gray-700">Foundations & Ecosystem</span>
                  <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-800 rounded-full mr-1"></span>
                    Needs Attention
                  </span>
                </div>
                <div className="relative">
                  <div className="h-4 bg-gray-200 rounded-full"></div>
                  <div className="absolute top-0 left-0 h-4 bg-primary rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium" style={{ width: '30%' }}>
                    <span>30%</span>
                  </div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <div>Aware</div>
                  <div className="ml-auto">Participate</div>
                </div>
              </div>
            </Link>
            
            {/* Workforce Enablement */}
            <Link href="/skills/workforce-enablement" className="block">
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md hover:bg-gray-50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center mb-2">
                  <span className="font-medium text-gray-700">Workforce Enablement</span>
                  <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-800 rounded-full mr-1"></span>
                    Excelling
                  </span>
                </div>
                <div className="relative">
                  <div className="h-4 bg-gray-200 rounded-full"></div>
                  <div className="absolute top-0 left-0 h-4 bg-primary rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium" style={{ width: '63%' }}>
                    <span>63%</span>
                  </div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <div>Aware</div>
                  <div className="ml-auto">Participate</div>
                </div>
              </div>
            </Link>
            
            {/* Data & Tech Capable */}
            <Link href="/skills/data-tech" className="block">
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md hover:bg-gray-50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center mb-2">
                  <span className="font-medium text-gray-700">Data & Tech Capable</span>
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-800 rounded-full mr-1"></span>
                    On Track
                  </span>
                </div>
                <div className="relative">
                  <div className="h-4 bg-gray-200 rounded-full"></div>
                  <div className="absolute top-0 left-0 h-4 bg-primary rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium" style={{ width: '50%' }}>
                    <span>50%</span>
                  </div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <div>Aware</div>
                  <div className="ml-auto">Participate</div>
                </div>
              </div>
            </Link>
            
            {/* AI Ethics and Responsibility */}
            <Link href="/skills/ai-ethics-responsibility" className="block">
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md hover:bg-gray-50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center mb-2">
                  <span className="font-medium text-gray-700">AI Ethics and Responsibility</span>
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-800 rounded-full mr-1"></span>
                    On Track
                  </span>
                </div>
                <div className="relative">
                  <div className="h-4 bg-gray-200 rounded-full"></div>
                  <div className="absolute top-0 left-0 h-4 bg-primary rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium" style={{ width: '45%' }}>
                    <span>45%</span>
                  </div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <div>Aware</div>
                  <div className="ml-auto">Participate</div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
