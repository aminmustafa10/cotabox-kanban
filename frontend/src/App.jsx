function App() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-medium uppercase tracking-wide text-cyan-300">
          Cotabox Challenge
        </p>
        <h1 className="mt-3 text-4xl font-bold">Mini Kanban</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Setup inicial com React, Vite e Tailwind CSS. As funcionalidades do
          Kanban serao implementadas nas proximas etapas.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {["TODO", "IN_PROGRESS", "DONE"].map((status) => (
            <div
              key={status}
              className="rounded-lg border border-slate-800 bg-slate-900 p-4"
            >
              <h2 className="text-sm font-semibold text-slate-200">{status}</h2>
              <p className="mt-3 text-sm text-slate-400">
                Coluna reservada para tarefas.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
