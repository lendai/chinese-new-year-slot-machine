/* eslint-disable react/no-danger */
// import axios from 'axios'
import React, { Component } from 'react'
import { renderStaticOptimized } from 'glamor/server'

export default {
  getRoutes: async () =>
    // const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    [
      {
        path: '/',
        component: 'src/containers/home',
      },
    ],
  renderToHtml: async (render, Comp, meta) => {
    const html = render(<Comp />)
    const { css } = renderStaticOptimized(() => html)
    meta.glamStyles = css
    return html
  },
  Document: class CustomDocument extends Component {
    render () {
      const { Html, Head, Body, children, renderMeta } = this.props

      return (
        <Html>
          <Head>
            <title>Lucky Happy New Year Game</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style dangerouslySetInnerHTML={{ __html: renderMeta.glamStyles }} />
          </Head>
          <Body>
            {children}
          </Body>
        </Html>
      )
    }
  },
}
