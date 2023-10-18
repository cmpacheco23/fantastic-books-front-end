import { Link } from "react-router-dom";

import styles from "./BlogCard.module.css";

const BlogCard = ({blog}) => {
  const titleLength = 200

  const shorterBlogText =
    blog.text.length > titleLength
      ? blog.text.substring(0, titleLength)
      : blog.text

  return (
    <Link className={styles.blogCard} to={`/blogs/${blog._id}`}> 
      <article className={styles.container}>
        <header>
          <span>
            <h1>{blog.blogTitle}</h1>
          </span>
          <h4>Created By: {blog.blogger.name}</h4>
        </header>
        <p>{shorterBlogText}</p>
      </article>
    </Link>
  )
}

export default BlogCard