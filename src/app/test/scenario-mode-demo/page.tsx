'use client';

import { ScenarioMode, ScenarioStep } from '@/components/ui/ScenarioMode';

const steps: ScenarioStep[] = [
  {
    id: 1,
    question: "You’ve shortlisted 2-3 promising LLMs. What’s the next practical step?",
    options: [
      { id: 'a', text: 'Select the LLM with the most features listed on its website.', correct: false },
      { id: 'b', text: 'Develop small pilot projects or proof-of-concepts for each shortlisted LLM to test real performance on your specific use cases.', correct: true }
    ],
    tip: 'Define clear success criteria for your pilot tests. Evaluate not just the output quality, but also ease of use, developer experience, and any unexpected challenges.',
    stepLabel: 'Step 1: Clearly Define Project Requirements & Scope'
  },
  {
    id: 2,
    question: "After pilot testing, what should you do next?",
    options: [
      { id: 'a', text: 'Deploy the LLM to all business units immediately.', correct: false },
      { id: 'b', text: 'Research & shortlist potential LLM candidates based on pilot results.', correct: true }
    ],
    tip: 'Carefully analyze pilot outcomes before scaling. Consider not just accuracy, but business fit and integration effort.',
    stepLabel: 'Step 2: Research & Shortlist Potential LLM Candidates'
  },
  {
    id: 3,
    question: "What should you evaluate before scaling up?",
    options: [
      { id: 'a', text: 'Only the cost of the LLM.', correct: false },
      { id: 'b', text: 'Performance, integration, and ongoing support needs.', correct: true }
    ],
    tip: 'A holistic evaluation includes performance, business fit, integration, and support.',
    stepLabel: 'Step 3: Evaluate LLMs for Scale-up'
  },
  {
    id: 4,
    question: "How should you handle unexpected challenges during pilot?",
    options: [
      { id: 'a', text: 'Ignore them and proceed.', correct: false },
      { id: 'b', text: 'Document and address them before next steps.', correct: true }
    ],
    tip: 'Addressing challenges early prevents bigger issues later in deployment.',
    stepLabel: 'Step 4: Address Pilot Challenges'
  },
  {
    id: 5,
    question: "What’s the final step before full deployment?",
    options: [
      { id: 'a', text: 'Skip documentation and launch.', correct: false },
      { id: 'b', text: 'Document lessons learned and finalize deployment plan.', correct: true }
    ],
    tip: 'Documentation and planning ensure a smooth transition to production.',
    stepLabel: 'Step 5: Document and Deploy'
  }
];

export default function ScenarioModeDemo() {
  return (
    <div className="min-h-screen bg-[#F5F8FF] py-10">
      <ScenarioMode
        title="Choosing an LLM for a Project"
        objective="To understand the key factors in selecting an LLM and apply them to a practical decision-making process."
        steps={steps}
        backHref="/test"
      />
    </div>
  );
}
