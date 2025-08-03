"use client";

import QuickRefresher from '@/components/ui/QuickRefresher';

type Question = {
  id: number;
  text: string;
  blank: string;
  options: {
    id: string;
    text: string;
    correct: boolean;
  }[];
  explanation: string;
  module?: string;
  lesson?: string;
  lessonContent?: string;
};

export default function QuickRefreshersPage() {
  const questions: Question[] = [
    {
      id: 1,
      text: "is a framework that ensures AI systems are developed and used responsibly",
      blank: "___________",
      options: [
        { id: "governance", text: "AI governance", correct: true },
        { id: "agile", text: "Agile methodology", correct: false }
      ],
      explanation: "AI governance provides oversight and accountability for AI systems."
    },
    {
      id: 2,
      text: "is a principle that requires AI systems to explain their decisions",
      blank: "___________",
      options: [
        { id: "explainability", text: "Explainability", correct: true },
        { id: "efficiency", text: "Efficiency", correct: false }
      ],
      explanation: "Explainability ensures AI decisions can be understood by humans."
    },
    {
      id: 3,
      text: "is a regulatory approach that requires organizations to assess AI impact",
      blank: "___________",
      options: [
        { id: "impact", text: "AI impact assessment", correct: true },
        { id: "audit", text: "Financial audit", correct: false }
      ],
      explanation: "AI impact assessments evaluate potential risks and benefits of AI systems."
    },
    {
      id: 4,
      text: "is a key component of AI risk management",
      blank: "___________",
      options: [
        { id: "monitoring", text: "Continuous monitoring", correct: true },
        { id: "development", text: "Rapid development", correct: false }
      ],
      explanation: "Continuous monitoring helps identify and address AI risks throughout the system lifecycle."
    },
    {
      id: 5,
      text: "is a principle ensuring AI respects individual rights and freedoms",
      blank: "___________",
      options: [
        { id: "ethics", text: "AI ethics", correct: true },
        { id: "scalability", text: "Scalability", correct: false }
      ],
      explanation: "AI ethics ensures systems respect human rights, diversity, and democratic values."
    }
  ];

  const tipText = (
    <>
      <span className="text-primary font-medium">Skill Tip:</span> AI governance establishes accountability and oversight for AI systems, while traditional IT governance focuses on managing technology infrastructure. Effective AI governance addresses unique challenges like algorithmic bias, data privacy, and ethical considerations.
    </>
  );

  return (
    <QuickRefresher
      questions={questions}
      skillArea="Governance, Policy & Risk"
      backLink="/skills/governance-policy-risk"
      tipText={tipText}
      completionLink="/skills/governance-policy-risk/quick-refreshers/completion"
    />
  );
}
