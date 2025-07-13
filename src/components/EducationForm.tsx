import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Education } from '../types/Resume';

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      graduationDate: '',
      gpa: '',
      honors: ''
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(data.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Education</h2>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No education added yet. Click "Add Education" to get started.</p>
        </div>
      )}

      {data.map((education) => (
        <div key={education.id} className="border border-gray-200 rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-800">Education Entry</h3>
            <button
              onClick={() => removeEducation(education.id)}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution *
              </label>
              <input
                type="text"
                value={education.institution}
                onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="SZABIST University"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Degree *
              </label>
              <input
                type="text"
                value={education.degree}
                onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Bachelor of Arts"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Field of Study *
              </label>
              <input
                type="text"
                value={education.field}
                onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Computer Science"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Graduation Date *
              </label>
              <input
                type="text"
                value={education.graduationDate}
                onChange={(e) => updateEducation(education.id, 'graduationDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="May 2024"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GPA
              </label>
              <input
                type="text"
                value={education.gpa || ''}
                onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="3.8/4.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Honors & Awards
              </label>
              <input
                type="text"
                value={education.honors || ''}
                onChange={(e) => updateEducation(education.id, 'honors', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Certififactes of Excellence"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};