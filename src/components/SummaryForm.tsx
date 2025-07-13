import React from 'react';

interface SummaryFormProps {
  data: string;
  onChange: (data: string) => void;
}

export const SummaryForm: React.FC<SummaryFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Professional Summary</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Summary (Optional)
        </label>
        <textarea
          value={data}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="A brief overview of your professional background, key skills, and career objectives. Keep it concise and compelling (2-3 sentences)."
          rows={4}
        />
      </div>

      <div className="text-sm text-gray-600">
        <p><strong>Tip:</strong> Your summary should highlight your most relevant qualifications and what you bring to potential employers.</p>
      </div>
    </div>
  );
};