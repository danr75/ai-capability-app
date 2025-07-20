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
};

export default function QuickRefreshersPage() {
  const questions: Question[] = [
    {
      id: 1,
      text: "is a foundational AI concept that enables machines to learn from data",
      blank: "___________",
      options: [
        { id: "ml", text: "Machine learning", correct: true },
        { id: "automation", text: "Automation", correct: false }
      ],
      explanation: "Machine learning is the core technology that allows AI systems to learn from data."
    },
    {
      id: 2,
      text: "is a type of neural network that powers modern language models",
      blank: "___________",
      options: [
        { id: "transformer", text: "Transformer architecture", correct: true },
        { id: "cnn", text: "Convolutional Neural Network", correct: false }
      ],
      explanation: "Transformer architecture revolutionized natural language processing with attention mechanisms."
    },
    {
      id: 3,
      text: "is a key infrastructure component for training large AI models",
      blank: "___________",
      options: [
        { id: "gpu", text: "GPU clusters", correct: true },
        { id: "cpu", text: "CPU servers", correct: false }
      ],
      explanation: "GPU clusters provide the parallel processing power needed for training large AI models."
    },
    {
      id: 4,
      text: "is a framework that helps organizations assess their AI maturity",
      blank: "___________",
      options: [
        { id: "maturity", text: "AI maturity model", correct: true },
        { id: "capability", text: "Capability assessment", correct: false }
      ],
      explanation: "AI maturity models help organizations benchmark and improve their AI capabilities."
    },
    {
      id: 5,
      text: "is a collaborative approach to AI development involving multiple stakeholders",
      blank: "___________",
      options: [
        { id: "ecosystem", text: "AI ecosystem", correct: true },
        { id: "platform", text: "AI platform", correct: false }
      ],
      explanation: "AI ecosystems involve diverse stakeholders collaborating on AI development and implementation."
    }
  ];

  const tipText = (
    <>
      <span className="text-primary font-medium">Skill Tip:</span> Machine learning enables AI to learn from data and improve over time, while traditional automation follows fixed rules without adaptation. This distinction is crucial for understanding AI's potential and limitations.
    </>
  );

  return (
    <QuickRefresher
      questions={questions}
      skillArea="Foundations & Ecosystem"
      backLink="/skills/foundations-ecosystem"
      tipText={tipText}
      completionLink="/skills/foundations-ecosystem/quick-refreshers/completion"
    />
  );
}
