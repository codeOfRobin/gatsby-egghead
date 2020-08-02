const { graphql } = require("gatsby")
const path = require("path")

const createTagPages = (createPage, posts) => {
  const allTagsIndexTemplate = path.resolve("src/templates/allTagsIndex.js")
  const singleTagIndexTemplate = path.resolve("src/templates/singleTagIndex.js")

  const postsByTag = {}

  posts.forEach(({ node }) => {
    console.log(`tags:${node.frontmatter.tags}`)
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (!postsByTag[tag]) {
          postsByTag[tag] = []
        }
        postsByTag[tag].push(node)
      })
    }
  })

  const tags = Object.keys(postsByTag)

  createPage({
    path: "/tags",
    component: allTagsIndexTemplate,
    context: {
      tags: tags.sort(),
    },
  })

  console.log(tags)

  tags.forEach(tag => {
    createPage({
      path: `/tags/${tag}`,
      component: singleTagIndexTemplate,
      context: {
        tag: tag,
      },
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve("src/templates/blogPost.js")
  const result = await graphql(
    `
      query {
        allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
          edges {
            node {
              frontmatter {
                path
                title
                tags
              }
            }
          }
        }
      }
    `
  )

  const posts = result.data.allMarkdownRemark.edges

  createTagPages(createPage, posts)

  posts.forEach(({ node }, index) => {
    const path = node.frontmatter.path
    createPage({
      path,
      component: blogPostTemplate,
      context: {
        pathSlug: path,
        prev: index === 0 ? null : posts[index - 1],
        next: index === posts.length - 1 ? null : posts[index + 1],
      },
    })
  })
}
