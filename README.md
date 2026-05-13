# Mini Kanban Cotabox

Setup inicial de um desafio tecnico full-stack para um Mini Kanban.

## Stack prevista

- Frontend: React, Vite e Tailwind CSS
- Backend: Node.js e Express
- Banco de dados futuro: SQLite com Prisma ORM

## Estrutura

```text
.
├── backend/
├── frontend/
├── README.md
└── .gitignore
```

## Como rodar nesta etapa

Instale as dependencias de cada aplicacao:

```bash
cd backend
npm install
```

```bash
cd frontend
npm install
```

Rode o backend:

```bash
cd backend
npm run dev
```

O backend inicia em `http://localhost:3333`.

Rode o frontend em outro terminal:

```bash
cd frontend
npm run dev
```

O frontend inicia em `http://localhost:5173`.

## Escopo atual

Esta etapa contem apenas o setup inicial do projeto. Ainda nao foram implementados:

- CRUD de tarefas
- Prisma
- Docker
- Testes
- Drag-and-drop
