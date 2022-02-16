import { Router } from 'express';
import * as api from './controllers/index.js';

// Define routes..
var router = Router();

// API Main route..
router.use('/api/v1' , api.default);


export default router;