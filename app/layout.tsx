import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "China'Town — QC Finder",
  description: "Plateforme QC avec conversion devises, estimation livraison et liens affiliés."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
