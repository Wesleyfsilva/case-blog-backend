import { db } from '../config/db';

interface NovoArtigo {
  titulo: string;
  conteudo: string;
  imagem?: string;
  usuario_id: number;
}

export const criarArtigo = async (artigo: NovoArtigo) => {
  const sql = 'INSERT INTO articles (titulo, conteudo, imagem, usuario_id) VALUES (?, ?, ?, ?)';
  const [result] = await db.execute(sql, [artigo.titulo, artigo.conteudo, artigo.imagem, artigo.usuario_id]);
  return result;
};

export const listarArtigosPorUsuario = async (usuario_id: number) => {
  const sql = 'SELECT * FROM articles WHERE usuario_id = ? ORDER BY criado_em DESC';
  const [rows] = await db.execute(sql, [usuario_id]);
  return rows;
};

export const buscarArtigoPorId = async (id: number) => {
  const sql = 'SELECT * FROM articles WHERE id = ?';
  const [rows] = await db.execute(sql, [id]);
  return Array.isArray(rows) ? rows[0] : null;
};

export const atualizarArtigo = async (
  id: number,
  dados: { titulo: string; conteudo: string; imagem?: string }
) => {
  const sql = 'UPDATE articles SET titulo = ?, conteudo = ?, imagem = ? WHERE id = ?';
  const [result] = await db.execute(sql, [dados.titulo, dados.conteudo, dados.imagem || null, id]);
  return result;
};

export const deletarArtigo = async (id: number) => {
  const sql = 'DELETE FROM articles WHERE id = ?';
  const [result] = await db.execute(sql, [id]);
  return result;
};
