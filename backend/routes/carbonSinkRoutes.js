import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getCarbonSink, addCarbonSink } from '../controllers/carbonSinkController.js';

const router = express.Router();
router.route('/')
    .post(authMiddleware,addCarbonSink)
    .get(authMiddleware,getCarbonSink);

    export default router;