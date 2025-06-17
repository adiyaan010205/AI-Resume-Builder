import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ApiError } from '../utils/errors.js';
import { templates } from '../config/templates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PDFService {
  constructor() {
    this.outputDir = path.join(__dirname, '../../output');
    this.ensureOutputDirectory();
  }

  ensureOutputDirectory() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  async generatePDF(resume, template) {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50
      });

      const outputPath = path.join(this.outputDir, `${resume.id}.pdf`);
      const writeStream = fs.createWriteStream(outputPath);

      doc.pipe(writeStream);

      // Apply template styling
      const selectedTemplate = templates[template] || templates.default;
      this.applyTemplate(doc, selectedTemplate);

      // Add resume content
      await this.addResumeContent(doc, resume);

      doc.end();

      return new Promise((resolve, reject) => {
        writeStream.on('finish', () => {
          const pdfBuffer = fs.readFileSync(outputPath);
          fs.unlinkSync(outputPath); // Clean up the file
          resolve(pdfBuffer);
        });

        writeStream.on('error', (error) => {
          reject(new ApiError(500, 'Error generating PDF'));
        });
      });
    } catch (error) {
      throw new ApiError(500, 'Error generating PDF');
    }
  }

  async getPDF(id) {
    try {
      const filePath = path.join(this.outputDir, `${id}.pdf`);
      if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath);
      }
      return null;
    } catch (error) {
      throw new ApiError(500, 'Error retrieving PDF');
    }
  }

  async getPreview(id) {
    try {
      const filePath = path.join(this.outputDir, `${id}.pdf`);
      if (fs.existsSync(filePath)) {
        return `/api/pdf/preview/${id}`;
      }
      return null;
    } catch (error) {
      throw new ApiError(500, 'Error generating preview');
    }
  }

  async getTemplates() {
    try {
      return Object.keys(templates).map(key => ({
        id: key,
        name: templates[key].name,
        description: templates[key].description,
        thumbnail: templates[key].thumbnail
      }));
    } catch (error) {
      throw new ApiError(500, 'Error retrieving templates');
    }
  }

  async getTemplatePreview(templateId) {
    try {
      const template = templates[templateId];
      if (!template) {
        throw new ApiError(404, 'Template not found');
      }
      return template.preview;
    } catch (error) {
      throw new ApiError(500, 'Error retrieving template preview');
    }
  }

  applyTemplate(doc, template) {
    // Apply template-specific styling
    doc.font(template.font);
    doc.fontSize(template.fontSize);
    doc.fillColor(template.textColor);
  }

  async addResumeContent(doc, resume) {
    // Add personal information
    this.addPersonalInfo(doc, resume.personalInfo);

    // Add summary
    if (resume.summary) {
      this.addSummary(doc, resume.summary);
    }

    // Add experience
    if (resume.experience?.length) {
      this.addExperience(doc, resume.experience);
    }

    // Add education
    if (resume.education?.length) {
      this.addEducation(doc, resume.education);
    }

    // Add skills
    if (resume.skills?.length) {
      this.addSkills(doc, resume.skills);
    }

    // Add projects
    if (resume.projects?.length) {
      this.addProjects(doc, resume.projects);
    }
  }

  addPersonalInfo(doc, personalInfo) {
    doc.fontSize(24).text(personalInfo.name, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(personalInfo.email, { align: 'center' });
    doc.text(personalInfo.phone, { align: 'center' });
    if (personalInfo.location) {
      doc.text(personalInfo.location, { align: 'center' });
    }
    doc.moveDown(2);
  }

  addSummary(doc, summary) {
    doc.fontSize(16).text('Professional Summary');
    doc.moveDown();
    doc.fontSize(12).text(summary);
    doc.moveDown(2);
  }

  addExperience(doc, experience) {
    doc.fontSize(16).text('Professional Experience');
    doc.moveDown();

    experience.forEach(exp => {
      doc.fontSize(14).text(exp.title);
      doc.fontSize(12).text(`${exp.company} | ${exp.startDate} - ${exp.endDate}`);
      doc.moveDown();
      exp.description.forEach(desc => {
        doc.fontSize(12).text(`• ${desc}`);
      });
      doc.moveDown();
    });
  }

  addEducation(doc, education) {
    doc.fontSize(16).text('Education');
    doc.moveDown();

    education.forEach(edu => {
      doc.fontSize(14).text(edu.degree);
      doc.fontSize(12).text(`${edu.school} | ${edu.startDate} - ${edu.endDate}`);
      if (edu.gpa) {
        doc.text(`GPA: ${edu.gpa}`);
      }
      doc.moveDown();
    });
  }

  addSkills(doc, skills) {
    doc.fontSize(16).text('Skills');
    doc.moveDown();
    doc.fontSize(12).text(skills.join(', '));
    doc.moveDown(2);
  }

  addProjects(doc, projects) {
    doc.fontSize(16).text('Projects');
    doc.moveDown();

    projects.forEach(project => {
      doc.fontSize(14).text(project.name);
      doc.fontSize(12).text(project.description);
      if (project.technologies) {
        doc.text(`Technologies: ${project.technologies.join(', ')}`);
      }
      doc.moveDown();
    });
  }
}

export { PDFService }; 