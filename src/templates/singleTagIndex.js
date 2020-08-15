import React from "react"
import { graphql, Link } from "gatsby"
import Header from "../components/Header"
const SingleTagTemplate = ({ data, pageContext }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "avenir",
      }}
    >
      <h1>Posts about "{pageContext.tag}"</h1>
      {pageContext.posts.map(post => {
        return (
          <Link key={post.frontmatter.path} to={post.frontmatter.path}>
            {post.frontmatter.title}
          </Link>
        )
      })}
    </div>
  )
}

export default SingleTagTemplate
