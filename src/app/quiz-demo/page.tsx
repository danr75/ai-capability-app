"use client";

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

export default function QuizDemo() {
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
      text: "is a measure of how well an AI model performs on new, unseen data",
      blank: "___________",
      options: [
        { id: "generalization", text: "Generalization", correct: true },
        { id: "memorization", text: "Memorization", correct: false }
      ],
      explanation: "Generalization refers to a model's ability to perform well on new data."
    },
    {
      id: 5,
      text: "is a technique used to prevent AI models from overfitting",
      blank: "___________",
      options: [
        { id: "regularization", text: "Regularization", correct: true },
        { id: "amplification", text: "Amplification", correct: false }
      ],
      explanation: "Regularization helps prevent models from memorizing training data."
    },
    {
      id: 6,
      text: "is a type of AI that can generate realistic images from text descriptions",
      blank: "___________",
      options: [
        { id: "diffusion", text: "Diffusion model", correct: true },
        { id: "regression", text: "Regression model", correct: false }
      ],
      explanation: "Diffusion models like DALL-E and Stable Diffusion generate images from text."
    },
    {
      id: 7,
      text: "is a process where AI systems improve through interaction with their environment",
      blank: "___________",
      options: [
        { id: "reinforcement", text: "Reinforcement learning", correct: true },
        { id: "transfer", text: "Transfer learning", correct: false }
      ],
      explanation: "Reinforcement learning involves agents learning from environmental feedback."
    },
    {
      id: 8,
      text: "is a technique where AI models learn to distinguish between real and fake data",
      blank: "___________",
      options: [
        { id: "gan", text: "Generative Adversarial Network", correct: true },
        { id: "autoencoder", text: "Autoencoder", correct: false }
      ],
      explanation: "GANs consist of generator and discriminator networks in competition."
    },
    {
      id: 9,
      text: "is a method where AI systems learn patterns without labeled data",
      blank: "___________",
      options: [
        { id: "unsupervised", text: "Unsupervised learning", correct: true },
        { id: "supervised", text: "Supervised learning", correct: false }
      ],
      explanation: "Unsupervised learning finds patterns in unlabeled data."
    },
    {
      id: 10,
      text: "is a technique where AI models learn to represent data in lower dimensions",
      blank: "___________",
      options: [
        { id: "dimensionality", text: "Dimensionality reduction", correct: true },
        { id: "augmentation", text: "Data augmentation", correct: false }
      ],
      explanation: "Dimensionality reduction compresses data while preserving important features."
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [progressDots, setProgressDots] = useState<number[]>(Array(14).fill(0).map((_, i) => i + 1));
  
  const currentQuestion = questions[currentQuestionIndex];
  
  // Handle keyboard number selection (1 or 2)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't allow changing answers for already answered questions
      if (answeredQuestions.includes(currentQuestionIndex)) {
        return;
      }
      
      if (e.key === '1') {
        setSelectedOption(currentQuestion.options[0].id);
        setIsChecked(false);
      } else if (e.key === '2') {
        setSelectedOption(currentQuestion.options[1].id);
        setIsChecked(false);
      } else if (e.key === 'Enter' && selectedOption) {
        handleCheck();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOption, currentQuestion, answeredQuestions, currentQuestionIndex]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setIsChecked(false);
    setIsCorrect(false);
  };

  const handleCheck = () => {
    if (!selectedOption) return;
    
    const selectedOptionObj = currentQuestion.options.find(opt => opt.id === selectedOption);
    const isAnswerCorrect = selectedOptionObj?.correct || false;
    
    setIsChecked(true);
    setIsCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      // Add this question to answered questions if not already there
      if (!answeredQuestions.includes(currentQuestionIndex)) {
        setAnsweredQuestions(prev => [...prev, currentQuestionIndex]);
      }
      
      // Wait 1 second, then move to next question
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          const nextIndex = currentQuestionIndex + 1;
          setCurrentQuestionIndex(nextIndex);
          setSelectedOption(null);
          setIsChecked(false);
          setIsCorrect(false);
          
          // Update max question reached if moving to a new question
          if (nextIndex > maxQuestionReached) {
            setMaxQuestionReached(nextIndex);
          }
          
          // Update progress dots
          setProgressDots(prev => {
            const newDots = [...prev];
            if (nextIndex < newDots.length) {
              newDots[nextIndex] = nextIndex + 1;
            }
            return newDots;
          });
        }
      }, 1000);
    } else {
      // For incorrect answers, wait 1 second and reset to allow selecting again
      setTimeout(() => {
        setIsChecked(false);
        setSelectedOption(null);
      }, 1000);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      
      // For previously answered questions, show the correct answer
      if (answeredQuestions.includes(currentQuestionIndex - 1)) {
        const correctOption = questions[currentQuestionIndex - 1].options.find(opt => opt.correct);
        if (correctOption) {
          setSelectedOption(correctOption.id);
          setIsChecked(true);
          setIsCorrect(true);
        }
      } else {
        setSelectedOption(null);
        setIsChecked(false);
        setIsCorrect(false);
      }
    }
  };

  const handleNextQuestion = () => {
    // Can only go forward to questions that have been reached before
    if (currentQuestionIndex < maxQuestionReached) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      
      // For previously answered questions, show the correct answer
      if (answeredQuestions.includes(currentQuestionIndex + 1)) {
        const correctOption = questions[currentQuestionIndex + 1].options.find(opt => opt.correct);
        if (correctOption) {
          setSelectedOption(correctOption.id);
          setIsChecked(true);
          setIsCorrect(true);
        }
      } else {
        setSelectedOption(null);
        setIsChecked(false);
        setIsCorrect(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress bar at top */}
        <div className="mb-8 relative">
          <div className="bg-blue-50 rounded-lg p-4 flex items-center justify-center">
            <div className="flex items-center space-x-4">
              {/* Left arrow */}
              <button 
                className={`text-primary hover:text-primary/80 transition-colors ${
                  currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Progress dots */}
              <div className="flex space-x-2">
                {progressDots.map((_, index) => (
                  <div 
                    key={index} 
                    className={`w-6 h-2 rounded-full ${
                      index <= currentQuestionIndex ? 'bg-purple-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              
              {/* Right arrow */}
              <button 
                className={`text-primary hover:text-primary/80 transition-colors ${
                  currentQuestionIndex >= maxQuestionReached ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex >= maxQuestionReached}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Learning tip */}
        <div className="mb-8">
          <p className="text-lg text-center mb-4">
            <span className="text-primary font-bold">AI learns and adapts from data</span>, like spam filters detecting evolving patterns.
            In contrast, email rules are static, moving messages based on fixed keywords
            without learning or adapting.
          </p>
        </div>

        {/* Question box */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <div className="mb-4 text-center">
            <span className="bg-[#B681FC] text-white px-3 py-1 rounded">
              {selectedOption 
                ? currentQuestion.options.find(opt => opt.id === selectedOption)?.text 
                : currentQuestion.blank}
            </span>
            <span className="ml-2">{currentQuestion.text}</span>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {currentQuestion.options.map((option, index) => (
            <div 
              key={option.id}
              className={`border rounded-lg p-4 flex items-center cursor-pointer transition-all ${
                selectedOption === option.id && isChecked && option.correct ? 'bg-[#00C48C] border-[#00C48C]/70 text-white font-bold' : 
                selectedOption === option.id && isChecked && !option.correct ? 'bg-[#FF5A5F] border-[#FF5A5F]/70 text-white font-bold' :
                selectedOption === option.id ? 'bg-[#4F8BFF] border-[#4F8BFF]/70 text-white' : 
                'border-gray-300 hover:border-[#2158F4] hover:shadow-sm'
              }`}
              onClick={() => {
                // Don't allow changing answers for already answered questions
                if (!answeredQuestions.includes(currentQuestionIndex)) {
                  handleOptionSelect(option.id);
                }
              }}
            >
              <span className={`${selectedOption === option.id ? 'bg-white text-[#4F8BFF]' : 'bg-[#B681FC] text-white'} px-2 py-1 rounded-full mr-2 font-medium transition-colors`}>{index + 1}</span>
              <span>{option.text}</span>
            </div>
          ))}
        </div>

        {/* Check button */}
        <div className="flex justify-center">
          <button
            onClick={handleCheck}
            disabled={!selectedOption || answeredQuestions.includes(currentQuestionIndex)}
            className={`bg-[#B681FC] text-white px-8 py-2 rounded-lg font-medium transition-colors ${
              !selectedOption || answeredQuestions.includes(currentQuestionIndex) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#B681FC]/90 shadow-sm'
            }`}
          >
            Check
          </button>
        </div>
      </div>
    </div>
  );
}
