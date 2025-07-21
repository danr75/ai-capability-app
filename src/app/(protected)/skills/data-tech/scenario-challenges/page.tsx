import { ScenarioMode, ScenarioStep } from '@/components/ui/ScenarioMode';

const scenarioSteps: ScenarioStep[] = [
  {
    id: 1,
    question: 'What is the first step in a data analysis project?',
    options: [
      { id: 'a', text: 'Define the problem', correct: true },
      { id: 'b', text: 'Build the model', correct: false },
    ],
    tip: 'Always start by defining the problem you want to solve.',
    stepLabel: 'Problem Definition',
  },
  // Add more steps as needed
];

export default function DataTechScenarioChallenges() {
  return (
    <ScenarioMode
      title="Data & Tech Capable"
      objective="Demonstrate your technical data and AI skills."
      steps={scenarioSteps}
      backHref="/skills/data-tech"
      scenarioPath="/learning-coach/completed-scenarios/data-tech"
    />
  );
}
