import React, { useState } from "react";
import {
  FileText,
  Download,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useResumeData } from "./hooks/useResumeData";
import { PersonalInfoForm } from "./components/PersonalInfoForm";
import { SummaryForm } from "./components/SummaryForm";
import { EducationForm } from "./components/EducationForm";
import { ExperienceForm } from "./components/ExperienceForm";
import { SkillsForm } from "./components/SkillsForm";
import { ProjectsForm } from "./components/ProjectsForm";
import { ResumePreview } from "./components/ResumePreview";
import { generatePDF } from "./utils/pdfGenerator";

const steps = [
  { id: "personal", title: "Personal Info", component: PersonalInfoForm },
  { id: "summary", title: "Summary", component: SummaryForm },
  { id: "education", title: "Education", component: EducationForm },
  { id: "experience", title: "Experience", component: ExperienceForm },
  { id: "skills", title: "Skills", component: SkillsForm },
  { id: "projects", title: "Projects", component: ProjectsForm },
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const {
    resumeData,
    updatePersonalInfo,
    updateSummary,
    updateEducation,
    updateExperience,
    updateSkills,
    updateProjects,
  } = useResumeData();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDownloadPDF = () => {
    generatePDF(resumeData);
  };

  const getCurrentFormProps = () => {
    switch (steps[currentStep].id) {
      case "personal":
        return { data: resumeData.personalInfo, onChange: updatePersonalInfo };
      case "summary":
        return { data: resumeData.summary, onChange: updateSummary };
      case "education":
        return { data: resumeData.education, onChange: updateEducation };
      case "experience":
        return { data: resumeData.experience, onChange: updateExperience };
      case "skills":
        return { data: resumeData.skills, onChange: updateSkills };
      case "projects":
        return { data: resumeData.projects, onChange: updateProjects };
      default:
        return {};
    }
  };

  const CurrentFormComponent = steps[currentStep].component;

  return (
    <>

      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Gradient Background */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #10b981 100%)",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Header */}
        <div className="z-10 ">
          <header className="bg-white/70 backdrop-blur-md z-30 shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <FileText className="w-8 h-8 text-blue-600 mr-3" />
                  <h1 className="text-2xl font-bold text-gray-900">Resumagic</h1>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Menu className="w-4 h-4" />
                    {showPreview ? "Edit" : "Preview"}
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </header>

          <div className="max-w-full  mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              {/* Form Section */}
              <div
                className={`lg:col-span-5 ${showPreview ? "hidden lg:block" : ""}`}
              >
                <div className="bg-white rounded-lg shadow-lg p-6">
                  {/* Progress Steps */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Step {currentStep + 1} of {steps.length}
                      </h2>
                      <span className="text-sm text-gray-500">
                        {Math.round(((currentStep + 1) / steps.length) * 100)}%
                        Complete
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${((currentStep + 1) / steps.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2">
                      {steps.map((step, index) => (
                        <button
                          key={step.id}
                          onClick={() => setCurrentStep(index)}
                          className={`text-xs px-2 py-1 rounded ${index <= currentStep
                            ? "bg-blue-100 text-blue-800"
                            : "text-gray-500"
                            }`}
                        >
                          {step.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Current Form */}
                  <div className="mb-8">
                    <CurrentFormComponent {...getCurrentFormProps()} />
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <button
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${currentStep === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentStep === steps.length - 1}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${currentStep === steps.length - 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              <div
                className={`lg:col-span-7 ${showPreview ? "" : "hidden lg:block"}`}
              >
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      Live Preview
                    </h2>
                    <button
                      onClick={() => setShowPreview(false)}
                      className="lg:hidden text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <ResumePreview data={resumeData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
