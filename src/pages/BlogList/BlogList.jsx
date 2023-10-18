// css
import styles from './BlogList.module.css'
import BlogCard from '../../components/BlogCard/BlogCard'
// import { useState } from 'react';

import { NavLink } from 'react-router-dom'

const BlogList = (props) => {

  return (
    <main className={styles.container}>
      <div className={styles.spacer}></div>
      <NavLink to="/blogs/new">NEW BLOG</NavLink>
      <div className={styles.spacer}></div>
      <h1>BLOG LIST</h1>
      {props.blogs.map(blog => (
        <BlogCard key={blog._id} blog={blog}/>
      ))}
    </main>
  )
}

export default BlogList