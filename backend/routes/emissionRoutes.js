import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { addEmission, getMineEmissions } from '../controllers/emissionController';



const router = express.Router();
router.route('/')
   .post(authMiddleware, addEmission)
   .get(authMiddleware, getMineEmissions);

   export default router;