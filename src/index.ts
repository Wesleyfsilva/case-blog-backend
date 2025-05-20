import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { db } from './config/db';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS resultado');
    res.json({ mensagem: 'API do Blog funcionando! 🚀', resultado: rows });
  } catch (error) {
    console.error('Erro ao conectar com o banco:', error);
    res.status(500).json({ erro: 'Erro na conexão com o banco de dados' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
