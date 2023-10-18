// css
import styles from './BlogList.module.css'

// import { useState } from 'react';

const BlogList = (props) => {


  console.log('BlogList props:', props)
  return (
    <main className={styles.container}>
      <div className={styles.spacer}></div>
      <h1>BLOG LIST</h1>
      {props.blogs.map(blog => (
        <p key={blog._id}>
          {blog.blogTitle} </p>
      ))}
    </main>
  )
}

export default BlogList