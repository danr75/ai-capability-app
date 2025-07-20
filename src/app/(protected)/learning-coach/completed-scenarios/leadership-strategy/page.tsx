"use client";

import { ScenarioMode, ScenarioStep } from '@/components/ui/ScenarioMode';
import { useState, useEffect } from 'react';

// Same scenario steps as scenario-challenges
const scenarioSteps: ScenarioStep[] = [
  {
    id: 1,
    question: 'Your team is starting an AI project. What is the FIRST thing you should do?',
    options: [
      { id: 'a', text: 'Define clear project requirements and scope', correct: true },
      { id: 'b', text: 'Select the AI technology stack', correct: false },
    ],
    tip: 'Always start by clarifying requirements and scope before jumping into technical decisions.',
    stepLabel: 'Clearly Define Project Requirements & Scope',
  },
  {
    id: 2,
    question: 'A stakeholder asks for a feature that increases project risk. What is the best leadership response?',
    options: [
      { id: 'a', text: 'Add the feature immediately to please them', correct: false },
      { id: 'b', text: 'Discuss risks and align on priorities with the stakeholder', correct: true },
    ],
    tip: 'Effective leaders communicate risks and maintain alignment with project priorities.',
    stepLabel: 'Manage Stakeholder Expectations',
  },
  {
    id: 3,
    question: 'Midway through the project, you discover a data quality issue. What should you do first?',
    options: [
      { id: 'a', text: 'Pause development and assess the impact of the data issue', correct: true },
      { id: 'b', text: 'Ignore it and continue to meet deadlines', correct: false },
    ],
    tip: 'Addressing data quality issues early prevents bigger problems later.',
    stepLabel: 'Address Data Quality Early',
  },
  {
    id: 4,
    question: 'Your team is struggling to collaborate effectively. What leadership action is most helpful?',
    options: [
      { id: 'a', text: 'Foster open communication and clarify team roles', correct: true },
      { id: 'b', text: 'Let the team resolve it on their own', correct: false },
    ],
    tip: 'Leaders help teams succeed by clarifying roles and encouraging communication.',
    stepLabel: 'Foster Team Collaboration',
  },
  {
    id: 5,
    question: 'After project delivery, how should you ensure lasting impact?',
    options: [
      { id: 'a', text: 'Collect feedback and measure outcomes against objectives', correct: true },
      { id: 'b', text: 'Move on to the next project immediately', correct: false },
    ],
    tip: 'Measuring impact and gathering feedback ensures continuous improvement.',
    stepLabel: 'Ensure Lasting Impact',
  },
];

export default function CompletedLeadershipScenarioPage() {
  // Force ScenarioMode to completed state by passing all steps as completed
  // We'll use a hack: mount ScenarioMode, then immediately set completedSteps to all IDs
  const [forceComplete, setForceComplete] = useState(false);

  useEffect(() => {
    setForceComplete(true);
  }, []);

  // ScenarioMode will treat all steps as completed if completedSteps.length === steps.length
  // We'll pass a prop to ScenarioMode to support this (need to update ScenarioMode to accept it)
  return (
    <ScenarioMode
      title="Leadership & Strategy"
      objective="Demonstrate your ability to lead successful AI projects."
      steps={scenarioSteps}
      backHref="/learning-coach"
      forceComplete={forceComplete}
    />
  );
}
