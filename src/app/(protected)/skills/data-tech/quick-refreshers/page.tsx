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
      text: "is an example of an AI capability that learns and adapts from data",
      blank: "___________",
      options: [
        { id: "spam", text: "Email Spam filtering", correct: true },
        { id: "rules", text: "Email Rules", correct: false }
      ],
      explanation: "Email spam filtering uses machine learning to adapt to new patterns.",
      module: "High Risk Use Cases",
      lesson: "AI Applications in Email Security",
      lessonContent: "Email systems handle sensitive communications and personal data. AI spam filters must balance security with privacy, avoiding false positives that could block important messages while protecting against malicious content."
    },
    {
      id: 2,
      text: "is a technique where AI systems learn from labeled examples",
      blank: "___________",
      options: [
        { id: "supervised", text: "Supervised learning", correct: true },
        { id: "unsupervised", text: "Unsupervised learning", correct: false }
      ],
      explanation: "Supervised learning uses labeled data to train models.",
      module: "Model Training Fundamentals",
      lesson: "Machine Learning Approaches"
    },
    {
      id: 3,
      text: "is a type of AI model that processes sequences like text",
      blank: "___________",
      options: [
        { id: "transformer", text: "Transformer", correct: true },
        { id: "cnn", text: "Convolutional Neural Network", correct: false }
      ],
      explanation: "Transformers are designed to handle sequential data like text.",
      module: "Large Language Models Explained",
      lesson: "Neural Network Architectures"
    },
    {
      id: 4,
      text: "is a technique where AI finds patterns in unlabeled data",
      blank: "___________",
      options: [
        { id: "unsupervised", text: "Unsupervised learning", correct: true },
        { id: "reinforcement", text: "Reinforcement learning", correct: false }
      ],
      explanation: "Unsupervised learning discovers patterns without labeled examples."
    },
    {
      id: 5,
      text: "is a common metric used to evaluate classification models",
      blank: "___________",
      options: [
        { id: "accuracy", text: "Accuracy", correct: true },
        { id: "latency", text: "Latency", correct: false }
      ],
      explanation: "Accuracy measures the proportion of correct predictions among total predictions.",
      module: "Evaluating Models",
      lesson: "Classification Metrics"
    },
    {
      id: 6,
      text: "is a method for assessing model performance on unseen data",
      blank: "___________",
      options: [
        { id: "traintest", text: "Train-test split", correct: true },
        { id: "onehot", text: "One-hot encoding", correct: false }
      ],
      explanation: "A train-test split separates data into training and testing sets to evaluate generalization.",
      module: "Evaluating Models",
      lesson: "Validation Strategies"
    },
    {
      id: 7,
      text: "is an AI approach where agents learn through trial and error",
      blank: "___________",
      options: [
        { id: "reinforcement", text: "Reinforcement learning", correct: true },
        { id: "transfer", text: "Transfer learning", correct: false }
      ],
      explanation: "Reinforcement learning involves learning optimal actions through rewards and penalties."
    },
    {
      id: 8,
      text: "is a technique that reuses knowledge from one task to another",
      blank: "___________",
      options: [
        { id: "transfer", text: "Transfer learning", correct: true },
        { id: "federated", text: "Federated learning", correct: false }
      ],
      explanation: "Transfer learning applies knowledge from previously learned tasks to new related ones."
    },
    {
      id: 9,
      text: "is a collaborative ML approach that trains across decentralized devices",
      blank: "___________",
      options: [
        { id: "federated", text: "Federated learning", correct: true },
        { id: "ensemble", text: "Ensemble learning", correct: false }
      ],
      explanation: "Federated learning trains models across multiple devices while keeping data local."
    },
    {
      id: 10,
      text: "is a method that combines multiple models to improve performance",
      blank: "___________",
      options: [
        { id: "ensemble", text: "Ensemble learning", correct: true },
        { id: "active", text: "Active learning", correct: false }
      ],
      explanation: "Ensemble learning uses multiple models to obtain better predictive performance."
    }
  ];

  return (
    <QuickRefresher
      questions={questions}
      skillArea="Data & Tech Capable"
      backLink="/skills/data-tech"
      completionLink="/skills/data-tech/quick-refreshers/completion"
      tipText={
        <>
          <p className="mb-2">Quick tips for Data & Tech concepts:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Focus on understanding core AI/ML concepts and terminology</li>
            <li>Pay attention to different types of machine learning approaches</li>
            <li>Note the practical applications of different AI technologies</li>
          </ul>
        </>
      }
    />
  );
}
