import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Tag from './Tag'

const PostPreview = ({post}) => {
  /*TODO limit to N*/
  const authors = post.authors.map((author) => author.name).join(', ')
  const tags = post.tags.map((tag) => <Tag tag={tag}/>)

  return (
    <div className="blog-item">
      <div className="blog-img" >
        {post.feature_image !== null ? (
          <img src={post.feature_image} width="100px" height="100px"/>
        ) : (
          // Default image
          <Image src="/images/default.png" layout="fixed" width="100px" height="100px"/>
        )}
      </div>
      <div className="blog-text" >
        <div className="blog-meta">
          <div className="blog-tags">{tags}</div>
          <div className="blog-info">
            <div className="blog-author">
              by <b>{authors}</b>
            </div>
            <div className="blog-date">{post.published_at}</div>
          </div>
        </div>
        <Link href={post.url}>
          <a><h2>{post.title}</h2></a>
        </Link>
        <p>{post.excerpt}</p>
        <Link href={post.url}>
          <a className="btn read-more">
            Read More ({post.reading_time} min) <i className="fa fa-angle-right"/>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default PostPreview
