import express from 'express';
import {
  createForm,
  getForms,
  getFormById,
  getFormByShareLink,
  updateForm,
  deleteForm,
  publishForm
} from '../controllers/formController';

const router = express.Router();

// Form CRUD routes
router.post('/', createForm);
router.get('/', getForms);
router.get('/:id', getFormById);
router.put('/:id', updateForm);
router.delete('/:id', deleteForm);
router.patch('/:id/publish', publishForm);

// Public form access
router.get('/share/:shareLink', getFormByShareLink);

export default router; 