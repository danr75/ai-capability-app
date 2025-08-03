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
      text: "is a leadership approach that emphasizes adapting to AI-driven changes",
      blank: "___________",
      options: [
        { id: "adaptive", text: "Adaptive leadership", correct: true },
        { id: "transactional", text: "Transactional leadership", correct: false }
      ],
      explanation: "Adaptive leadership focuses on flexibility and responsiveness to changing conditions.",
      module: "Leadership & Strategy",
      lesson: "AI-Driven Leadership Approaches",
      lessonContent: "Effective AI leadership requires adapting to rapid technological changes while maintaining strategic vision. Leaders must balance innovation with risk management to guide successful AI transformations."
    },
    {
      id: 2,
      text: "is a strategic framework that aligns AI initiatives with business goals",
      blank: "___________",
      options: [
        { id: "balanced", text: "Balanced scorecard", correct: true },
        { id: "waterfall", text: "Waterfall planning", correct: false }
      ],
      explanation: "The balanced scorecard helps organizations align technology initiatives with strategic objectives."
    },
    {
      id: 3,
      text: "is a decision-making approach that uses AI to inform strategic choices",
      blank: "___________",
      options: [
        { id: "data", text: "Data-driven decision making", correct: true },
        { id: "intuitive", text: "Intuitive decision making", correct: false }
      ],
      explanation: "Data-driven decision making uses analytics and AI insights to guide strategic choices."
    },
    {
      id: 4,
      text: "is a strategic approach that creates new market space with AI innovation",
      blank: "___________",
      options: [
        { id: "blue", text: "Blue ocean strategy", correct: true },
        { id: "red", text: "Red ocean strategy", correct: false }
      ],
      explanation: "Blue ocean strategy focuses on creating uncontested market space through innovation."
    },
    {
      id: 5,
      text: "is a leadership skill essential for guiding teams through AI transformation",
      blank: "___________",
      options: [
        { id: "change", text: "Change management", correct: true },
        { id: "micromanagement", text: "Micromanagement", correct: false }
      ],
      explanation: "Change management helps leaders guide teams through technological transitions."
    }
  ];

  const tipText = (
    <>
      <span className="text-primary font-medium">Skill Tip:</span> Effective AI leadership requires balancing technical understanding with strategic vision. Leaders must foster a culture of innovation while ensuring responsible AI adoption that aligns with organizational values and objectives.
    </>
  );

  return (
    <QuickRefresher
      questions={questions}
      skillArea="Leadership & Strategy"
      backLink="/skills/leadership-strategy"
      tipText={tipText}
      completionLink="/skills/leadership-strategy/quick-refreshers/completion"
    />
  );
}
