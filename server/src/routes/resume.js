import express from 'express';
import { ResumeController } from '../controllers/resumeController.js';
import { validateResume } from '../middleware/validation.js';

const router = express.Router();
const resumeController = new ResumeController();

// Get all resumes
router.get('/', resumeController.getAllResumes.bind(resumeController));

// Get resume by ID
router.get('/:id', resumeController.getResumeById.bind(resumeController));

// Create new resume
router.post('/', validateResume, resumeController.createResume.bind(resumeController));

// Update resume
router.put('/:id', validateResume, resumeController.updateResume.bind(resumeController));

// Delete resume
router.delete('/:id', resumeController.deleteResume.bind(resumeController));

// Save resume as draft
router.post('/:id/draft', resumeController.saveDraft.bind(resumeController));

// Publish resume
router.post('/:id/publish', resumeController.publishResume.bind(resumeController));

export default router; 