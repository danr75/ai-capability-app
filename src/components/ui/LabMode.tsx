'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const QUESTION = {
  title:
    "When developing an AI strategy for your organization, which factors should be prioritized in the initial assessment phase?",
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

export default function LabMode() {
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  const isOptionSelected = (id: string) => selected.includes(id);

  // After checking, allow clicking any option to immediately show green/red feedback
  const handleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    // If already checked, keep checked true so feedback is immediate
    // (no-op)
  };

  const handleCheck = () => setChecked(true);

  const handleNext = () => {
    setSelected([]);
    setChecked(false);
  };

  // Show correct/incorrect feedback only for selected options after checked
  const isCorrect = (id: string) =>
    checked && selected.includes(id) && !!QUESTION.options.find((o) => o.id === id)?.correct;

  const isIncorrect = (id: string) =>
    checked && selected.includes(id) && !QUESTION.options.find((o) => o.id === id)?.correct;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-xl mb-3">
        <a href="#" className="text-sm font-medium text-primary-600 hover:underline flex items-center gap-1">
          <span className="text-base">&larr;</span> Back to Data & Tech
        </a>
      </div>
      {/* Lab Header */}
      <div className="w-full max-w-xl mb-4">
        <div className="rounded-lg p-4" style={{ background: 'linear-gradient(90deg, #005fd1 90%, #1e90ff 100%)', color: '#fff' }}>
          <div className="font-bold text-base">Lab - Data & Tech Capable</div>
          <div className="text-sm opacity-90">Objective: xxxxx</div>
        </div>
      </div>
      <div className="w-full max-w-xl bg-white rounded-lg shadow p-6 flex flex-col gap-6">
        <div>
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
          <Button variant="outline" size="sm" className="text-xs" disabled>
            &larr; Previous
          </Button>

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
  );
}

