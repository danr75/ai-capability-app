export interface SpeedTestQuestion {
  id: string;
  question: string;
  correctAnswer: 'yes' | 'no';
  capabilityArea: string;
}

export const speedTestQuestions: Record<string, SpeedTestQuestion[]> = {
  'data-tech': [
    {
      id: 'dt1',
      question: 'Is Python the most commonly used language for data science and machine learning?',
      correctAnswer: 'yes',
      capabilityArea: 'data-tech'
    },
    {
      id: 'dt2',
      question: 'Does a neural network always require labeled data for training?',
      correctAnswer: 'no',
      capabilityArea: 'data-tech'
    },
    {
      id: 'dt3',
      question: 'Is SQL used for working with relational databases?',
      correctAnswer: 'yes',
      capabilityArea: 'data-tech'
    },
    {
      id: 'dt4',
      question: 'Is "overfitting" a desirable outcome in machine learning models?',
      correctAnswer: 'no',
      capabilityArea: 'data-tech'
    },
    {
      id: 'dt5',
      question: 'Can data visualization help in identifying patterns in large datasets?',
      correctAnswer: 'yes',
      capabilityArea: 'data-tech'
    },
    {
      id: 'dt6',
      question: 'Is "big data" only about the volume of data?',
      correctAnswer: 'no',
      capabilityArea: 'data-tech'
    },
    {
      id: 'dt7',
      question: 'Is a confusion matrix used to evaluate classification models?',
      correctAnswer: 'yes',
      capabilityArea: 'data-tech'
    },
    {
      id: 'dt8',
      question: 'Does feature scaling affect all machine learning algorithms?',
      correctAnswer: 'no',
      capabilityArea: 'data-tech'
    },
    {
      id: 'dt9',
      question: 'Is cross-validation used to assess model performance?',
      correctAnswer: 'yes',
      capabilityArea: 'data-tech'
    },
    {
      id: 'dt10',
      question: 'Is deep learning always better than traditional machine learning?',
      correctAnswer: 'no',
      capabilityArea: 'data-tech'
    }
  ],
  'ai-ethics': [
    {
      id: 'ae1',
      question: 'Is transparency important in AI decision-making processes?',
      correctAnswer: 'yes',
      capabilityArea: 'ai-ethics'
    },
    {
      id: 'ae2',
      question: 'Is it ethical to use AI for automated hiring without human oversight?',
      correctAnswer: 'no',
      capabilityArea: 'ai-ethics'
    },
    {
      id: 'ae3',
      question: 'Should AI systems be designed to respect user privacy?',
      correctAnswer: 'yes',
      capabilityArea: 'ai-ethics'
    },
    {
      id: 'ae4',
      question: 'Is it acceptable to deploy AI systems without testing for bias?',
      correctAnswer: 'no',
      capabilityArea: 'ai-ethics'
    },
    {
      id: 'ae5',
      question: 'Should AI systems be explainable to their users?',
      correctAnswer: 'yes',
      capabilityArea: 'ai-ethics'
    },
    {
      id: 'ae6',
      question: 'Is it ethical to use AI for deepfake creation without consent?',
      correctAnswer: 'no',
      capabilityArea: 'ai-ethics'
    },
    {
      id: 'ae7',
      question: 'Should AI development consider potential societal impacts?',
      correctAnswer: 'yes',
      capabilityArea: 'ai-ethics'
    },
    {
      id: 'ae8',
      question: 'Is it acceptable to use AI for mass surveillance without regulation?',
      correctAnswer: 'no',
      capabilityArea: 'ai-ethics'
    },
    {
      id: 'ae9',
      question: 'Should AI systems be designed to be fair and unbiased?',
      correctAnswer: 'yes',
      capabilityArea: 'ai-ethics'
    },
    {
      id: 'ae10',
      question: 'Can AI systems make completely objective decisions?',
      correctAnswer: 'no',
      capabilityArea: 'ai-ethics'
    }
  ],
  'default': [
    {
      id: 'gen1',
      question: 'Is AI becoming increasingly important in modern technology?',
      correctAnswer: 'yes',
      capabilityArea: 'general'
    },
    {
      id: 'gen2',
      question: 'Can AI completely replace human intelligence?',
      correctAnswer: 'no',
      capabilityArea: 'general'
    },
    {
      id: 'gen3',
      question: 'Is machine learning a subset of artificial intelligence?',
      correctAnswer: 'yes',
      capabilityArea: 'general'
    },
    {
      id: 'gen4',
      question: 'Do all AI systems require an internet connection to function?',
      correctAnswer: 'no',
      capabilityArea: 'general'
    },
    {
      id: 'gen5',
      question: 'Is natural language processing a branch of AI?',
      correctAnswer: 'yes',
      capabilityArea: 'general'
    },
    {
      id: 'gen6',
      question: 'Is AI the same as automation?',
      correctAnswer: 'no',
      capabilityArea: 'general'
    },
    {
      id: 'gen7',
      question: 'Can AI be used for medical diagnosis?',
      correctAnswer: 'yes',
      capabilityArea: 'general'
    },
    {
      id: 'gen8',
      question: 'Is AI only useful for large corporations?',
      correctAnswer: 'no',
      capabilityArea: 'general'
    },
    {
      id: 'gen9',
      question: 'Is computer vision a field of AI?',
      correctAnswer: 'yes',
      capabilityArea: 'general'
    },
    {
      id: 'gen10',
      question: 'Can AI understand human emotions perfectly?',
      correctAnswer: 'no',
      capabilityArea: 'general'
    }
  ]
};

export const DEFAULT_TIME_PER_QUESTION = 15; // 15 seconds per question

export const getQuestionsForCapability = (capability: string): SpeedTestQuestion[] => {
  return speedTestQuestions[capability] || speedTestQuestions['default'];
};
