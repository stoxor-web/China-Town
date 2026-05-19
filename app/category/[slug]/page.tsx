import { Header } from '@/components/Header'

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return (
    <main>
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-4xl font-black">Catégorie : {params.slug}</h1>
        <p className="mt-3 text-black/60">Page prête à connecter avec les filtres Supabase.</p>
      </section>
    </main>
  )
}
