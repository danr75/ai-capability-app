"use client";

import { ScenarioMode, ScenarioStep } from '@/components/ui/ScenarioMode';
import { useState, useEffect } from 'react';

const scenarioSteps: ScenarioStep[] = [
  {
    id: 1,
    question: 'What is a core principle of responsible AI?',
    options: [
      { id: 'a', text: 'Transparency', correct: true },
      { id: 'b', text: 'Secrecy', correct: false },
    ],
    tip: 'Transparency is essential for building trust in AI systems.',
    stepLabel: 'Transparency Principle',
  },
  // Add more steps as needed
];

export default function CompletedAIEthicsScenarioPage() {
  const [forceComplete, setForceComplete] = useState(false);
  useEffect(() => setForceComplete(true), []);
  return (
    <ScenarioMode
      title="AI Ethics & Responsibility"
      objective="Demonstrate your understanding of ethical AI principles."
      steps={scenarioSteps}
      backHref="/learning-coach"
      scenarioPath="/learning-coach/completed-scenarios/ai-ethics-responsibility"
      forceComplete={forceComplete}
    />
  );
}
