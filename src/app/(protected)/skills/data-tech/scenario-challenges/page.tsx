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
  {
    id: 2,
    question: 'Which task prepares raw data for analysis?',
    options: [
      { id: 'a', text: 'Data cleaning', correct: true },
      { id: 'b', text: 'Final report writing', correct: false },
    ],
    tip: 'Handle missing values, outliers, and inconsistencies early.',
    stepLabel: 'Data Cleaning',
  },
  {
    id: 3,
    question: 'What do you use to understand variable distributions and relationships?',
    options: [
      { id: 'a', text: 'Exploratory Data Analysis (EDA)', correct: true },
      { id: 'b', text: 'Hyperparameter tuning', correct: false },
    ],
    tip: 'Use visualizations and summary stats to learn your data.',
    stepLabel: 'EDA',
  },
  {
    id: 4,
    question: 'Which split helps evaluate model generalization?',
    options: [
      { id: 'a', text: 'Train/test split', correct: true },
      { id: 'b', text: 'Concatenate all data', correct: false },
    ],
    tip: 'Keep a hold-out set the model has not seen.',
    stepLabel: 'Validation Strategy',
  },
  {
    id: 5,
    question: 'Which metric is commonly used for classification accuracy?',
    options: [
      { id: 'a', text: 'Accuracy', correct: true },
      { id: 'b', text: 'Compile time', correct: false },
    ],
    tip: 'Pick metrics that reflect your objective and class balance.',
    stepLabel: 'Evaluation Metrics',
  },
  {
    id: 6,
    question: 'Which method learns patterns from labeled examples?',
    options: [
      { id: 'a', text: 'Supervised learning', correct: true },
      { id: 'b', text: 'Random guessing', correct: false },
    ],
    tip: 'Supervised models need input features and targets.',
    stepLabel: 'Modeling Approach',
  },
  {
    id: 7,
    question: 'Which approach helps models learn from mistakes via rewards?',
    options: [
      { id: 'a', text: 'Reinforcement learning', correct: true },
      { id: 'b', text: 'Data duplication', correct: false },
    ],
    tip: 'Agents interact with an environment to optimize behavior.',
    stepLabel: 'Learning Paradigms',
  },
  {
    id: 8,
    question: 'What technique reuses knowledge from one task on another?',
    options: [
      { id: 'a', text: 'Transfer learning', correct: true },
      { id: 'b', text: 'Manual labeling only', correct: false },
    ],
    tip: 'Fine-tune pre-trained models to save time and data.',
    stepLabel: 'Model Reuse',
  },
  {
    id: 9,
    question: 'What practice documents experiments, metrics, and artifacts?',
    options: [
      { id: 'a', text: 'MLOps experiment tracking', correct: true },
      { id: 'b', text: 'Random file naming', correct: false },
    ],
    tip: 'Track runs to reproduce and compare results reliably.',
    stepLabel: 'Experiment Tracking',
  },
  {
    id: 10,
    question: 'What is a common final step to share outcomes with stakeholders?',
    options: [
      { id: 'a', text: 'Communicate insights', correct: true },
      { id: 'b', text: 'Delete the dataset', correct: false },
    ],
    tip: 'Tell a clear story with visuals, context, and caveats.',
    stepLabel: 'Communication',
  },
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
