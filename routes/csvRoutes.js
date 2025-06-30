import express from 'express';
import { uploadCSV, upload, getAgentLists } from '../controllers/csvController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/upload', verifyToken, upload, uploadCSV);
router.get('/lists', verifyToken, getAgentLists);

export default router;
