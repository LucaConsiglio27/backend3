import express from 'express';
import { getPets, createPet } from "../controllers/pets.controller.js";
import multer from '../middlewares/multer.config.js';

const router = express.Router();

router.get('/', getPets);
router.post('/', multer.single('image'), createPet);

export default router;
