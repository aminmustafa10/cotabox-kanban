# Mini Kanban - Cotabox Challenge

Projeto de um Mini Kanban desenvolvido como desafio técnico, com frontend em React, backend em Express, banco de dados SQLite e Prisma ORM.

O sistema permite criar, listar, editar, mover e excluir tarefas entre colunas de um quadro Kanban.

## Funcionalidades

- Criar novas tarefas
- Listar tarefas salvas no banco
- Editar título e descrição das tarefas
- Mover tarefas entre colunas:
  - A fazer
  - Em progresso
  - Concluído
- Excluir tarefas
- Persistência de dados com SQLite
- Integração entre frontend e backend via API REST

## Tecnologias utilizadas

### Frontend

- React
- Vite
- Tailwind CSS
- JavaScript

### Backend

- Node.js
- Express
- Prisma ORM
- SQLite
- CORS

## Estrutura do projeto

```txt
cotabox-kanban/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   └── server.js
│   ├── package.json
│   └── dev.db
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
cd cotabox-kanban
```

### 2. Rodar o backend

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Rode as migrations do Prisma:

```bash
npx prisma migrate dev
```

Inicie o servidor:

```bash
npm run dev
```

O backend ficará disponível em:

```txt
http://127.0.0.1:3333
```

### 3. Rodar o frontend

Em outro terminal, volte para a raiz do projeto e entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o frontend:

```bash
npm run dev
```

O frontend ficará disponível em:

```txt
http://localhost:5173
```

## Rotas da API

### Listar tarefas

```http
GET /tasks
```

### Criar tarefa

```http
POST /tasks
```

Exemplo de corpo da requisição:

```json
{
  "title": "Criar nova tarefa",
  "description": "Descrição da tarefa",
  "status": "TODO"
}
```

### Atualizar tarefa

```http
PATCH /tasks/:id
```

Exemplo de corpo da requisição:

```json
{
  "title": "Título atualizado",
  "description": "Descrição atualizada",
  "status": "IN_PROGRESS"
}
```

### Excluir tarefa

```http
DELETE /tasks/:id
```

## Status das tarefas

O projeto utiliza três status principais:

```txt
TODO
IN_PROGRESS
DONE
```

Esses status representam as colunas do Kanban:

```txt
TODO = A fazer
IN_PROGRESS = Em progresso
DONE = Concluído
```

## Banco de dados

O projeto usa SQLite como banco local e Prisma como ORM.

O modelo principal é:

```prisma
model Task {
  id          String   @id @default(cuid())
  title       String
  description String?
  status      Status   @default(TODO)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Status {
  TODO
  IN_PROGRESS
  DONE
}
```

## Objetivo do projeto

Este projeto foi desenvolvido com o objetivo de praticar a construção de uma aplicação full stack simples, conectando uma interface React a uma API REST com persistência em banco de dados.

## Autor

Desenvolvido por Amin Mustafá.