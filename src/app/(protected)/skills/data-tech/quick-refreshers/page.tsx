"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

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
  // Track which questions have been answered correctly
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  // Track the furthest question the user has reached
  const [maxQuestionReached, setMaxQuestionReached] = useState<number>(0);
  
  const questions: Question[] = [
    {
      id: 1,
      text: "is an example of an AI capability that learns and adapts from data",
      blank: "___________",
      options: [
        { id: "spam", text: "Email Spam filtering", correct: true },
        { id: "rules", text: "Email Rules", correct: false }
      ],
      explanation: "Email spam filtering uses machine learning to adapt to new patterns."
    },
    {
      id: 2,
      text: "is a technique where AI systems learn from labeled examples",
      blank: "___________",
      options: [
        { id: "supervised", text: "Supervised learning", correct: true },
        { id: "unsupervised", text: "Unsupervised learning", correct: false }
      ],
      explanation: "Supervised learning uses labeled data to train models."
    },
    {
      id: 3,
      text: "is a type of AI model that processes sequences like text",
      blank: "___________",
      options: [
        { id: "transformer", text: "Transformer", correct: true },
        { id: "cnn", text: "Convolutional Neural Network", correct: false }
      ],
      explanation: "Transformers are designed to handle sequential data like text."
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

  const tipText = (
    <>
      <span className="text-primary font-medium">Skill Tip:</span> This quick refresher helps reinforce key concepts in Data & Tech. Take your time to understand each question before answering.
    </>
  );

  return (
    <QuickRefresher
      questions={questions}
      skillArea="Data & Tech"
      backLink="/skills/data-tech"
      tipText={tipText}
      completionLink="/skills/data-tech/quick-refreshers/completion"
    />
  );
}
