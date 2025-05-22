# 🔙 Backend - Sistema de Estoque

Este é o backend do Sistema de Estoque, construído com **Node.js + Express + TypeScript + MySQL**. Ele fornece uma API RESTful para autenticação de usuários, cadastro de produtos com upload de imagem e controle de estoque.

## 🚀 Tecnologias

- Node.js
- Express
- TypeScript
- MySQL
- Sequelize ORM
- Multer (upload de imagens)
- JWT (autenticação)
- CORS
- Dotenv

---

## 📂 Estrutura de Pastas

```
estoque-backend/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── app.ts
```

---

## ⚙️ Configuração

### 1. Instale as dependências:

```bash
npm install
```

### 2. Crie o arquivo `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
JWT_SECRET=sua_chave_secreta
```

### 3. Compile e execute:

```bash
npx tsc
node dist/app.js
```

> Lembre-se de criar o banco de dados no MySQL antes de rodar o backend.

---

## 📦 Funcionalidades

- Cadastro e login com autenticação JWT
- Upload de imagem de perfil no registro
- Upload de imagem de produto
- CRUD de produtos (vinculados ao usuário logado)
- Middleware de autenticação
- Rota para movimentação de estoque (entrada/saída) — opcional para futuro

---

## 🖼️ Upload de Imagens

As imagens são salvas na pasta local `/uploads` e servidas como arquivos estáticos via Express.

---

## 🧠 Autor

Desenvolvido por **Wesley Ferreira**

GitHub: [https://github.com/seuusuario](https://github.com/seuusuario)

---
