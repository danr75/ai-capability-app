import React from "react";

interface ResultCardProps {
  correctCount: number;
  totalCount: number;
  attemptedCount: number;
  onRedo: () => void;
  onNext: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({
  correctCount,
  totalCount,
  attemptedCount,
  onRedo,
  onNext,
}) => (
  <div className="bg-white rounded-lg shadow p-8 text-center">
    <h2 className="text-2xl font-semibold mb-4 text-black">Test Complete!</h2>
    <p className="mb-2 text-black">
      You answered {correctCount} out of {totalCount} correctly.
    </p>
    <p className="mb-6 text-black">
      You attempted {attemptedCount} out of {totalCount} questions.
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
      <button
        className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition-colors shadow-sm"
        type="button"
        onClick={onRedo}
      >
        Redo
      </button>
      <button
        className="bg-[#00C48C] hover:bg-[#00C48C]/90 text-white px-6 py-3 rounded-md font-medium transition-colors shadow-sm"
        type="button"
        onClick={onNext}
      >
        Next
      </button>
    </div>
  </div>
);

export default ResultCard;
