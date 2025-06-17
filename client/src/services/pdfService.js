import { generatePDF } from './api';

export const downloadPDF = async (resumeData) => {
  try {
    const pdfBlob = await generatePDF(resumeData);
    const url = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.fullName.replace(/\s+/g, '-').toLowerCase()}-resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw error;
  }
};

export const printResume = async (resumeData) => {
  try {
    const pdfBlob = await generatePDF(resumeData);
    const url = window.URL.createObjectURL(pdfBlob);
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    document.body.appendChild(iframe);
    iframe.onload = () => {
      iframe.contentWindow.print();
      document.body.removeChild(iframe);
      window.URL.revokeObjectURL(url);
    };
  } catch (error) {
    console.error('Error printing resume:', error);
    throw error;
  }
};

export default {
  downloadPDF,
  printResume,
}; 