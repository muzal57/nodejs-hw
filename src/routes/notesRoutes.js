import { Router } from 'express';
import {
  getAllNotes,
  updateNote,
  createNote,
  deleteNote,
  getNoteById,
} from '../controllers/notesController.js';
import {
  getAllNotesSchema,
  createNoteSchema,
  updateNoteSchema,
  noteIdSchema,
} from '../validations/notesValidation.js';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/notes', authenticate, celebrate(getAllNotesSchema), getAllNotes);
router.get(
  '/notes/:noteId',
  authenticate,
  celebrate(noteIdSchema),
  getNoteById,
);
router.post('/notes', authenticate, celebrate(createNoteSchema), createNote);
router.delete(
  '/notes/:noteId',
  authenticate,
  celebrate(noteIdSchema),
  deleteNote,
);
router.patch(
  '/notes/:noteId',
  authenticate,
  celebrate(updateNoteSchema),
  updateNote,
);

export default router;
