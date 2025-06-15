// components/ParsedHeading.tsx
import React from 'react'
import { parseWikiLinks } from './WikiLink'

interface ParsedHeadingProps {
  children: React.ReactNode
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const ParsedHeading = ({ children, as }: ParsedHeadingProps) => {
  // parsea strings directamente
  if (typeof children === 'string') {
    return React.createElement(as, {}, parseWikiLinks(children))
  }

  // si tiene nodos, mapea recursivamente
  const parsedChildren = React.Children.map(children, (child) => {
    if (typeof child === 'string') return parseWikiLinks(child)
    return child
  })

  return React.createElement(as, {}, parsedChildren)
}

export default ParsedHeading
