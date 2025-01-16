import { Router } from 'express';
import {
    generateMockPets,
    generateMockUsers,
    generateData,
} from '../controllers/mocks.controller.js';

const router = Router();

router.get('/mockingpets', generateMockPets);
router.get('/mockingusers', generateMockUsers);
router.post('/generateData', generateData);

export default router;
