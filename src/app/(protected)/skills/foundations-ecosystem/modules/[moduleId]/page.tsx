"use client";

import { ModuleLearn } from '@/components/ui';
import type { Question } from '@/components/ui/ModuleLearn';

const MODULES: Record<string, { title: string; questions: Question[] }> = {
  "4": {
    title: "Data Infrastructure",
    questions: [
      {
        id: 1,
        text: "Streaming ingestion commonly lands events in a durable _______.",
        blank: "_______",
        options: [
          { id: 'a', text: 'message queue', correct: true },
          { id: 'b', text: 'dashboard', correct: false }
        ],
        explanation: 'Queues (e.g., Kafka) buffer and decouple producers from consumers.',
        module: 'Data Infrastructure',
        lesson: 'Ingestion',
        lessonContent: 'Durable logs absorb spikes and enable replay.'
      },
      {
        id: 2,
        text: "For large-scale analytics, store raw data in a central _______.",
        blank: "_______",
        options: [
          { id: 'a', text: 'data lake', correct: true },
          { id: 'b', text: 'model registry', correct: false }
        ],
        explanation: 'Lakes keep raw, immutable data for multiple downstream consumers.',
        module: 'Data Infrastructure',
        lesson: 'Storage',
        lessonContent: 'Layered zones (raw/curated) preserve lineage and quality.'
      },
      {
        id: 3,
        text: "Feature computation and serving are centralized in a _______.",
        blank: "_______",
        options: [
          { id: 'a', text: 'feature store', correct: true },
          { id: 'b', text: 'vector database', correct: false }
        ],
        explanation: 'A feature store standardizes feature pipelines and online/offline access.',
        module: 'Data Infrastructure',
        lesson: 'ML Data',
        lessonContent: 'Consistent features reduce training/serving skew.'
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
          <a href="/skills/foundations-ecosystem" className="text-primary hover:underline">Back to Foundations & Ecosystem</a>
        </div>
      </div>
    );
  }

  return (
    <ModuleLearn
      title={mod.title}
      questions={mod.questions}
      skillArea="Foundations & Ecosystem"
      backLink="/skills/foundations-ecosystem"
      tipText={<div className="text-sm text-gray-700">Focused practice for: <span className="font-medium">{mod.title}</span></div>}
      completionLink={`/skills/foundations-ecosystem/modules/${params.moduleId}/completion`}
    />
  );
}
