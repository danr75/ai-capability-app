'use client';

import { useRouter } from 'next/navigation';
import LabMode from "@/components/ui/LabMode";

export default function LabModeTestPage() {
  const router = useRouter();

  const handleBack = () => {
    console.log('Back button clicked');
    router.back();
  };

  const handleSelect = (optionId: string) => {
    console.log('Selected option:', optionId);
  };

  const handleSubmit = (optionId: string) => {
    console.log('Form submitted with option:', optionId);
    // In a real app, you would navigate to the next step or show a success message
    alert(`Option ${optionId} submitted successfully!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <LabMode 
        title="Learning Coach"
        question="Which of the following best describes your current understanding of this topic?"
        currentStep={1}
        totalSteps={10}
        onBack={handleBack}
        onSelect={handleSelect}
        onSubmit={handleSubmit}
        options={[
          {
            id: "beginner",
            title: "Beginner",
            description: "I'm new to this topic and just starting to learn."
          },
          {
            id: "intermediate",
            title: "Intermediate",
            description: "I have some knowledge but want to learn more."
          },
          {
            id: "advanced",
            title: "Advanced",
            description: "I'm comfortable with this topic and ready for advanced concepts."
          }
        ]}
      />
    </div>
  );
}
