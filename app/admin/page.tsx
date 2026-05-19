import Link from 'next/link'
import { Header } from '@/components/Header'

const cards = [
  { href: '/admin/products', title: 'Articles', desc: 'Ajouter, modifier ou supprimer les produits QC.' },
  { href: '/admin/affiliate-sites', title: 'Sites affiliés', desc: 'Gérer les agents, IDs affiliés, logos et templates.' },
  { href: '/admin/analytics', title: 'Statistiques', desc: 'Suivre les clics affiliés par site et par article.' },
  { href: '/admin/settings', title: 'Paramètres', desc: 'Taux de change, livraison moyenne au kg et options.' }
]

export default function AdminPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-4xl font-black">Admin China'Town</h1>
        <p className="mt-2 text-black/60">Dashboard de départ. À connecter avec Supabase Auth pour protéger l'accès.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {cards.map(card => (
            <Link key={card.href} href={card.href} className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <h2 className="text-2xl font-black">{card.title}</h2>
              <p className="mt-2 text-black/55">{card.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
