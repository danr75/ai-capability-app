'use client';

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSavedItems } from '@/app/contexts/SavedItemsContext';

const MAX_OPTIONS = 5;
const QUESTIONS = [
  {
    id: 'q1',
    title: 'Prioritize factors for AI strategy assessment.',
    subtitle: 'Select all answers that apply. Multiple correct answers may exist.',
    options: [
      { id: 'data', label: 'Current data infrastructure and quality', correct: true },
      { id: 'competitive', label: 'Competitive landscape and AI adoption', correct: true },
      { id: 'trends', label: 'Latest AI technology trends', correct: false },
      { id: 'org', label: 'Organizational readiness and culture', correct: true },
      { id: 'budget', label: 'Available budget for AI initiatives', correct: false },
    ],
    explanation:
      'Successful AI strategy development requires assessing your data foundation, understanding competitive positioning, and evaluating organizational readiness. While budget and technology trends matter, they should follow strategic clarity rather than drive it.',
  },
  {
    id: 'q2',
    title: 'Identify the key stakeholders to involve when forming an AI strategy.',
    subtitle: 'Select all answers that apply. Multiple correct answers may exist.',
    options: [
      { id: 'cdo', label: 'Chief Data/Analytics Officer (CDO/CDAO)', correct: true },
      { id: 'cto', label: 'Chief Technology Officer (CTO) / Engineering Lead', correct: true },
      { id: 'gov', label: 'Data Governance and Security Lead', correct: true },
      { id: 'ops', label: 'Business operations/process owners', correct: true },
      { id: 'intern', label: 'A marketing intern to draft the strategy', correct: false },
    ],
    explanation:
      'A cross-functional group ensures the AI strategy aligns with business priorities, is technically feasible, financially sustainable, secure, and compliant. Overreliance on a single vendor or junior roles to lead strategy introduces risk and misalignment.',
  },
  {
    id: 'q3',
    title: 'Select meaningful success measures for an AI strategy.',
    subtitle: 'Select all answers that apply. Multiple correct answers may exist.',
    options: [
      { id: 'biz', label: 'Business KPIs tied to outcomes (e.g., revenue lift, cost-to-serve)', correct: true },
      { id: 'dq', label: 'Data quality and availability improvements', correct: true },
      { id: 'adopt', label: 'Adoption and change management effectiveness', correct: true },
      { id: 'accuracy', label: 'Model accuracy only, regardless of impact', correct: false },
      { id: 'count', label: 'Number of models deployed, regardless of usage', correct: false },
    ],
    explanation:
      'Effective strategies measure success through business outcomes, data readiness improvements, and adoption. Purely technical vanity metrics (like model count) without impact do not reflect strategic success.',
  },
];

type LabModeProps = {
  backLink?: string;
  skillArea?: string;
};

export default function LabMode({ backLink = '#', skillArea = 'Data & Tech Capable' }: LabModeProps) {
  const { addSavedItem } = useSavedItems();
  const [current, setCurrent] = useState(0);
  // Persist selections and checked state per question index
  const [selectedByIdx, setSelectedByIdx] = useState<string[][]>(
    () => QUESTIONS.map(() => [])
  );
  const [checkedByIdx, setCheckedByIdx] = useState<boolean[]>(
    () => QUESTIONS.map(() => false)
  );
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

  const question = QUESTIONS[current];
  const options = question.options.slice(0, MAX_OPTIONS);
  const selected = selectedByIdx[current] || [];
  const checked = checkedByIdx[current] || false;
  const isOptionSelected = (id: string) => selected.includes(id);

  // After checking, allow clicking any option to immediately show green/red feedback
  const handleSelect = (id: string) => {
    setSelectedByIdx((prev) => {
      const next = [...prev];
      const currSel = new Set(next[current] || []);
      if (currSel.has(id)) currSel.delete(id); else currSel.add(id);
      next[current] = Array.from(currSel);
      return next;
    });
    // If already checked, keep checked true so feedback is immediate
    // (no-op)
  };

  const handleCheck = () => {
    // Do not auto-select missing correct answers; only mark as checked
    setCheckedByIdx((prev) => {
      const next = [...prev];
      next[current] = true;
      return next;
    });
  };

  const handleNext = () => {
    // Do not allow advancing unless the current question is completed
    if (!(checked && isEligibleNext())) return;
    if (current < QUESTIONS.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      setFinished(true);
    }
  };

  const handlePrev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const handleRedo = () => {
    setCurrent(0);
    setSelectedByIdx(QUESTIONS.map(() => []));
    setCheckedByIdx(QUESTIONS.map(() => false));
    setFinished(false);
  };

  // Determine if user can proceed to next (all correct selected, no incorrect selected)
  const isEligibleNext = () =>
    options.every(
      (opt) => (!opt.correct || selected.includes(opt.id)) && (opt.correct || !selected.includes(opt.id))
    );

  // Keyboard shortcuts: numbers to toggle, Enter/Space to check or advance, ArrowRight to advance when eligible
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (finished) return;

      // number keys 1..n to toggle select
      if (/^[1-9]$/.test(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (idx >= 0 && idx < options.length) {
          const target = options[idx];
          e.preventDefault();
          handleSelect(target.id);
          return;
        }
      }

      // Enter/Space: if not checked, check; if checked and eligible, next
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!checked) {
          handleCheck();
        } else if (isEligibleNext()) {
          handleNext();
        }
        return;
      }

      // ArrowRight to advance when eligible
      if (e.key === 'ArrowRight') {
        if (checked && isEligibleNext()) {
          e.preventDefault();
          handleNext();
        }
        return;
      }

      // ArrowLeft to go back to previous question anytime
      if (e.key === 'ArrowLeft') {
        if (current > 0) {
          e.preventDefault();
          handlePrev();
        }
        return;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [checked, selected, finished, current]);

  const [lessonSaved, setLessonSaved] = useState(false);
  const handleSave = () => {
    addSavedItem({
      title: question.title,
      type: 'real-world-assessment',
      path: '/skills/data-tech/lab-mode'
    });
    setLessonSaved(true);
  }


  // Show correct/incorrect feedback only for selected options after checked
  const isCorrect = (id: string) =>
    checked && selected.includes(id) && !!options.find((o) => o.id === id)?.correct;

  const isIncorrect = (id: string) =>
    checked && selected.includes(id) && !options.find((o) => o.id === id)?.correct;

  if (finished) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        {/* Header navigation */}
        <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
          <Link href={backLink} className="inline-flex items-center text-blue-700 hover:underline font-medium mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            {skillArea}
          </Link>
          {/* Heading centered */}
          <div className="mb-6 text-center">
            <Link href={backLink} className="text-2xl sm:text-3xl font-bold text-primary hover:underline focus:underline">
              Real-World Assessment
            </Link>
          </div>
        </div>
        {/* Main Congrats Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="bg-blue-50 rounded-lg shadow-sm p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 flex flex-col items-start text-left">
              <h2 className="text-xl font-bold mb-2 text-green-700">Congratulations!</h2>
              <div className="mb-4 text-base text-gray-900">{renderObjective(question.title)}</div>
              <div className="mb-1 text-lg font-semibold">Learning:</div>
              <div className="mb-6 text-base text-gray-900">{question.explanation}</div>
              <div className="flex gap-4">
                <Button variant="secondary" onClick={handleRedo}>Try Again</Button>
                <Button variant="default" onClick={handleRedo}>Next</Button>
              </div>
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
        <Link href={backLink} className="inline-flex items-center text-blue-700 hover:underline font-medium mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          {skillArea}
        </Link>
        {/* Heading centered */}
        <div className="mb-6 text-center">
          <Link href={backLink} className="text-2xl sm:text-3xl font-bold text-primary hover:underline focus:underline">
            Real-World Assessment
          </Link>
        </div>
      </div>
      {/* Main LabMode content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-blue-50 rounded-lg shadow-sm p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 flex flex-col gap-6">
            <div className="max-w-2xl w-full mx-auto">
              <Label className="text-lg font-semibold mb-1 block">{question.title}</Label>
              <div className="flex flex-col gap-3">
                {options.map((opt, idx) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect(opt.id)}
                    aria-pressed={isOptionSelected(opt.id)}
                    role="checkbox"
                    aria-checked={isOptionSelected(opt.id)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelect(opt.id);
                      }
                    }}
                    className={`flex items-center gap-3 w-full rounded-lg border px-4 py-4 text-left transition text-base font-medium focus:outline-none cursor-pointer
                    ${checked && isOptionSelected(opt.id)
                      ? (options.find((o) => o.id === opt.id)?.correct
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-red-500 bg-red-50 text-red-600')
                      : checked && !isOptionSelected(opt.id) && options.find((o) => o.id === opt.id)?.correct
                          ? 'border-green-500 bg-white text-green-700 hover:bg-green-50'
                          : !checked && isOptionSelected(opt.id)
                              ? 'border-blue-600 bg-blue-50 text-blue-900'
                              : 'border-blue-200 bg-white text-gray-800 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-900 hover:shadow-sm'}
                  `}
                  >
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-base font-bold mr-1 pointer-events-none ${
                      checked && isOptionSelected(opt.id)
                        ? (options.find((o) => o.id === opt.id)?.correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white')
                        : checked && !isOptionSelected(opt.id) && options.find((o) => o.id === opt.id)?.correct
                          ? 'border border-green-500 text-green-700 bg-white'
                          : !checked && isOptionSelected(opt.id)
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-100 text-blue-700'
                    }`}>{idx + 1}</span>
                    <span className="pointer-events-none flex-1">{opt.label}</span>
                    {checked && isOptionSelected(opt.id) && options.find((o) => o.id === opt.id)?.correct && (
                      <span className="ml-auto text-green-600 text-lg pointer-events-none">&#10003;</span>
                    )}
                    {checked && isOptionSelected(opt.id) && !options.find((o) => o.id === opt.id)?.correct && (
                      <span className="ml-auto text-red-600 text-lg pointer-events-none">&#10007;</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="max-w-2xl w-full mx-auto">
              {checked && (
                <div className="bg-gray-50 border rounded p-4 mt-2">
                  <div className="font-semibold mb-1">Explanation:</div>
                  <div className="text-sm text-gray-700">{question.explanation}</div>
                </div>
              )}
              <div className="flex items-center justify-between gap-2 mt-4 w-full">
                {/* Previous + quick Next (left) - fixed width to balance right side */}
                <div className="flex items-center gap-3 w-[120px] justify-start">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous"
                    className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-blue-700 border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors ${current === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={current === 0}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  {current < QUESTIONS.length - 1 && checked && isEligibleNext() && (
                    <button
                      onClick={handleNext}
                      aria-label="Next"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-full text-blue-700 border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Center area only shows guidance when blocked */}
                <div className="flex-1 flex justify-center">
                  {checked && !isEligibleNext() && (
                    <div className="w-full text-sm text-red-600 font-medium text-center">
                      Click on correct and remove incorrect to continue
                    </div>
                  )}
                </div>

                {/* Right-side action: Check first, then Next when eligible */}
                {!checked ? (
                  <Button
                    variant="purple"
                    size="sm"
                    className="text-xs sm:text-sm min-w-[120px] whitespace-nowrap"
                    onClick={handleCheck}
                    disabled={selected.length === 0}
                  >
                    Check
                  </Button>
                ) : isEligibleNext() ? (
                  <Button
                    variant="purple"
                    size="sm"
                    className="text-xs sm:text-sm min-w-[120px] whitespace-nowrap"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                ) : (
                  <span className="w-[120px]" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
