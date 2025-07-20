import { ScenarioMode, ScenarioStep } from '@/components/ui/ScenarioMode';

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

export default function AIEthicsScenarioChallenges() {
  return (
    <ScenarioMode
      title="AI Ethics & Responsibility"
      objective="Demonstrate your understanding of ethical AI principles."
      steps={scenarioSteps}
      backHref="/skills/ai-ethics-responsibility"
    />
  );
}
