import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import Photo from './gallery/photo'
import { parseWikiLinks } from './WikiLink'
import React from 'react'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  Photo,
  p: ({ children }) => {
    // Si los children son un string, parsea directamente
    if (typeof children === 'string') {
      return <p>{parseWikiLinks(children)}</p>
    }

    // Si children es array o nodo, mapea recursivamente y solo parsea strings
    const parsedChildren = React.Children.map(children, (child) => {
      if (typeof child === 'string') {
        return parseWikiLinks(child)
      }
      return child
    })

    return <p>{parsedChildren}</p>
  },
}
