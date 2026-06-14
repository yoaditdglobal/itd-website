"use client";
import { CheckCircle } from "lucide-react";

interface PostSubmissionContentProps {
  onStartOver?: () => void;
  leadType?: string;
}

export default function PostSubmissionContent({ onStartOver }: PostSubmissionContentProps) {
  return (
    <div className="text-center py-12 px-6">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
      </div>
      <h2 className="text-display-md text-gray-900 mb-3">We've received your details</h2>
      <p className="text-gray-500 mb-8 max-w-sm mx-auto">
        Our team will review your shipping profile and reach out with a tailored proposal within one business day.
      </p>
      {onStartOver && (
        <button onClick={onStartOver} className="text-sm text-blue-600 hover:underline">
          Start again
        </button>
      )}
    </div>
  );
}
