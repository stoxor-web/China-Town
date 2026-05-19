import { Header } from '@/components/Header'

export default function SettingsPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-4xl font-black">Paramètres</h1>
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black">Devises & livraison</h2>
          <p className="mt-2 text-black/60">Les taux CNY/EUR/USD peuvent être mis à jour via /api/update-rates avec un cron Vercel.</p>
        </div>
      </section>
    </main>
  )
}
