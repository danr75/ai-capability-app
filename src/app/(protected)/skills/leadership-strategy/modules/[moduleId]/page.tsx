"use client";

import { ModuleLearn } from '@/components/ui';
import type { Question } from '@/components/ui/ModuleLearn';

const MODULES: Record<string, { title: string; questions: Question[] }> = {
  "4": {
    title: "Stakeholder Alignment",
    questions: [
      {
        id: 1,
        text: "Before proposing an AI initiative, identify the _______ who can block or enable it.",
        blank: "_______",
        options: [
          { id: 'a', text: 'key stakeholders', correct: true },
          { id: 'b', text: 'vendors', correct: false }
        ],
        explanation: 'Map influence early. Alignment depends on understanding who matters and why.',
        module: 'Stakeholder Alignment',
        lesson: 'Stakeholder Mapping',
        lessonContent: 'RACI and influence-interest matrices help surface key actors.'
      },
      {
        id: 2,
        text: "To build buy-in, translate AI benefits into the _______ each group cares about.",
        blank: "_______",
        options: [
          { id: 'a', text: 'outcomes', correct: true },
          { id: 'b', text: 'algorithms', correct: false }
        ],
        explanation: 'Executives want ROI; legal wants compliance; ops want reliability.',
        module: 'Stakeholder Alignment',
        lesson: 'Value Framing',
        lessonContent: 'Tailoring the message reduces resistance and clarifies tradeoffs.'
      },
      {
        id: 3,
        text: "When disagreement persists, use a time-boxed _______ to compare options with data.",
        blank: "_______",
        options: [
          { id: 'a', text: 'pilot', correct: true },
          { id: 'b', text: 'memo', correct: false }
        ],
        explanation: 'Pilots de-risk decisions by generating context-specific evidence.',
        module: 'Stakeholder Alignment',
        lesson: 'Decision Mechanisms',
        lessonContent: 'Start with a small scope, clear metrics, and stakeholder check-ins.'
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
          <a href="/skills/leadership-strategy" className="text-primary hover:underline">Back to Leadership & Strategy</a>
        </div>
      </div>
    );
  }

  return (
    <ModuleLearn
      title={mod.title}
      questions={mod.questions}
      skillArea="Leadership & Strategy"
      backLink="/skills/leadership-strategy"
      tipText={<div className="text-sm text-gray-700">Focused practice for: <span className="font-medium">{mod.title}</span></div>}
      completionLink={`/skills/leadership-strategy/modules/${params.moduleId}/completion`}
    />
  );
}
