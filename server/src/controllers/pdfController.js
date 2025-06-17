import { PDFService } from '../services/pdfService.js';
import { ApiError } from '../utils/errors.js';

class PDFController {
  constructor() {
    this.pdfService = new PDFService();
  }

  generatePDF = async (req, res, next) => {
    try {
      const { resume, template } = req.body;
      const pdfBuffer = await this.pdfService.generatePDF(resume, template);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
      res.send(pdfBuffer);
    } catch (error) {
      next(error);
    }
  };

  downloadPDF = async (req, res, next) => {
    try {
      const pdfBuffer = await this.pdfService.getPDF(req.params.id);
      if (!pdfBuffer) {
        throw new ApiError(404, 'PDF not found');
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
      res.send(pdfBuffer);
    } catch (error) {
      next(error);
    }
  };

  getPreview = async (req, res, next) => {
    try {
      const previewUrl = await this.pdfService.getPreview(req.params.id);
      if (!previewUrl) {
        throw new ApiError(404, 'Preview not found');
      }

      res.json({ success: true, data: { previewUrl } });
    } catch (error) {
      next(error);
    }
  };

  getTemplates = async (req, res, next) => {
    try {
      const templates = await this.pdfService.getTemplates();
      res.json({ success: true, data: templates });
    } catch (error) {
      next(error);
    }
  };

  getTemplatePreview = async (req, res, next) => {
    try {
      const previewUrl = await this.pdfService.getTemplatePreview(req.params.id);
      if (!previewUrl) {
        throw new ApiError(404, 'Template preview not found');
      }

      res.json({ success: true, data: { previewUrl } });
    } catch (error) {
      next(error);
    }
  };
}

export { PDFController }; 