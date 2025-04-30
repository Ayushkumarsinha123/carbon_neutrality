import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addEmission, getMineEmissions } from '../controllers/emissionController.js';



const router = express.Router();
router.route('/')
   .post(authMiddleware, addEmission)
   .get(authMiddleware, getMineEmissions);

   export default router;