import { useState } from 'react';
import { ResumeData, PersonalInfo, Education, Experience, Project } from '../types/Resume';

const initialPersonalInfo: PersonalInfo = {
  name: '',
  email: '',
  phone: '',
  address: '',
  linkedin: '',
  website: ''
};

const initialResumeData: ResumeData = {
  personalInfo: initialPersonalInfo,
  summary: '',
  education: [],
  experience: [],
  skills: [],
  projects: []
};

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  const updatePersonalInfo = (personalInfo: PersonalInfo) => {
    setResumeData(prev => ({ ...prev, personalInfo }));
  };

  const updateSummary = (summary: string) => {
    setResumeData(prev => ({ ...prev, summary }));
  };

  const updateEducation = (education: Education[]) => {
    setResumeData(prev => ({ ...prev, education }));
  };

  const updateExperience = (experience: Experience[]) => {
    setResumeData(prev => ({ ...prev, experience }));
  };

  const updateSkills = (skills: string[]) => {
    setResumeData(prev => ({ ...prev, skills }));
  };

  const updateProjects = (projects: Project[]) => {
    setResumeData(prev => ({ ...prev, projects }));
  };

  return {
    resumeData,
    updatePersonalInfo,
    updateSummary,
    updateEducation,
    updateExperience,
    updateSkills,
    updateProjects
  };
};