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
      text: "is a core ethical principle requiring AI systems to be free from unfair bias",
      blank: "___________",
      options: [
        { id: "fairness", text: "Fairness", correct: true },
        { id: "efficiency", text: "Efficiency", correct: false }
      ],
      explanation: "Fairness ensures AI systems don't discriminate against certain groups."
    },
    {
      id: 2,
      text: "is the ethical principle that requires AI systems to protect user data",
      blank: "___________",
      options: [
        { id: "privacy", text: "Privacy", correct: true },
        { id: "utility", text: "Utility", correct: false }
      ],
      explanation: "Privacy ensures AI systems handle personal data responsibly and securely."
    },
    {
      id: 3,
      text: "is the ability to understand and explain how AI systems make decisions",
      blank: "___________",
      options: [
        { id: "explainability", text: "Explainability", correct: true },
        { id: "efficiency", text: "Efficiency", correct: false }
      ],
      explanation: "Explainability allows humans to understand and trust AI decision-making processes."
    },
    {
      id: 4,
      text: "is the ethical principle that holds organizations accountable for their AI systems",
      blank: "___________",
      options: [
        { id: "accountability", text: "Accountability", correct: true },
        { id: "profitability", text: "Profitability", correct: false }
      ],
      explanation: "Accountability ensures organizations take responsibility for their AI systems' impacts."
    },
    {
      id: 5,
      text: "is a process to identify and mitigate potential harms from AI systems",
      blank: "___________",
      options: [
        { id: "assessment", text: "Ethical impact assessment", correct: true },
        { id: "marketing", text: "Market assessment", correct: false }
      ],
      explanation: "Ethical impact assessments help identify and address potential negative consequences of AI systems."
    },
    {
      id: 6,
      text: "is the principle that AI systems should be understandable to those affected by their decisions",
      blank: "___________",
      options: [
        { id: "transparency", text: "Transparency", correct: true },
        { id: "scalability", text: "Scalability", correct: false }
      ],
      explanation: "Transparency ensures that AI systems' operations and decision-making processes are clear and understandable."
    },
    {
      id: 7,
      text: "is the concept that AI systems should be designed to benefit all of humanity",
      blank: "___________",
      options: [
        { id: "beneficence", text: "Beneficence", correct: true },
        { id: "efficiency", text: "Efficiency", correct: false }
      ],
      explanation: "Beneficence emphasizes that AI should be developed and used for the greater good of all people."
    },
    {
      id: 8,
      text: "is the ethical principle that requires AI systems to avoid causing harm",
      blank: "___________",
      options: [
        { id: "non-maleficence", text: "Non-maleficence", correct: true },
        { id: "autonomy", text: "Autonomy", correct: false }
      ],
      explanation: "Non-maleficence is the principle of 'do no harm' applied to AI systems."
    },
    {
      id: 9,
      text: "is the principle that AI systems should respect human autonomy and decision-making",
      blank: "___________",
      options: [
        { id: "respect-for-persons", text: "Respect for Persons", correct: true },
        { id: "utility", text: "Utility", correct: false }
      ],
      explanation: "This principle ensures that AI supports and enhances human agency rather than replacing or diminishing it."
    },
    {
      id: 10,
      text: "is the ethical framework that focuses on the outcomes and consequences of AI systems",
      blank: "___________",
      options: [
        { id: "consequentialism", text: "Consequentialism", correct: true },
        { id: "deontology", text: "Deontology", correct: false }
      ],
      explanation: "Consequentialism evaluates AI systems based on their outcomes and impacts on stakeholders."
    }
  ];

  const tipText = (
    <>
      <span className="text-primary font-medium">Ethical AI</span> requires organizations to consider fairness, privacy, transparency, and accountability
      throughout the AI lifecycle. Responsible AI practices help build trust with users and stakeholders
      while mitigating potential harms.
    </>
  );

  return (
    <QuickRefresher
      questions={questions}
      skillArea="AI Ethics & Responsibility"
      backLink="/skills/ai-ethics-responsibility"
      tipText={tipText}
      completionLink="/skills/ai-ethics-responsibility/quick-refreshers/completion"
    />
  );
}
