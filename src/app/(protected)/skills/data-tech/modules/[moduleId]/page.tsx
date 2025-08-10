"use client";

import { ModuleLearn } from '@/components/ui';

// Minimal question seed typed to ModuleLearn.Question
import type { Question } from '@/components/ui/ModuleLearn';

const MODULES: Record<string, { title: string; questions: Question[] }> = {
  "4": {
    title: "Data Pipeline Architecture",
    questions: [
      {
        id: 1,
        text: "is the component that temporarily stores incoming events before processing.",
        blank: "_______",
        options: [
          { id: 'a', text: 'Message queue', correct: true },
          { id: 'b', text: 'Feature store', correct: false }
        ],
        explanation: 'Queues (e.g., Kafka) buffer data to decouple producers and consumers in pipelines.',
        module: 'Data Pipeline Architecture',
        lesson: 'Ingestion & Buffering',
        lessonContent: 'Event ingestion often uses a queue to buffer spikes and ensure reliable downstream processing.'
      },
      {
        id: 2,
        text: "aggregates and serves derived columns for batch and real‑time model inputs.",
        blank: "_______",
        options: [
          { id: 'b', text: 'Feature store', correct: true },
          { id: 'c', text: 'Vector database', correct: false }
        ],
        explanation: 'A feature store standardizes feature computation and access across training and serving.',
        module: 'Data Pipeline Architecture',
        lesson: 'Transform & Feature Management',
        lessonContent: 'Consistent features reduce training/serving skew and speed up experimentation.'
      },
      {
        id: 3,
        text: "helps ensure end‑to‑end lineage, data contracts, and SLAs across stages.",
        blank: "_______",
        options: [
          { id: 'a', text: 'Orchestration', correct: true },
          { id: 'b', text: 'Visualization', correct: false }
        ],
        explanation: 'Tools like Airflow or Dagster orchestrate tasks, manage dependencies, and monitor SLAs.',
        module: 'Data Pipeline Architecture',
        lesson: 'Scheduling & Governance',
        lessonContent: 'Orchestration coordinates jobs, retries, alerts, and lineage for reliable pipelines.'
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
          <a href="/skills/data-tech" className="text-primary hover:underline">Back to Data & Tech</a>
        </div>
      </div>
    );
  }

  return (
    <ModuleLearn
      title={mod.title}
      questions={mod.questions}
      skillArea="Data & Tech"
      backLink="/skills/data-tech"
      tipText={<div className="text-sm text-gray-700">Focused practice for: <span className="font-medium">{mod.title}</span></div>}
      completionLink={`/skills/data-tech/modules/${params.moduleId}/completion`}
    />
  );
}
