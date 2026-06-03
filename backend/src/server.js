const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
const app = express();

const adapter = new PrismaBetterSqlite3({
  url: "file:./dev.db",
});

const prisma = new PrismaClient({
  adapter,
});

const port = process.env.PORT || 3333;
const host = process.env.HOST || "127.0.0.1";

app.use(cors());
app.use(express.json());

app.get("/health", (request, response) => {
  return response.json({
    status: "ok",
    service: "mini-kanban-backend",
  });
});

app.get("/tasks", async (request, response) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return response.json(tasks);
  } catch (error) {
    return response.status(500).json({
      message: "Erro ao listar tarefas.",
    });
  }
});

app.post("/tasks", async (request, response) => {
  try {
    const { title, description, status } = request.body;

    if (!title) {
      return response.status(400).json({
        message: "O título da tarefa é obrigatório.",
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status || "TODO",
      },
    });

    return response.status(201).json(task);
  } catch (error) {
    return response.status(500).json({
      message: "Erro ao criar tarefa.",
    });
  }
});

app.patch("/tasks/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { title, description, status } = request.body;

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        status,
      },
    });

    return response.json(task);
  } catch (error) {
    return response.status(500).json({
      message: "Erro ao atualizar tarefa.",
    });
  }
});

app.delete("/tasks/:id", async (request, response) => {
  try {
    const { id } = request.params;

    await prisma.task.delete({
      where: {
        id,
      },
    });

    return response.status(204).send();
  } catch (error) {
    return response.status(500).json({
      message: "Erro ao excluir tarefa.",
    });
  }
});

app.listen(port, host, () => {
  console.log(`Backend running on http://${host}:${port}`);
});