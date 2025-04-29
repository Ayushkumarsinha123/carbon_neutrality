import express from 'express';
import { createEmission, getAllEmission } from '../controllers/emissionController';

const router = express.Router();
router.route('/')
   .post(createEmission)
   .get(getAllEmission);


  export default router;