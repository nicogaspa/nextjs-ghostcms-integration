import React from 'react'
import Head from 'next/head'
import {getPosts} from '../../utils/ghost/ghostService'
import PostPreview from '../../components/blog/PostPreview'
import styles from '../../styles/Home.module.css'

export async function getStaticProps(context) {
  const posts = await getPosts('authors,tags')
  return {
    props: {
      posts: posts,
    },
  }
}

const BlogListing = ({posts}) => {
  const postsList = posts.map((post, i) => (
    <div key={i} className={styles.card}>
      <PostPreview post={post}/>
    </div>
  ))

  return (
    <>
      <Head>
        <title>Blog | YourWebsite</title>
        <meta name="title" content="Blog | YourWebsite"/>
        <meta
          name="description"
          content="A collection of curated articles"
        />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Blog</h1>
        <div id="blog" >
          <div>{posts.length > 0 ? postsList : <div> Nothing yet... </div>}</div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://github.com/nicogaspa/nextjs-ghostcms-integration">GitHub</a>
      </footer>
    </>
  )
}

export default BlogListing
