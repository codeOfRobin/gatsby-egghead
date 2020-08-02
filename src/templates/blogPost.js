import React from "react"
import { graphql, Link } from "gatsby"

const Template = ({ data, pageContext }) => {
  const title = data.markdownRemark.frontmatter.title
  const html = data.markdownRemark.html
  const { prev, next } = pageContext
  console.log(prev)
  return (
    <div>
      <h1 style={{ fontFamily: "avenir" }}> {title} </h1>
      <div
        className="blogPost"
        dangerouslySetInnerHTML={{ __html: html }}
        style={{ fontFamily: "avenir" }}
      />
      {prev && <Link to={prev.node.frontmatter.path}>Prev</Link>}
      {next && <Link to={next.node.frontmatter.path}>Next</Link>}
    </div>
  )
}

export const pageQuery = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default Template
