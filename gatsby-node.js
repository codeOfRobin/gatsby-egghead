const { graphql } = require("gatsby")
const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve("src/templates/blogPost.js")
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          query {
            allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    path
                  }
                }
              }
            }
          }
        `
      )
    )
  }).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      console.log(node)
      const path = node.frontmatter.path
      createPage({
        path,
        component: blogPostTemplate,
        context: {
          pathSlug: path,
        },
      })
    })
  })
}
