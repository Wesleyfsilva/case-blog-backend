import { db } from '../config/db';

interface NovoUsuario {
  nome: string;
  email: string;
  senha: string;
}

export const criarUsuario = async (usuario: NovoUsuario) => {
  const { nome, email, senha } = usuario;
  const sql = 'INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)';
  const [result] = await db.execute(sql, [nome, email, senha]);
  return result;
};

export const buscarPorEmail = async (email: string) => {
  const sql = 'SELECT * FROM users WHERE email = ? LIMIT 1';
  const [rows] = await db.execute(sql, [email]);
  return Array.isArray(rows) ? rows[0] : null;
};
