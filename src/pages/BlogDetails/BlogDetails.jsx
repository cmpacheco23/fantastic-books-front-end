// css
import { useParams } from 'react-router-dom'
import styles from './BlogDetails.module.css'
import { useEffect, useState } from 'react'

import * as blogService from '../../services/blogService';

const BlogDetails = (props) => {

  const {blogId} = useParams()
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    const fetchBlog = async () => {
      const data = await blogService.show(blogId)
      setBlog(data)
    }
    fetchBlog()
  }, [blogId])

  console.log('Blog State:', blog)
  return (
    <main>
      <div className={styles.spacer}></div>
      <h1>{blog ? blog.blogTitle : 'Loading...'}</h1>
      {blog && (
        <>
          <h4>Author: {blog.blogger.name}</h4>
          <p>{blog.text}</p>
        </>
      )}
    </main>
    )
}

export default BlogDetails