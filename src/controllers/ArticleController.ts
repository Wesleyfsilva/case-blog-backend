import { Request, Response } from 'express';
import {
  criarArtigo,
  listarArtigosPorUsuario,
  buscarArtigoPorId,
  atualizarArtigo,
  deletarArtigo,
} from '../models/ArticleModel';

export const criar = async (req: Request, res: Response) => {
  try {
    const { titulo, conteudo } = req.body;
    const imagem = req.file?.filename;
    const usuario_id = req.user!.id;

    await criarArtigo({ titulo, conteudo, imagem, usuario_id });

    res.status(201).json({ mensagem: 'Artigo criado com sucesso.' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar artigo.' });
  }
};

export const listar = async (req: Request, res: Response) => {
  try {
    const usuario_id = req.user!.id;
    const artigos = await listarArtigosPorUsuario(usuario_id);
    res.json(artigos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar artigos.' });
  }
};

export const atualizar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { titulo, conteudo } = req.body;
    const imagem = req.file?.filename;

    const artigo = await buscarArtigoPorId(Number(id));
    if (!artigo) return res.status(404).json({ erro: 'Artigo não encontrado.' });

    if (artigo.usuario_id !== req.user!.id) {
      return res.status(403).json({ erro: 'Você não tem permissão para editar este artigo.' });
    }

    await atualizarArtigo(Number(id), { titulo, conteudo, imagem });

    res.json({ mensagem: 'Artigo atualizado com sucesso.' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar artigo.' });
  }
};

export const excluir = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const artigo = await buscarArtigoPorId(Number(id));
    if (!artigo) return res.status(404).json({ erro: 'Artigo não encontrado.' });

    if (artigo.usuario_id !== req.user!.id) {
      return res.status(403).json({ erro: 'Você não tem permissão para excluir este artigo.' });
    }

    await deletarArtigo(Number(id));
    res.json({ mensagem: 'Artigo excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao excluir artigo.' });
  }
};
