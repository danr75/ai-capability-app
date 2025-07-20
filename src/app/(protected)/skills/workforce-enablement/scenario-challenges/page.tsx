import { ScenarioMode, ScenarioStep } from '@/components/ui/ScenarioMode';

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

export default function WorkforceEnablementScenarioChallenges() {
  return (
    <ScenarioMode
      title="Workforce Enablement"
      objective="Show your ability to enable teams for AI success."
      steps={scenarioSteps}
      backHref="/skills/workforce-enablement"
    />
  );
}
