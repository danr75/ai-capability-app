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
      text: "is a key approach to prepare employees for AI adoption",
      blank: "___________",
      options: [
        { id: "upskilling", text: "Upskilling", correct: true },
        { id: "outsourcing", text: "Outsourcing", correct: false }
      ],
      explanation: "Upskilling helps employees develop new competencies for the AI era."
    },
    {
      id: 2,
      text: "is a collaborative approach where humans and AI systems work together",
      blank: "___________",
      options: [
        { id: "augmentation", text: "AI augmentation", correct: true },
        { id: "automation", text: "Full automation", correct: false }
      ],
      explanation: "AI augmentation combines human expertise with AI capabilities for better outcomes."
    },
    {
      id: 3,
      text: "is a key skill for employees to effectively work with AI systems",
      blank: "___________",
      options: [
        { id: "literacy", text: "AI literacy", correct: true },
        { id: "programming", text: "Advanced programming", correct: false }
      ],
      explanation: "AI literacy helps employees understand and interact effectively with AI technologies."
    },
    {
      id: 4,
      text: "is essential for creating a workforce ready for AI integration",
      blank: "___________",
      options: [
        { id: "culture", text: "Continuous learning culture", correct: true },
        { id: "hierarchy", text: "Rigid hierarchy", correct: false }
      ],
      explanation: "A continuous learning culture encourages ongoing skill development and adaptation."
    },
    {
      id: 5,
      text: "is a framework for managing workforce transitions in the AI era",
      blank: "___________",
      options: [
        { id: "transformation", text: "Workforce transformation", correct: true },
        { id: "replacement", text: "Job replacement", correct: false }
      ],
      explanation: "Workforce transformation focuses on evolving job roles and skills rather than replacement."
    }
  ];

  const tipText = (
    <>
      <span className="text-primary font-medium">Skill Tip:</span> Workforce enablement focuses on equipping employees with the skills and tools they need to work effectively with AI. It's not about replacing humans, but rather augmenting human capabilities through AI collaboration.
    </>
  );

  return (
    <QuickRefresher
      questions={questions}
      skillArea="Workforce Enablement"
      backLink="/skills/workforce-enablement"
      tipText={tipText}
      completionLink="/skills/workforce-enablement/quick-refreshers/completion"
    />
  );
}
