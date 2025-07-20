"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSavedItems } from '@/app/contexts/SavedItemsContext';

export type ScenarioStep = {
  id: number;
  question: string;
  options: { id: string; text: string; correct: boolean }[];
  tip: string;
  stepLabel: string; // e.g. "Step 1: Clearly Define Project Requirements & Scope"
};

export type ScenarioModeProps = {
  title: string;
  objective: string;
  steps: ScenarioStep[];
  backHref: string;
  forceComplete?: boolean;
};

export function ScenarioMode({ title, objective, steps, backHref, forceComplete }: ScenarioModeProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showTip, setShowTip] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // If forceComplete is set, mark all steps as completed
  useEffect(() => {
    if (forceComplete) {
      setCompletedSteps(steps.map(s => s.id));
    }
  }, [forceComplete, steps]);

  const step = steps[current];
  const isCorrect = selected && step.options.find(o => o.id === selected)?.correct;

  // Keyboard selection support
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selected && (e.key === '1' || e.key === '2')) {
        const idx = parseInt(e.key, 10) - 1;
        if (step.options[idx]) {
          handleSelect(step.options[idx].id);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected, step]);

  const handleSelect = (id: string) => {
    setSelected(id);
    const correct = step.options.find(o => o.id === id)?.correct;
    if (!correct) {
      setShowTip(true);
    } else {
      setShowTip(false);
      if (!completedSteps.includes(step.id)) {
        setCompletedSteps([...completedSteps, step.id]);
      }
      setTimeout(() => {
        if (current < steps.length - 1) {
          setCurrent(current + 1);
          setSelected(null);
          setShowTip(false);
        }
      }, 500); // auto-advance on correct
    }
  };

  // Completion logic: all steps complete
  const isComplete = completedSteps.length === steps.length;

  // Handler for 'Do Again' button
  const handleDoAgain = () => {
    setCurrent(0);
    setSelected(null);
    setShowTip(false);
    setCompletedSteps([]);
  };

  // Saved Items integration
  const { addSavedItem, savedItems } = useSavedItems();
  const scenarioPath = '/learning-coach/completed-scenarios/leadership-strategy';
  const isAlreadySaved = savedItems.some(item => item.path === scenarioPath && item.type === 'scenario');

  // Handler for 'Save Item' button
  const handleSaveProgress = () => {
    if (isAlreadySaved) return;
    addSavedItem({
      title,
      type: 'scenario',
      path: scenarioPath
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 mt-8">
        {/* Top bar */}
        <div className="flex items-center mb-4">
          <Link href={backHref} className="text-blue-700 hover:underline mr-4 text-sm font-medium">← Back to Scenario List</Link>
        </div>
        {/* Scenario Mode Heading */}
        <div className="bg-[#2158F4] rounded-xl p-6 mb-6">
          <Link href="/learning-coach/saved-items" className="text-2xl font-bold text-white mb-1 hover:underline focus:underline">
            Scenario: {title}
          </Link>
          <div className="text-white text-base font-medium opacity-90 mt-1">Objective: {objective}</div>
        </div>
        {/* COMPLETION UI */}
        {isComplete ? (
          <div className="bg-[#F5F8FF] rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-bold text-[#00C48C] mb-4">Scenario Complete!</h2>
            <div className="mb-4">
              <div className="font-bold text-gray-800 mb-1">Objective:</div>
              <div className="text-gray-700 text-base mb-4">{objective}</div>
              {steps.map((s, idx) => (
                <div key={s.id} className="mb-3">
                  <div className="font-semibold text-gray-900">Step {idx + 1}: {s.stepLabel}</div>
                  <div className="text-gray-700 text-sm ml-1">{s.question}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                className={`bg-[#00C48C] hover:bg-[#00b37a] text-white font-bold py-3 px-6 rounded-lg text-lg transition ${isAlreadySaved ? 'opacity-60 cursor-not-allowed' : ''}`}
                onClick={handleSaveProgress}
                type="button"
                disabled={isAlreadySaved}
              >
                {isAlreadySaved ? 'Saved' : 'Save Item'}
              </button>
              <button
                className="bg-[#B681FC] hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg text-lg transition"
                onClick={handleDoAgain}
                type="button"
              >
                Do Again
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Objective, Step, and Options in Light Blue Container */}
            <div className="bg-[#F5F8FF] rounded-xl p-6 mb-6 min-h-[200px]">

              {/* Question */}
              <div className="mb-4">
                <div className="text-lg text-gray-700 mb-4 font-medium">
                  Step {current + 1}. {step.question}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  {step.options.map((opt, idx) => {
                    const isSelected = selected === opt.id;
                    const isOptionCorrect = opt.correct;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelect(opt.id)}
                        disabled={!!selected && (isOptionCorrect ? false : selected !== opt.id)}
                        className={`flex-1 rounded border px-4 py-4 text-left font-medium transition-all flex items-center gap-3
                          ${isSelected && isOptionCorrect ? "border-green-500 bg-green-50" : ""}
                          ${isSelected && !isOptionCorrect ? "border-red-500 bg-red-50" : ""}
                          ${!isSelected ? "border-gray-200 bg-white hover:bg-blue-50" : ""}
                          ${selected && !isSelected ? "opacity-60" : ""}
                        `}
                      >
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-base font-bold mr-3
                          ${isSelected ? (isOptionCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-gray-200 text-gray-700'}`}
                        >
                          {idx + 1}
                        </span>
                        <span className={`align-middle flex-1 ${isSelected ? (isOptionCorrect ? 'text-green-700' : 'text-red-600') : 'text-gray-700'}`}>{opt.text}</span>
                        <span className={`ml-2 font-semibold transition-opacity ${isSelected && isOptionCorrect ? 'text-green-600 opacity-100' : isSelected && !isOptionCorrect ? 'text-red-600 opacity-100' : 'opacity-0'}`}>{isSelected ? (isOptionCorrect ? '✓' : '✗') : '✓'}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* Tip/Feedback (outside the container, with reserved space) */}
            <div className="mb-6" style={{ minHeight: 64 }}>
              {showTip ? (
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <div className="font-semibold text-red-700 mb-1">Tip:</div>
                  <div className="text-red-700 text-sm">{step.tip}</div>
                </div>
              ) : (
                <div style={{ visibility: 'hidden' }}>placeholder</div>
              )}
            </div>
            {/* Steps Complete (show only completed steps, always visible if at least one is done) */}
            {completedSteps.length > 0 && (
              <div className="mt-6">
                <div className="text-xs text-gray-500 mb-2">Steps complete:</div>
                <div className="flex flex-col gap-1">
                  {steps
                    .filter((s) => completedSteps.includes(s.id))
                    .map((s, i) => (
                      <div key={s.id} className="flex items-center text-sm">
                        <span className="inline-block w-5 h-5 text-center mr-2 rounded-full border font-bold bg-green-500 text-white border-green-500">
                          ✓
                        </span>
                        <span className="text-gray-800">{s.stepLabel}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
  );
}
