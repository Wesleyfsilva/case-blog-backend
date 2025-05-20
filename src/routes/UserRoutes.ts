import express from 'express';
import { registrar, login } from '../controllers/UserController';

const router = express.Router();

router.post('/registrar', registrar);
router.post('/login', login);

export default router;
