import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createSimulation, getSimulations } from '../controllers/simulationController.js';

const router = express.Router();

router.route('/')
    .post(authMiddleware, createSimulation)
    .get(authMiddleware, getSimulations);

    export default router;