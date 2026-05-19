import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b border-black/10 bg-cream/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-black tracking-tight">
          China<span className="text-gold">'</span>Town
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium">
          <Link href="/">Accueil</Link>
          <Link href="/admin" className="rounded-full bg-ink px-4 py-2 text-white">Admin</Link>
        </nav>
      </div>
    </header>
  )
}
