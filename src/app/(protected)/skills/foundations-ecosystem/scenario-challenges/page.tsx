import { ScenarioMode, ScenarioStep } from '@/components/ui/ScenarioMode';

const scenarioSteps: ScenarioStep[] = [
  {
    id: 1,
    question: 'Why is understanding the AI ecosystem important?',
    options: [
      { id: 'a', text: 'To identify collaboration opportunities', correct: true },
      { id: 'b', text: 'It is not important', correct: false },
    ],
    tip: 'Collaboration within the ecosystem accelerates AI adoption.',
    stepLabel: 'Ecosystem Awareness',
  },
  // Add more steps as needed
];

export default function FoundationsEcosystemScenarioChallenges() {
  return (
    <ScenarioMode
      title="Foundations & Ecosystem"
      objective="Demonstrate your grasp of the AI ecosystem and foundational concepts."
      steps={scenarioSteps}
      backHref="/skills/foundations-ecosystem"
    />
  );
}
