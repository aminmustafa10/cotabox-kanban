import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:3333/tasks";

const columns = [
  {
    title: "A fazer",
    status: "TODO",
  },
  {
    title: "Em progresso",
    status: "IN_PROGRESS",
  },
  {
    title: "Concluído",
    status: "DONE",
  },
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

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

  async function updateTaskContent(taskId) {
    if (!editingTitle.trim()) {
      return;
    }

    await fetch(`${API_URL}/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editingTitle,
        description: editingDescription,
      }),
    });

    setEditingTaskId(null);
    setEditingTitle("");
    setEditingDescription("");

    await loadTasks();
  }

  async function deleteTask(taskId) {
    await fetch(`${API_URL}/${taskId}`, {
      method: "DELETE",
    });

    await loadTasks();
  }

  function startEditing(task) {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
    setEditingDescription(task.description || "");
  }

  function cancelEditing() {
    setEditingTaskId(null);
    setEditingTitle("");
    setEditingDescription("");
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Cotabox Challenge
          </p>

          <h1 className="text-4xl font-bold tracking-tight">Mini Kanban</h1>

          <p className="max-w-2xl text-slate-300">
            Kanban integrado com React, backend Express, Prisma e banco SQLite.
          </p>
        </div>

        <form
          onSubmit={createTask}
          className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/20"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-100">
                Criar nova tarefa
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Adicione uma tarefa nova diretamente no quadro.
              </p>
            </div>

            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
              {tasks.length} tarefa(s)
            </span>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <input
              type="text"
              placeholder="Título da tarefa"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />

            <input
              type="text"
              placeholder="Descrição da tarefa"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="mt-4 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Criar tarefa
          </button>
        </form>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {columns.map((column) => {
            const columnTasks = tasks.filter(
              (task) => task.status === column.status
            );

            return (
              <div
                key={column.status}
                className="min-h-80 rounded-2xl border border-slate-800 bg-slate-900/70 p-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-slate-200">
                    {column.title}
                  </h2>

                  <span className="rounded-full bg-slate-800 px-2 py-1 text-xs font-semibold text-slate-300">
                    {columnTasks.length}
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {columnTasks.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-700 p-4">
                      <p className="text-sm text-slate-500">
                        Nenhuma tarefa nesta coluna.
                      </p>
                    </div>
                  ) : (
                    columnTasks.map((task) => {
                      const isEditing = editingTaskId === task.id;

                      return (
                        <div
                          key={task.id}
                          className="rounded-xl border border-slate-700 bg-slate-950 p-4 shadow-lg shadow-black/10"
                        >
                          {isEditing ? (
                            <div className="space-y-3">
                              <input
                                type="text"
                                value={editingTitle}
                                onChange={(event) =>
                                  setEditingTitle(event.target.value)
                                }
                                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-400"
                              />

                              <input
                                type="text"
                                value={editingDescription}
                                onChange={(event) =>
                                  setEditingDescription(event.target.value)
                                }
                                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-400"
                              />

                              <div className="flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  onClick={() => updateTaskContent(task.id)}
                                  className="rounded-lg bg-cyan-400 px-3 py-1.5 text-xs font-bold text-slate-950 transition hover:bg-cyan-300"
                                >
                                  Salvar
                                </button>

                                <button
                                  type="button"
                                  onClick={cancelEditing}
                                  className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-400"
                                >
                                  Cancelar
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div>
                                <h3 className="font-semibold text-slate-100">
                                  {task.title}
                                </h3>

                                {task.description && (
                                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                                    {task.description}
                                  </p>
                                )}
                              </div>

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
                                        updateTaskStatus(
                                          task.id,
                                          targetColumn.status
                                        )
                                      }
                                      className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
                                    >
                                      Mover para {targetColumn.title}
                                    </button>
                                  ))}

                                <button
                                  type="button"
                                  onClick={() => startEditing(task)}
                                  className="rounded-lg border border-yellow-700 px-3 py-1.5 text-xs font-medium text-yellow-300 transition hover:border-yellow-400 hover:text-yellow-200"
                                >
                                  Editar
                                </button>

                                <button
                                  type="button"
                                  onClick={() => deleteTask(task.id)}
                                  className="rounded-lg border border-red-900 px-3 py-1.5 text-xs font-medium text-red-300 transition hover:border-red-400 hover:text-red-200"
                                >
                                  Excluir
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })
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