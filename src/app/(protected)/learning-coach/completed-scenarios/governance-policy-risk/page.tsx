"use client";

import { ScenarioMode, ScenarioStep } from '@/components/ui/ScenarioMode';
import { useState, useEffect } from 'react';

const scenarioSteps: ScenarioStep[] = [
  {
    id: 1,
    question: 'What is a key consideration in AI governance?',
    options: [
      { id: 'a', text: 'Compliance with regulations', correct: true },
      { id: 'b', text: 'Ignoring risk', correct: false },
    ],
    tip: 'Compliance ensures responsible and lawful use of AI.',
    stepLabel: 'Regulatory Compliance',
  },
  // Add more steps as needed
];

export default function CompletedGovernancePolicyRiskScenarioPage() {
  const [forceComplete, setForceComplete] = useState(false);
  useEffect(() => setForceComplete(true), []);
  return (
    <ScenarioMode
      title="Governance, Policy & Risk"
      objective="Demonstrate your understanding of AI governance and risk management."
      steps={scenarioSteps}
      backHref="/learning-coach"
      scenarioPath="/learning-coach/completed-scenarios/governance-policy-risk"
      forceComplete={forceComplete}
    />
  );
}
