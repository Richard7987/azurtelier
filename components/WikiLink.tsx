// components/WikiLink.tsx
import React from 'react'
import Link from './Link'

export function parseWikiLinks(text: string): React.ReactNode[] {
  // Divide el texto en partes con o sin wiki-links
  const parts = text.split(/(\[\[.*?\]\])/g)

  return parts.map((part, index) => {
    const match = part.match(/^\[\[(.*?)(?:\|(.*?))?\]\]$/)
    if (match) {
      const href = match[1]
      const label = match[2] || match[1]

      // Normaliza la ruta para URL (puedes ajustar según convenga)
      const normalizedHref = '/' + href.replace(/\s+/g, '-').toLowerCase()

      return (
        <Link
          key={index}
          href={normalizedHref}
          className="underline underline-offset-2 hover:text-primary-400"
        >
          {label}
        </Link>
      )
    }

    // Si no es wiki-link, devuelve texto plano envuelto en fragmento con key
    return <React.Fragment key={index}>{part}</React.Fragment>
  })
}
