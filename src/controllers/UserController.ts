import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { criarUsuario, buscarPorEmail } from '../models/UserModel';

const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta';

export const registrar = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;
    const avatar = req.file?.filename;

    if (!nome || !email || !senha || !avatar) {
      return res.status(400).json({ erro: 'Preencha todos os campos e envie a imagem.' });
    }

    const usuarioExistente = await buscarPorEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ erro: 'Email já está em uso.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await criarUsuario({ nome, email, senha: senhaHash, avatar });

    return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao registrar usuário.' });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    const usuario = await buscarPorEmail(email);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha inválida.' });
    }

    const token = jwt.sign({ id: usuario.id, nome: usuario.nome, avatar: usuario.avatar }, JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.json({ token, nome: usuario.nome, avatar: usuario.avatar });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao fazer login.' });
  }
};
