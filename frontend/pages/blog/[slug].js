import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import {getPostBySlug, getPosts} from '../../utils/ghost/ghostService'
import Tag from '../../components/blog/Tag'
import styles from '../../styles/Home.module.css'

export async function getStaticPaths() {
  // Getting possible paths for page creations
  // TODO request only slugs
  const posts = await getPosts()

  return {
    paths: posts.map((post) => {
      return {params: {slug: post.slug}}
    }),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const postSlug = context.params.slug
  let post = await getPostBySlug(postSlug)
  return {
    props: {
      post: post,
    },
  }
}

function getShareUrl(platform, post) {
  if (platform === 'linkedin') {
    let encodedPostUrl = encodeURIComponent(post.url + '?utm_source=linkedin&utm_medium=share')
    return `http://www.linkedin.com/sharing/share-offsite/?url=${encodedPostUrl}`
  }
  if (platform === 'facebook') {
    let encodedPostUrl = encodeURIComponent(post.url + '?utm_source=facebook&utm_medium=share')
    return `https://www.facebook.com/sharer/sharer.php?u=${encodedPostUrl}`
  }
  if (platform === 'twitter') {
    let encodedPostTitle = encodeURIComponent(post.title)
    let encodedPostUrl = encodeURIComponent(post.url + '?utm_source=twitter&utm_medium=share')
    return `https://twitter.com/intent/tweet?text=${encodedPostTitle}&url=${encodedPostUrl}`
  }
  if (platform === 'email') {
    let encodedPostTitle = encodeURIComponent(post.title)
    let encodedPostUrl = encodeURIComponent(post.url + '?utm_source=email&utm_medium=share')
    return `mailto:?subject=${encodedPostTitle}&body=${encodedPostUrl}`
  }
}

const BlogPost = ({post}) => {
  const authors =
    post.authors !== undefined ? post.authors.map((author) => author.name).join(', ') : ''
  const tags = post.tags !== undefined ? post.tags.map((tag) => <Tag tag={tag}/>) : []
  const structuredDataMarkup = {
    '@context': 'http://schema.org',
    '@type': 'Article',
    'name': post.meta_title || post.title,
    'author': {
      '@type': 'Person',
      'name': authors,
    },
    'datePublished': post.published_at,
    'image': post.feature_image,
    'url': post.url,
  }

  const copyToClipboard = (url) => {
    if (typeof window !== 'undefined') {
      const copyUrl = url !== undefined ? url : window.location.href
      const el = document.createElement('input')
      el.value = copyUrl
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
  }

  return (
    <>
      <Head>
        <title>{post.title} | YourWebsite</title>
        <meta name="title" content={post.meta_title || post.title}/>
        <meta name="description" content={post.meta_description || post.excerpt}/>
        {/* OG Meta (https://ogp.me/)*/}
        <meta property="og:type" content="article"/>
        <meta property="og:locale" content="en_US"/>
        <meta property="og:site_name" content="yourwebsite"/>
        <meta property="og:title" content={post.meta_title || post.title}/>
        <meta property="og:description" content={post.meta_description || post.excerpt}/>
        <meta property="og:url" content={post.url}/>
        <meta
          property="og:image"
          content={post.feature_image || `${process.env.NEXT_PUBLIC_SITE_URL}/images/BackLogo.png`}
        />
        {/* Twitter Meta */}
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:site" content="yourwebsite"/>
        <meta property="twitter:label1" content="Reading time"/>
        <meta property="twitter:data1" content={`${post.reading_time} min`}/>
        <meta property="twitter:title" content={post.title}/>
        <meta
          property="twitter:image:src"
          content={post.feature_image || `${process.env.NEXT_PUBLIC_SITE_URL}/images/BackLogo.png`}
        />
        <meta property="twitter:description" content={post.meta_description || post.excerpt}/>

        {/* Article Meta (https://ogp.me/) */}
        <meta property="article:published_time" content={post.published_at}/>
        <meta property="article:author" content={authors}/>
        {post.tags !== undefined &&
        post.tags.map((tag) => <meta property="article:tags" content={tag.name}/>)}

        {/* Structured Data Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(structuredDataMarkup)}}
        />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className="row">
          <div className="blog-meta">
            <div className="blog-tags">{tags}</div>
            <div className="blog-info">
              <div className="blog-author">
                by <b>{authors}</b>
              </div>
              <div className="blog-date">{post.published_at}</div>
            </div>
          </div>

          {/* Article content */}
          <div className="blog-post" dangerouslySetInnerHTML={{__html: post.html}}/>
        </div>
      </main>
    </>
  )
}

export default BlogPost
