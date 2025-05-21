import express from 'express';
import { registrar, login } from '../controllers/UserController';
import { uploadUsuario } from '../middlewares/UploadUsuario';

const router = express.Router();

router.post('/registrar', uploadUsuario.single('avatar'), registrar);
router.post('/login', login);

export default router;
