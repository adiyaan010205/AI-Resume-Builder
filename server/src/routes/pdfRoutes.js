import express from 'express';
import { PDFController } from '../controllers/pdfController.js';

const router = express.Router();
const pdfController = new PDFController();

// Generate PDF from resume
router.post('/generate', pdfController.generatePDF);

// Download generated PDF
router.get('/download/:id', pdfController.downloadPDF);

// Get PDF preview
router.get('/preview/:id', pdfController.getPreview);

// Get available templates
router.get('/templates', pdfController.getTemplates);

// Get template preview
router.get('/templates/:id/preview', pdfController.getTemplatePreview);

export default router; 