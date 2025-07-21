"use client";

import { ScenarioMode, ScenarioStep } from '@/components/ui/ScenarioMode';
import { useState, useEffect } from 'react';

const scenarioSteps: ScenarioStep[] = [
  {
    id: 1,
    question: 'How can you best prepare your workforce for AI adoption?',
    options: [
      { id: 'a', text: 'Provide targeted training and upskilling', correct: true },
      { id: 'b', text: 'Wait for problems to arise', correct: false },
    ],
    tip: 'Proactive training ensures a smoother transition to AI-powered processes.',
    stepLabel: 'Workforce Preparation',
  },
  // Add more steps as needed
];

export default function CompletedDataTechScenarioPage() {
  const [forceComplete, setForceComplete] = useState(false);
  useEffect(() => setForceComplete(true), []);
  return (
    <ScenarioMode
      title="Data & Tech Capable"
      objective="Demonstrate your technical data and AI skills."
      steps={scenarioSteps}
      backHref="/learning-coach"
      scenarioPath="/learning-coach/completed-scenarios/data-tech"
      forceComplete={forceComplete}
    />
  );
}
