import html2pdf from 'html2pdf.js';

export const generatePDF = (resumeData: any) => {
  const element = document.getElementById('resume-preview');
  if (!element) return;

  const opt = {
    margin: 0.5,
    filename: `${resumeData.personalInfo.name || 'resume'}_harvard_cv.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true
    },
    jsPDF: { 
      unit: 'in', 
      format: 'letter', 
      orientation: 'portrait' 
    }
  };

  html2pdf().set(opt).from(element).save();
};