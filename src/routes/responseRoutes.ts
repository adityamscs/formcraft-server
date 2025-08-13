import express from 'express';
import {
  submitResponse,
  getResponses,
  getResponseById
} from '../controllers/responseController';

const router = express.Router();

// Response routes
router.post('/:formId', submitResponse);
router.get('/:formId', getResponses);
router.get('/response/:id', getResponseById);

export default router; 