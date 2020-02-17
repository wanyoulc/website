import { Link, graphql, useStaticQuery } from 'gatsby'
import React, { useState } from 'react'

import SearchIcon from '@material-ui/icons/Search'
import cx from 'classnames'

const BlogSearch = ({ className }) => {
  let { blogs } = useStaticQuery(graphql`
    query {
      blogs: allMarkdownRemark(
        filter: { fields: { collection: { eq: "markdown-pages/blogs" } } }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)
  blogs = blogs.edges.map(edge => edge.node)

  const blogSearchclassName = cx('PingCAP-BlogSearch', className)

  const [withPanel, setWithPanel] = useState(false)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState(null)

  const handleSearchOnChange = e => {
    const value = e.target.value

    setSearch(value)

    if (value.length > 3) {
      setWithPanel(true)
      setSearchResults(
        blogs.filter(blog =>
          blog.frontmatter.title.toLowerCase().includes(value.toLowerCase())
        )
      )
    } else {
      setWithPanel(false)
      setSearchResults(null)
    }
  }

  return (
    <section className={blogSearchclassName}>
      <div className="field">
        <div className="control has-icons-left">
          <input
            className={`input${withPanel ? ' with-panel' : ''}`}
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearchOnChange}
          />
          <span className="icon is-small is-left">
            <SearchIcon />
          </span>
        </div>
      </div>
      {searchResults && (
        <div className="panel">
          {searchResults
            .map(blog => blog.frontmatter.title)
            .map(title => (
              <Link
                key={title}
                className="panel-block"
                to={`/blog/${title
                  .replace(/[?%]/g, '')
                  .split(' ')
                  .join('-')}`}
              >
                {title}
              </Link>
            ))}
        </div>
      )}
    </section>
  )
}

export default BlogSearch