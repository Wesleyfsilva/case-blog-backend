import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import { db } from './config/db';
import userRoutes from './routes/UserRoutes';
import articleRoutes from './routes/ArticleRoutes';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir imagens estáticas da pasta de uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas públicas
app.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS resultado');
    res.json({ mensagem: 'API do Blog funcionando! 🚀', resultado: rows });
  } catch (error) {
    res.status(500).json({ erro: 'Erro na conexão com o banco de dados' });
  }
});

// Rotas de usuários
app.use('/api/usuarios', userRoutes);

// Rotas de artigos (protegidas)
app.use('/api/artigos', articleRoutes);

// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
