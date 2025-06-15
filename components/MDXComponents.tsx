import React from 'react'
import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import Photo from './gallery/photo'
import { parseWikiLinks } from './WikiLink'
import ParsedHeading from './ParsedHeading'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  Photo,
  p: ({ children }) => {
    if (typeof children === 'string') {
      return <p>{parseWikiLinks(children)}</p>
    }

    const parsedChildren = React.Children.map(children, (child) => {
      if (typeof child === 'string') {
        return parseWikiLinks(child)
      }
      return child
    })

    return <p>{parsedChildren}</p>
  },
  h1: ({ children, ...props }) => (
    <ParsedHeading as="h1" {...props}>
      {children}
    </ParsedHeading>
  ),
  h2: ({ children, ...props }) => (
    <ParsedHeading as="h2" {...props}>
      {children}
    </ParsedHeading>
  ),
  h3: ({ children, ...props }) => (
    <ParsedHeading as="h3" {...props}>
      {children}
    </ParsedHeading>
  ),
  h4: ({ children, ...props }) => (
    <ParsedHeading as="h4" {...props}>
      {children}
    </ParsedHeading>
  ),
  h5: ({ children, ...props }) => (
    <ParsedHeading as="h5" {...props}>
      {children}
    </ParsedHeading>
  ),
  h6: ({ children, ...props }) => (
    <ParsedHeading as="h6" {...props}>
      {children}
    </ParsedHeading>
  ),
}
