// src/models/ArticleModel.ts
import pool from '../config/db';

interface NovoArtigo {
  titulo: string;
  conteudo: string;
  imagem: string;
  usuario_id: number;
}

interface ArtigoAtualizado {
  titulo: string;
  conteudo: string;
  imagem?: string;
}

export const criarArtigo = async ({ titulo, conteudo, imagem, usuario_id }: NovoArtigo) => {
  const sql = 'INSERT INTO articles (titulo, conteudo, imagem, usuario_id) VALUES (?, ?, ?, ?)';
  await pool.query(sql, [titulo, conteudo, imagem, usuario_id]);
};

export const listarArtigosPorUsuario = async (usuario_id: number) => {
  const sql = `
    SELECT a.*, u.nome AS autor_nome, u.avatar AS autor_avatar
    FROM articles a
    JOIN users u ON a.usuario_id = u.id
    WHERE a.usuario_id = ?
    ORDER BY a.id DESC
  `;
  const [rows] = await pool.query(sql, [usuario_id]);
  return rows;
};

export const buscarArtigoPorId = async (id: number) => {
  const sql = 'SELECT * FROM articles WHERE id = ?';
  const [rows] = await pool.query(sql, [id]);
  return Array.isArray(rows) ? rows[0] : null;
};

export const atualizarArtigo = async (
  id: number,
  { titulo, conteudo, imagem }: ArtigoAtualizado
) => {
  const sql = 'UPDATE articles SET titulo = ?, conteudo = ?, imagem = ? WHERE id = ?';
  await pool.query(sql, [titulo, conteudo, imagem, id]);
};

export const deletarArtigo = async (id: number) => {
  const sql = 'DELETE FROM articles WHERE id = ?';
  await pool.query(sql, [id]);
};
