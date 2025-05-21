// src/routes/ArticleRoutes.ts
import express from 'express';
import { criar, listar, atualizar, excluir } from '../controllers/ArticleController';
import { autenticarToken } from '../middlewares/AuthMiddleware';
import { upload } from '../utils/Multer';

const router = express.Router();

router.post('/', autenticarToken, upload.single('imagem'), criar);
router.get('/', autenticarToken, listar);
router.put('/:id', autenticarToken, upload.single('imagem'), atualizar);
router.delete('/:id', autenticarToken, excluir);

export default router;
