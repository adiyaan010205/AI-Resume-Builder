import express from 'express';
import { AIController } from '../controllers/aiController.js';

const router = express.Router();
const aiController = new AIController();

// Generate professional summary
router.post('/generate-summary', aiController.generateSummary.bind(aiController));

// Improve existing summary
router.post('/improve-summary', aiController.improveSummary.bind(aiController));

// Suggest skills based on experience
router.post('/suggest-skills', aiController.suggestSkills.bind(aiController));

// Enhance experience description
router.post('/enhance-experience', aiController.enhanceExperience.bind(aiController));

// Analyze resume for improvements
router.post('/analyze-resume', aiController.analyzeResume.bind(aiController));

// Generate keywords for ATS optimization
router.post('/generate-keywords', aiController.generateKeywords.bind(aiController));

export default router; 