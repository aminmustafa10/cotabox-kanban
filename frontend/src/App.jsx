import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:3333/tasks";

const columns = [
  {
    title: "TODO",
    status: "TODO",
  },
  {
    title: "IN_PROGRESS",
    status: "IN_PROGRESS",
  },
  {
    title: "DONE",
    status: "DONE",
  },
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function loadTasks() {
    const response = await fetch(API_URL);
    const data = await response.json();

    setTasks(data);
  }

  async function createTask(event) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        status: "TODO",
      }),
    });

    setTitle("");
    setDescription("");

    await loadTasks();
  }

  async function updateTaskStatus(taskId, status) {
    await fetch(`${API_URL}/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    });

    await loadTasks();
  }

  async function deleteTask(taskId) {
    await fetch(`${API_URL}/${taskId}`, {
      method: "DELETE",
    });

    await loadTasks();
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-medium uppercase tracking-wide text-cyan-300">
          Cotabox Challenge
        </p>

        <h1 className="mt-3 text-4xl font-bold">Mini Kanban</h1>

        <p className="mt-4 max-w-2xl text-slate-300">
          Kanban integrado com backend, Prisma e banco SQLite.
        </p>

        <form
          onSubmit={createTask}
          className="mt-8 rounded-lg border border-slate-800 bg-slate-900 p-4"
        >
          <h2 className="text-lg font-semibold text-slate-100">
            Criar nova tarefa
          </h2>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <input
              type="text"
              placeholder="Título da tarefa"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />

            <input
              type="text"
              placeholder="Descrição da tarefa"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="mt-4 rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
          >
            Criar tarefa
          </button>
        </form>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {columns.map((column) => {
            const columnTasks = tasks.filter(
              (task) => task.status === column.status
            );

            return (
              <div
                key={column.status}
                className="rounded-lg border border-slate-800 bg-slate-900 p-4"
              >
                <h2 className="text-sm font-semibold text-slate-200">
                  {column.title}
                </h2>

                <div className="mt-4 space-y-3">
                  {columnTasks.length === 0 ? (
                    <p className="text-sm text-slate-500">
                      Nenhuma tarefa nesta coluna.
                    </p>
                  ) : (
                    columnTasks.map((task) => (
                      <div
                        key={task.id}
                        className="rounded-md border border-slate-700 bg-slate-950 p-3"
                      >
                        <h3 className="font-medium text-slate-100">
                          {task.title}
                        </h3>

                        {task.description && (
                          <p className="mt-2 text-sm text-slate-400">
                            {task.description}
                          </p>
                        )}

                        <div className="mt-4 flex flex-wrap gap-2">
                          {columns
                            .filter(
                              (targetColumn) =>
                                targetColumn.status !== task.status
                            )
                            .map((targetColumn) => (
                              <button
                                key={targetColumn.status}
                                type="button"
                                onClick={() =>
                                  updateTaskStatus(task.id, targetColumn.status)
                                }
                                className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:border-cyan-400 hover:text-cyan-300"
                              >
                                Mover para {targetColumn.title}
                              </button>
                            ))}

                          <button
                            type="button"
                            onClick={() => deleteTask(task.id)}
                            className="rounded-md border border-red-900 px-2 py-1 text-xs text-red-300 hover:border-red-400 hover:text-red-200"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default App;