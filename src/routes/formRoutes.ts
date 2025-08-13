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

import { requireRole } from '../middleware/auth';

const router = express.Router();

// Form CRUD routes
router.post('/', requireRole(["superuser", "admin", "creator"]), createForm);
router.get('/', getForms);
router.get('/:id', requireRole(["superuser", "admin", "creator"]), getFormById);
router.put('/:id', requireRole(["superuser", "admin", "creator"]), updateForm);
router.delete('/:id', requireRole(["superuser", "admin", "creator"]), deleteForm);
router.patch('/:id/publish', requireRole(["superuser", "admin", "creator"]), publishForm);

// Public form access
router.get('/share/:shareLink', getFormByShareLink);

export default router;