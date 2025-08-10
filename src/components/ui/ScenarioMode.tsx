"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from 'next/navigation';

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
  scenarioPath: string; // unique path for saved item
  forceComplete?: boolean;
};

export function ScenarioMode({ title, objective, steps, backHref, scenarioPath, forceComplete }: ScenarioModeProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextParam = searchParams?.get('next') || '';
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showTip, setShowTip] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Derive a rotated step order based on the 'next' query param
  const [shuffledSteps, setShuffledSteps] = useState<ScenarioStep[]>(steps);
  useEffect(() => {
    if (!steps || steps.length === 0) {
      setShuffledSteps([]);
      return;
    }
    const rotateBy = nextParam ? (parseInt(nextParam, 10) || 0) % steps.length : 0;
    const rotated = rotateBy > 0 ? [...steps.slice(rotateBy), ...steps.slice(0, rotateBy)] : [...steps];
    setShuffledSteps(rotated);
    // reset progress on new scenario order
    setCurrent(0);
    setSelected(null);
    setShowTip(false);
    setCompletedSteps([]);
  }, [steps, nextParam]);

  // Format objective to read as a natural sentence
  const renderObjective = (text: string) => {
    let t = (text || '').trim();
    // Avoid "to to" if the text already starts with "to"
    t = t.replace(/^(to\s+)/i, '');
    // Lowercase the first alphabetical character for sentence case
    const firstAlpha = t.match(/[A-Za-z]/);
    if (firstAlpha && typeof firstAlpha.index === 'number') {
      const i = firstAlpha.index;
      t = t.slice(0, i) + t[i].toLowerCase() + t.slice(i + 1);
    }
    const sentence = `Your objective is to ${t}`;
    return sentence.endsWith('.') ? sentence : sentence + '.';
  };

  // Ensure summary sentences end with a period
  const renderSummary = (text: string) => {
    const t = (text || '').trim();
    if (!t) return '';
    return t.endsWith('.') ? t : t + '.';
  };

  // If forceComplete is set, mark all steps as completed
  useEffect(() => {
    if (forceComplete) {
      setCompletedSteps(shuffledSteps.map(s => s.id));
    }
  }, [forceComplete, shuffledSteps]);

  const step = shuffledSteps[current];
  const isCorrect = selected && step.options.find(o => o.id === selected)?.correct;

  // Keyboard selection support
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1' || e.key === '2') {
        const idx = parseInt(e.key, 10) - 1;
        const opt = step.options[idx];
        if (!opt) return;
        // Mirror button disabled logic:
        // disabled iff there is a selection AND the target option is incorrect AND it's not the currently selected one
        const isOptionCorrect = !!opt.correct;
        const isDisabled = !!selected && (!isOptionCorrect && selected !== opt.id);
        if (!isDisabled) {
          handleSelect(opt.id);
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
        if (current < shuffledSteps.length - 1) {
          setCurrent(current + 1);
          setSelected(null);
          setShowTip(false);
        }
      }, 500); // auto-advance on correct
    }
  };

  // Completion logic: all steps complete
  const isComplete = shuffledSteps.length > 0 && completedSteps.length === shuffledSteps.length;

  // Handler for 'Do Again' button
  const handleDoAgain = () => {
    setCurrent(0);
    setSelected(null);
    setShowTip(false);
    setCompletedSteps([]);
  };

  // Handler for 'Next' to launch a new scenario (navigate to same path with cache-busting query)
  const handleNextScenario = () => {
    const path = typeof window !== 'undefined' ? window.location.pathname : backHref;
    const qs = `?next=${Date.now()}`;
    router.push(`${path}${qs}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-10 mt-8">
        {/* Top bar */}
        <div className="flex items-center mb-4">
          <Link href={backHref} className="text-blue-700 hover:underline mr-4 text-sm font-medium">← {title}</Link>
        </div>
        {/* Scenario Mode Heading */}
        <div className="mb-6 text-center">
          <Link href="/learning-coach/saved-items" className="text-2xl sm:text-3xl font-bold text-primary hover:underline focus:underline">
            Scenario
          </Link>
        </div>
        {/* COMPLETION UI */}
        {isComplete ? (
          <div className="bg-blue-50 rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-bold text-[#00C48C] mb-4">Scenario Complete!</h2>
            <div className="mb-4">
              <div className="text-gray-700 text-base mb-4">{renderObjective(objective)}</div>
              {shuffledSteps.map((s, idx) => (
                <div key={s.id} className="mb-3">
                  <div className="font-semibold text-gray-900">Step {idx + 1}: {s.stepLabel}</div>
                  <div className="text-gray-700 text-sm">{renderSummary(s.tip)}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                className="px-6 py-2 rounded font-semibold bg-[#2158F4] text-white hover:bg-[#1741b3] transition-colors"
                onClick={handleNextScenario}
                type="button"
              >
                Next
              </button>
              <button
                className="px-6 py-2 rounded font-semibold bg-[#2158F4] text-white hover:bg-[#1741b3] transition-colors"
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
            <div className="bg-blue-50 rounded-lg shadow-sm p-6 mb-6">
              {/* Objective text */}
              <div className="text-sm md:text-base text-gray-600 mb-3">
                {renderObjective(objective)}
              </div>
              {/* Question */}
              <div className="mb-4">
                <div className="text-lg text-gray-700 font-medium min-h-[48px] flex items-end">
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
                        className={`flex-1 rounded-lg border px-4 py-4 text-left font-medium text-base transition-all flex items-center gap-3
                          ${isSelected && isOptionCorrect ? "border-green-500 bg-green-50" : ""}
                          ${isSelected && !isOptionCorrect ? "border-red-500 bg-red-50" : ""}
                          ${!isSelected ? "border-blue-200 bg-white text-gray-800 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-900 hover:shadow-sm" : ""}
                          ${selected && !isSelected ? "opacity-60" : ""}
                        `}
                      >
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-base font-bold mr-3
                          ${isSelected ? (isOptionCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-blue-100 text-blue-700'}`}
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
            <div className="my-1" style={{ minHeight: 32 }}>
              {showTip ? (
                <div className="bg-red-50 border border-red-200 rounded px-3 py-2">
                  <div className="font-semibold text-red-700 mb-0.5">Tip:</div>
                  <div className="text-red-700 text-sm">{step.tip}</div>
                </div>
              ) : (
                <div style={{ visibility: 'hidden' }}>placeholder</div>
              )}
            </div>
            {/* Steps Complete (show only completed steps, always visible if at least one is done) */}
            {completedSteps.length > 0 && (
              <div className="mt-6 bg-blue-50 rounded-lg shadow-sm p-4">
                <div className="text-xs text-blue-700 font-semibold mb-2">Steps complete</div>
                <div className="flex flex-col gap-1">
                  {shuffledSteps
                    .filter((s) => completedSteps.includes(s.id))
                    .map((s) => (
                      <div key={s.id} className="flex items-center text-sm text-blue-900">
                        <span className="inline-block w-5 h-5 text-center mr-2 rounded-full border font-bold bg-blue-500 text-white border-blue-500">
                          ✓
                        </span>
                        <span>{s.stepLabel}</span>
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
