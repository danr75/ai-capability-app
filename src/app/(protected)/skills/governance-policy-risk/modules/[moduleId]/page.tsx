"use client";

import { ModuleLearn } from '@/components/ui';
import type { Question } from '@/components/ui/ModuleLearn';

const MODULES: Record<string, { title: string; questions: Question[] }> = {
  "4": {
    title: "Compliance Frameworks",
    questions: [
      {
        id: 1,
        text: "Policies state the 'what'; _______ state the 'how'.",
        blank: "_______",
        options: [
          { id: 'a', text: 'standards', correct: true },
          { id: 'b', text: 'slogans', correct: false }
        ],
        explanation: 'Standards/procedures operationalize policy intent.',
        module: 'Compliance Frameworks',
        lesson: 'Policy Hierarchy',
        lessonContent: 'Policy → Standards → Procedures → Records.'
      },
      {
        id: 2,
        text: "Evidence of control performance must be _______ and retained.",
        blank: "_______",
        options: [
          { id: 'a', text: 'documented', correct: true },
          { id: 'b', text: 'improvised', correct: false }
        ],
        explanation: 'Auditors need durable, traceable evidence.',
        module: 'Compliance Frameworks',
        lesson: 'Controls & Evidence',
        lessonContent: 'Tickets, logs, sign-offs, and reports demonstrate effectiveness.'
      },
      {
        id: 3,
        text: "Mapping SOC 2 to ISO 27001 is an example of control _______.",
        blank: "_______",
        options: [
          { id: 'a', text: 'crosswalk', correct: true },
          { id: 'b', text: 'guesswork', correct: false }
        ],
        explanation: 'Crosswalks reduce duplication across frameworks.',
        module: 'Compliance Frameworks',
        lesson: 'Harmonization',
        lessonContent: 'Use catalogs to align requirements and reuse controls.'
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
          <a href="/skills/governance-policy-risk" className="text-primary hover:underline">Back to Governance, Policy & Risk</a>
        </div>
      </div>
    );
  }

  return (
    <ModuleLearn
      title={mod.title}
      questions={mod.questions}
      skillArea="Governance, Policy & Risk"
      backLink="/skills/governance-policy-risk"
      tipText={<div className="text-sm text-gray-700">Focused practice for: <span className="font-medium">{mod.title}</span></div>}
      completionLink={`/skills/governance-policy-risk/modules/${params.moduleId}/completion`}
    />
  );
}
