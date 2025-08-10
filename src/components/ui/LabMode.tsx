'use client';

import React, { useState } from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSavedItems } from '@/app/contexts/SavedItemsContext';

const QUESTION = {
  title:
    "Prioritize factors for AI strategy assessment.",
  subtitle:
    "Select all answers that apply. Multiple correct answers may exist.",
  options: [
    {
      id: "data",
      label: "Current data infrastructure and quality",
      correct: true,
    },
    {
      id: "competitive",
      label: "Competitive landscape and AI adoption",
      correct: true,
    },
    {
      id: "trends",
      label: "Latest AI technology trends",
      correct: false,
    },
    {
      id: "org",
      label: "Organizational readiness and culture",
      correct: true,
    },
    {
      id: "budget",
      label: "Available budget for AI initiatives",
      correct: false,
    },
  ],
  explanation:
    "Successful AI strategy development requires assessing your data foundation, understanding competitive positioning, and evaluating organizational readiness. While budget and technology trends matter, they should follow strategic clarity rather than drive it.",
};

type LabModeProps = {
  backLink?: string;
  skillArea?: string;
};

export default function LabMode({ backLink = '#', skillArea = 'Data & Tech Capable' }: LabModeProps) {
  const { addSavedItem } = useSavedItems();
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);

  // Format objective to a clean sentence
  const renderObjective = (text: string) => {
    let t = (text || '').trim();
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

  const isOptionSelected = (id: string) => selected.includes(id);

  // After checking, allow clicking any option to immediately show green/red feedback
  const handleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    // If already checked, keep checked true so feedback is immediate
    // (no-op)
  };

  const handleCheck = () => {
    // Find correct options not selected
    const missingCorrect = QUESTION.options.filter(
      (opt) => opt.correct && !selected.includes(opt.id)
    ).map(opt => opt.id);
    if (missingCorrect.length > 0) {
      setSelected(prev => [...prev, ...missingCorrect]);
    }
    setChecked(true);
  };

  const handleNext = () => {
    setSelected([]);
    setChecked(false);
    setFinished(true); // Only one question, so finish after next
  };

  const handleRedo = () => {
    setSelected([]);
    setChecked(false);
    setFinished(false);
  };

  const [lessonSaved, setLessonSaved] = useState(false);
  const handleSave = () => {
    addSavedItem({
      title: QUESTION.title,
      type: 'real-world-assessment',
      path: '/skills/data-tech/lab-mode'
    });
    setLessonSaved(true);
  }


  // Show correct/incorrect feedback only for selected options after checked
  const isCorrect = (id: string) =>
    checked && selected.includes(id) && !!QUESTION.options.find((o) => o.id === id)?.correct;

  const isIncorrect = (id: string) =>
    checked && selected.includes(id) && !QUESTION.options.find((o) => o.id === id)?.correct;

  if (finished) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        {/* Header navigation */}
        <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link href={backLink} className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to {skillArea}
            </Link>
            {/* Lab Header */}
            <div className="rounded-lg p-4 bg-[#2158F4] text-white mb-6">
              <div className="text-2xl font-bold">Real-World Assessment</div>
              <div className="text-base font-normal opacity-90">{renderObjective(QUESTION.title)}</div>
            </div>
          </div>
        </div>
        {/* Main Congrats Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8 flex flex-col items-start text-left">
            <h2 className="text-lg font-semibold mb-2 block text-green-700">Congratulations!</h2>
            <div className="mb-4 text-base text-gray-900">{renderObjective(QUESTION.title)}</div>
            <div className="mb-1 text-lg font-semibold">Learning:</div>
            <div className="mb-6 text-base text-gray-900">{QUESTION.explanation}</div>
            <div className="flex gap-4">
              <Button variant="secondary" onClick={handleRedo}>Redo Assessment</Button>
              <Button variant="default" onClick={handleSave} disabled={lessonSaved}>{lessonSaved ? 'Saved' : 'Save Results'}</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header navigation */}
      <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href={backLink} className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to {skillArea}
          </Link>
          {/* Lab Header */}
          <div className="rounded-lg p-4 bg-[#2158F4] text-white mb-6">
            <div className="text-2xl font-bold">Real-World Assessment</div>
            <div className="text-base font-normal opacity-90">{renderObjective(QUESTION.title)}</div>
          </div>
        </div>
      </div>
      {/* Main LabMode content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 flex flex-col gap-6">
          <div className="max-w-2xl w-full mx-auto">
            <Label className="text-lg font-semibold mb-1 block">{QUESTION.title}</Label>
            <div className="flex flex-col gap-3">
              {QUESTION.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelect(opt.id)}
                  aria-pressed={isOptionSelected(opt.id)}
                  className={`flex items-center w-full rounded border px-4 py-3 text-left transition text-base font-medium focus:outline-none cursor-pointer
                    ${
                      checked && isOptionSelected(opt.id)
                        ? QUESTION.options.find((o) => o.id === opt.id)?.correct
                          ? "bg-green-50 border-green-600 text-green-800"
                          : "bg-red-50 border-red-600 text-red-800"
                        : !checked && isOptionSelected(opt.id)
                        ? "bg-blue-50 border-blue-600 text-blue-900"
                        : "bg-white border-gray-200 hover:bg-blue-50"
                    }
                  `}
                >
                  <span className="flex-shrink-0 mr-3 pointer-events-none">
                    <input
                      type="checkbox"
                      checked={isOptionSelected(opt.id)}
                      readOnly
                      tabIndex={-1}
                      className={`accent-blue-600 h-5 w-5 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 ${
                        checked && isOptionSelected(opt.id)
                          ? QUESTION.options.find((o) => o.id === opt.id)?.correct
                            ? "ring-2 ring-green-500"
                            : "ring-2 ring-red-500"
                          : ""
                      }`}
                    />
                  </span>
                  <span className="pointer-events-none">{opt.label}</span>
                  {checked && isOptionSelected(opt.id) && QUESTION.options.find((o) => o.id === opt.id)?.correct && (
                    <span className="ml-auto text-green-600 text-lg pointer-events-none">&#10003;</span>
                  )}
                  {checked && isOptionSelected(opt.id) && !QUESTION.options.find((o) => o.id === opt.id)?.correct && (
                    <span className="ml-auto text-red-600 text-lg pointer-events-none">&#10007;</span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="max-w-2xl w-full mx-auto">
            {/* Show message if incorrects after checking */}
            {checked && (!QUESTION.options.every(opt => (!opt.correct || selected.includes(opt.id)) && (opt.correct || !selected.includes(opt.id)))) && (
              <div className="text-red-600 text-sm mt-2">
                Select all correct answers to proceed, no incorrect options.
              </div>
            )}
            {checked && (
              <div className="bg-gray-50 border rounded p-4 mt-2">
                <div className="font-semibold mb-1">Explanation:</div>
                <div className="text-sm text-gray-700">{QUESTION.explanation}</div>
              </div>
            )}
            <div className="flex items-center justify-between gap-2 mt-4 w-full">
              {/* Previous button (always left) */}
              <button
                className={`inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors px-3 py-2 rounded font-medium opacity-50 cursor-not-allowed`}
                disabled
              >
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              {/* Check/Checked button (always center) */}
              <div className="flex-1 flex justify-center">
                {!checked ? (
                  <Button
                    variant="purple"
                    size="lg"
                    className="font-semibold px-8"
                    onClick={handleCheck}
                    disabled={selected.length === 0}
                  >
                    Check
                  </Button>
                ) : (
                  <Button
                    variant="purple"
                    size="lg"
                    className="font-semibold px-8"
                    onClick={handleCheck}
                    disabled
                  >
                    Checked
                  </Button>
                )}
              </div>

              {/* Next button (always right, only when eligible) */}
              {checked && QUESTION.options.every(opt => (!opt.correct || selected.includes(opt.id)) && (opt.correct || !selected.includes(opt.id))) ? (
                <Button
                  variant="purple"
                  size="sm"
                  className="text-xs"
                  onClick={handleNext}
                >
                  Next Question &rarr;
                </Button>
              ) : (
                <span className="w-[120px]" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
