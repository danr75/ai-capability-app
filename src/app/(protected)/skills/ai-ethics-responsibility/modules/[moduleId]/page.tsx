"use client";

import { ModuleLearn } from '@/components/ui';
import type { Question } from '@/components/ui/ModuleLearn';

const MODULES: Record<string, { title: string; questions: Question[] }> = {
  "4": {
    title: "Privacy Protection",
    questions: [
      {
        id: 1,
        text: "PII should be minimized and collected with clear _______.",
        blank: "_______",
        options: [
          { id: 'a', text: 'purpose', correct: true },
          { id: 'b', text: 'gossip', correct: false }
        ],
        explanation: 'Purpose limitation is a core privacy principle (e.g., GDPR).',
        module: 'Privacy Protection',
        lesson: 'Principles',
        lessonContent: 'Collect only what is necessary for a specified purpose.'
      },
      {
        id: 2,
        text: "To reduce re-identification risk, use _______ on training data.",
        blank: "_______",
        options: [
          { id: 'a', text: 'de-identification', correct: true },
          { id: 'b', text: 'amplification', correct: false }
        ],
        explanation: 'Techniques include masking, tokenization, and generalization.',
        module: 'Privacy Protection',
        lesson: 'Data Handling',
        lessonContent: 'Apply privacy-by-design across the ML lifecycle.'
      },
      {
        id: 3,
        text: "Training user-level models may require explicit _______.",
        blank: "_______",
        options: [
          { id: 'a', text: 'consent', correct: true },
          { id: 'b', text: 'rumors', correct: false }
        ],
        explanation: 'Consent and lawful basis vary by jurisdiction and use case.',
        module: 'Privacy Protection',
        lesson: 'Governance',
        lessonContent: 'Track data subjects, bases, and retention policies.'
      }
    ]
  }
};

export default function ModulePage({ params }: { params: { moduleId: string } }) {
  const mod = MODULES[params.moduleId];

  if (!mod) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Module not found</h1>
          <a href="/skills/ai-ethics-responsibility" className="text-primary hover:underline">Back to AI Ethics & Responsibility</a>
        </div>
      </div>
    );
  }

  return (
    <ModuleLearn
      title={mod.title}
      questions={mod.questions}
      skillArea="AI Ethics & Responsibility"
      backLink="/skills/ai-ethics-responsibility"
      tipText={<div className="text-sm text-gray-700">Focused practice for: <span className="font-medium">{mod.title}</span></div>}
      completionLink={`/skills/ai-ethics-responsibility/modules/${params.moduleId}/completion`}
    />
  );
}
