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

  async function loadTasks() {
    const response = await fetch(API_URL);
    const data = await response.json();

    setTasks(data);
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