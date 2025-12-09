const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "https://symfony-api.onrender.com";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-6 py-16 sm:px-12">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-medium text-blue-600">Taskly monorepo</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Next.js + Symfony 8 + PostgreSQL sur Render free tier
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600">
            Front en Node natif, API Symfony dockerisée, base Postgres managée.
            Configurez simplement la variable <code>NEXT_PUBLIC_API_URL</code> pour pointer vers l&apos;API Render.
          </p>
        </header>

        <section className="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:grid-cols-2 sm:gap-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">API Symfony</h2>
            <p className="text-sm text-zinc-600">
              L&apos;API tourne dans un container Docker (php-fpm + nginx) et écoute sur
              le port Render <code>$PORT</code>. Doctrine lit l&apos;URL Postgres via <code>DATABASE_URL</code>.
            </p>
            <div className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-800">
              URL API prévue : <span className="font-mono">{apiUrl}</span>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Front Next.js</h2>
            <p className="text-sm text-zinc-600">
              Service web Node Render avec les scripts <code>npm run build</code> et{" "}
              <code>npm run start</code>. Tailwind CSS et App Router sont prêts.
            </p>
            <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
              Configurez <code>NEXT_PUBLIC_API_URL</code> dans Render pour les appels front.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
