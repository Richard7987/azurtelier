// components/WikiLink.tsx
import React from 'react'
import Link from './Link'

export function parseWikiLinks(text: string): React.ReactNode[] {
  const parts = text.split(/(\[\[.*?\]\])/g)

  return parts.map((part, index) => {
    const match = part.match(/^\[\[(.*?)(?:\|(.*?))?\]\]$/)
    if (match) {
      const href = match[1]
      const label = match[2] || match[1]
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

    return part
  })
}
