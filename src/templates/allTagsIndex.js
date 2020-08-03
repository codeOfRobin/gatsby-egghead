import React from "react"
import { graphql, Link } from "gatsby"
import Header from "../components/Header"
const AllTagsTemplate = ({ data, pageContext }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "avenir",
      }}
    >
      <h1>Tags</h1>
      {pageContext.tags.map(tag => {
        return (
          <Link key={`${tag}`} to={`/tags/${tag}`}>
            {tag}
          </Link>
        )
      })}
    </div>
  )
}

export default AllTagsTemplate
