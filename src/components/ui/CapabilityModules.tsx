'use client';

import { useState, useRef, useEffect } from 'react';

interface Module {
  id: string;
  title: string;
  status: 'done' | 'ready' | 'locked';
  icon: 'check' | 'lightning' | 'lock';
  // Optional accent to override status color for specific modules
  variant?: 'default' | 'purple';
}

interface CapabilityModulesProps {
  title: string;
  progress: number;
  modules: Module[];
}

export default function CapabilityModules({ title, progress, modules }: CapabilityModulesProps) {
  const [moduleStatuses, setModuleStatuses] = useState<('done' | 'ready' | 'locked')[]>([]);
  const [progressBarWidth, setProgressBarWidth] = useState<number>(1600);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const modulesContainerRef = useRef<HTMLDivElement>(null);
  
  // Use ResizeObserver to detect when modules are fully rendered
  useEffect(() => {
    if (!modulesContainerRef.current) return;
    
    const observer = new ResizeObserver(() => {
      const moduleElements = modulesContainerRef.current?.querySelectorAll('[data-module-index]');
      if (!moduleElements || moduleElements.length === 0) return;
      
      // Calculate width only once when modules are stable
      if (progressBarWidth === 1600) {
        const firstModuleRect = moduleElements[0].getBoundingClientRect();
        const lastModuleRect = moduleElements[moduleElements.length - 1].getBoundingClientRect();
        const totalWidth = (lastModuleRect.left + lastModuleRect.width) - firstModuleRect.left;
        setProgressBarWidth(totalWidth);
      }
    });
    
    observer.observe(modulesContainerRef.current);
    
    return () => observer.disconnect();
  }, [progressBarWidth]);
  
  // Calculate module statuses using visual position
  useEffect(() => {
    if (!progressBarRef.current || progressBarWidth === 1600) return;
    
    const progressBarRect = progressBarRef.current.getBoundingClientRect();
    const progressBarEndX = progressBarRect.left + (progressBarWidth * progress / 100);
    
    const moduleElements = modulesContainerRef.current?.querySelectorAll('[data-module-index]');
    if (!moduleElements) return;
    
    const statuses: ('done' | 'ready' | 'locked')[] = [];
    let firstRightModule = -1;
    
    moduleElements.forEach((element, index) => {
      const moduleRect = element.getBoundingClientRect();
      const moduleCenterX = moduleRect.left + (moduleRect.width / 2);
      
      // If module center is to the left of progress bar end
      if (moduleCenterX < progressBarEndX) {
        statuses[index] = 'done'; // Green - completed
      } else {
        if (firstRightModule === -1) {
          firstRightModule = index;
          statuses[index] = 'ready'; // Blue - next to do
        } else {
          statuses[index] = 'locked'; // Gray - locked
        }
      }
    });
    
    setModuleStatuses(statuses);
  }, [progress, progressBarWidth]);
  
  const getModuleStatus = (index: number) => {
    return moduleStatuses[index] || 'locked';
  };

  const renderIcon = (moduleIndex: number) => {
    const status = getModuleStatus(moduleIndex);
    const accent = modules[moduleIndex]?.variant ?? 'default';
    
    if (status === 'done') {
      return (
        <svg className={`w-4 h-4 ${accent === 'purple' ? 'text-purple-800' : 'text-green-800'}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    }
    if (status === 'ready') {
      return (
        <svg className="w-4 h-4 text-purple-800" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
      </svg>
    );
  };

  const getModuleStyles = (moduleIndex: number) => {
    const status = getModuleStatus(moduleIndex);
    const accent = modules[moduleIndex]?.variant ?? 'default';
    if (accent === 'purple') {
      return 'bg-purple-200 text-purple-800 border border-purple-300';
    }
    
    switch (status) {
      case 'done':
        return 'bg-green-200 text-green-800 border border-green-300';
      case 'ready':
        return 'bg-purple-200 text-purple-800 border border-purple-300';
      case 'locked':
      default:
        return 'bg-gray-300 text-gray-600';
    }
  };

  // Split modules into two rows
  const midPoint = Math.ceil(modules.length / 2);
  const firstRow = modules.slice(0, midPoint);
  const secondRow = modules.slice(midPoint);

  return (
    <div className="mb-8">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="bg-white rounded-lg shadow-sm p-6">
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
          <div id="modules-container" ref={modulesContainerRef} className="flex-1 overflow-x-auto scrollbar-hide">
            {/* Capability Progress Bar - spans full module width */}
            <div className="mb-4">
              <div className="relative">
                <div ref={progressBarRef} className="bg-gray-200 rounded-full h-6 flex items-center" style={{width: `${progressBarWidth}px`}}>
                  <div className="bg-primary h-6 rounded-full transition-all duration-300 flex items-center justify-end pr-3 relative" style={{width: `${progress}%`}}>
                    <span className="text-xs font-medium text-white">{progress}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {/* First row */}
              <div className="flex gap-3 min-w-max">
                {firstRow.map((module, index) => (
                  <div
                    key={module.id}
                    data-module-index={index}
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 whitespace-nowrap ${getModuleStyles(index)}`}
                  >
                    {renderIcon(index)}
                    {module.title}
                  </div>
                ))}
              </div>

              {/* Second row */}
              <div className="flex gap-3 min-w-max">
                {secondRow.map((module, index) => {
                  const moduleIndex = midPoint + index; // Adjust index for second row
                  return (
                    <div
                      key={module.id}
                      data-module-index={moduleIndex}
                      className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 whitespace-nowrap ${getModuleStyles(moduleIndex)}`}
                    >
                      {renderIcon(moduleIndex)}
                      {module.title}
                    </div>
                  );
                })}
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
    </div>
  );
}
