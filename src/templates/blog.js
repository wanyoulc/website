import Layout from '../components/layout'
import React from 'react'
import SEO from '../components/seo'
import { graphql } from 'gatsby'

const Blog = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html, tableOfContents } = markdownRemark

  const category = frontmatter.categories
    ? frontmatter.categories[0]
    : 'No Category'

  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        link={[
          {
            rel: 'stylesheet',
            href:
              'https://cdn.jsdelivr.net/gh/sindresorhus/github-markdown-css@3.0.1/github-markdown.css',
          },
        ]}
      />
      <article className="PingCAP-Blog">
        <progress
          className="progress is-primary blog-progress"
          value="50"
          max="100"
        >
          50%
        </progress>
        <section className="section section-blog">
          <div className="container">
            <div className="columns">
              <div className="column is-8">
                <div className="under-category">{'Blog > ' + category}</div>
                <h4 className="title is-4 is-spaced blog-title">
                  {frontmatter.title}
                </h4>
                <div className="subtitle is-7 blog-subtitle">
                  <span>{frontmatter.date}</span>
                  <span>{frontmatter.author || 'PingCAP'}</span>
                  <span>{category}</span>
                </div>
                <div
                  className="markdown-body blog-content"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </div>
              <div className="column is-4 right-column">
                <div className="toc">
                  <div className="title is-7 toc-title">
                    What's on this page
                  </div>
                  <div
                    className="toc-content"
                    dangerouslySetInnerHTML={{ __html: tableOfContents }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($title: String) {
    markdownRemark(frontmatter: { title: { eq: $title } }) {
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        author
        tags
        categories
      }
      tableOfContents(absolute: false, pathToSlugField: "frontmatter.title")
    }
  }
`

export default Blog
