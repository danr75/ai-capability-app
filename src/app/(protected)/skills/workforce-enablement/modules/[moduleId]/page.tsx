"use client";

import { ModuleLearn } from '@/components/ui';
import type { Question } from '@/components/ui/ModuleLearn';

const MODULES: Record<string, { title: string; questions: Question[] }> = {
  "4": {
    title: "Learning Pathways",
    questions: [
      {
        id: 1,
        text: "A learning pathway sequences content to move from _______ to proficient.",
        blank: "_______",
        options: [
          { id: 'a', text: 'beginner', correct: true },
          { id: 'b', text: 'vacation', correct: false }
        ],
        explanation: 'Pathways scaffold skills through progressive milestones.',
        module: 'Learning Pathways',
        lesson: 'Design Principles',
        lessonContent: 'Clear leveling (beginner/intermediate/advanced) supports growth.'
      },
      {
        id: 2,
        text: "A good pathway blends formal courses with on-the-job _______.",
        blank: "_______",
        options: [
          { id: 'a', text: 'practice', correct: true },
          { id: 'b', text: 'paperwork', correct: false }
        ],
        explanation: 'Deliberate practice and projects reinforce learning in context.',
        module: 'Learning Pathways',
        lesson: 'Modalities',
        lessonContent: 'Mix self-paced, coaching, and projects for retention.'
      },
      {
        id: 3,
        text: "Progress is measured via role-aligned _______ and assessments.",
        blank: "_______",
        options: [
          { id: 'a', text: 'competencies', correct: true },
          { id: 'b', text: 'decorations', correct: false }
        ],
        explanation: 'Competency frameworks define observable behaviors by level.',
        module: 'Learning Pathways',
        lesson: 'Measurement',
        lessonContent: 'Rubrics and checklists provide objective criteria.'
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
          <a href="/skills/workforce-enablement" className="text-primary hover:underline">Back to Workforce Enablement</a>
        </div>
      </div>
    );
  }

  return (
    <ModuleLearn
      title={mod.title}
      questions={mod.questions}
      skillArea="Workforce Enablement"
      backLink="/skills/workforce-enablement"
      tipText={<div className="text-sm text-gray-700">Focused practice for: <span className="font-medium">{mod.title}</span></div>}
      completionLink={`/skills/workforce-enablement/modules/${params.moduleId}/completion`}
    />
  );
}
