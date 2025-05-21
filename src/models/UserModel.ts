import pool from '../config/db';

interface NovoUsuario {
  nome: string;
  email: string;
  senha: string;
  avatar?: string;
}

export const criarUsuario = async ({ nome, email, senha, avatar }: NovoUsuario) => {
  const sql = 'INSERT INTO users (nome, email, senha, avatar) VALUES (?, ?, ?, ?)';
  await pool.query(sql, [nome, email, senha, avatar]);
};

export const buscarPorEmail = async (email: string) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  const resultado = Array.isArray(rows) ? rows[0] : null;
  return resultado;
};
