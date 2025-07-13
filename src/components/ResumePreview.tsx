import React from 'react';
import { ResumeData } from '../types/Resume';

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  return (
    <div id="resume-preview" className="bg-white shadow-lg max-w-4xl mx-auto" style={{ minHeight: '11in', width: '8.5in' }}>
      <div className="p-8 print:p-6">
        {/* Header */}
        <div className="text-center border-b-2 border-gray-900 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {data.personalInfo.name || 'Your Name'}
          </h1>
          <div className="text-sm text-gray-700 space-y-1">
            <div className="flex flex-wrap justify-center gap-4">
              {data.personalInfo.email && (
                <span>{data.personalInfo.email}</span>
              )}
              {data.personalInfo.phone && (
                <span>{data.personalInfo.phone}</span>
              )}
              {data.personalInfo.address && (
                <span>{data.personalInfo.address}</span>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {data.personalInfo.linkedin && (
                <span>{data.personalInfo.linkedin}</span>
              )}
              {data.personalInfo.website && (
                <span>{data.personalInfo.website}</span>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-sm text-gray-800 leading-relaxed">
              {data.summary}
            </p>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400">
              EDUCATION
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {edu.institution}
                    </h3>
                    <div className="text-sm text-gray-800">
                      {edu.degree} in {edu.field}
                      {edu.gpa && ` | GPA: ${edu.gpa}`}
                    </div>
                    {edu.honors && (
                      <div className="text-sm text-gray-700 italic">
                        {edu.honors}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-700 text-right">
                    {edu.graduationDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400">
              EXPERIENCE
            </h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <div className="text-sm font-medium text-gray-800">
                      {exp.company} | {exp.location}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 text-right">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <ul className="text-sm text-gray-800 space-y-1">
                  {exp.description.filter(desc => desc.trim()).map((desc, index) => (
                    <li key={index} className="flex">
                      <span className="mr-2">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400">
              PROJECTS
            </h2>
            {data.projects.map((project) => (
              <div key={project.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900">
                    {project.name}
                    {project.link && (
                      <span className="text-sm font-normal text-blue-600 ml-2">
                        ({project.link})
                      </span>
                    )}
                  </h3>
                  {project.technologies && (
                    <div className="text-sm text-gray-700 italic">
                      {project.technologies}
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-800 leading-relaxed">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400">
              SKILLS
            </h2>
            <div className="text-sm text-gray-800">
              {data.skills.join(' • ')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};