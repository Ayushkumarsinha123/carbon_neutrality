import express from 'express';
import { performGapAnalysis } from '../controllers/gapAnalysisController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/')
    .get(authMiddleware,performGapAnalysis);

    export default router;