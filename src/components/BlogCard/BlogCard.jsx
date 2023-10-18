import { Link } from "react-router-dom";

import styles from "./BlogCard.module.css";

const BlogCard = ({blog}) => {
  const titleLength = 200

  const shorterBlogTitle =
    blog.text.length > titleLength
      ? blog.text.substring(0, titleLength)
      : blog.text

  return (
    <article className={styles.container}>
        <header>
          <span>
            <h1>{blog.blogTitle}</h1>
          </span>
          <h4>Created By: {blog.blogger.name}</h4>
        </header>
        <p>{shorterBlogTitle}</p>
        <Link to={`/blogs/${blog._id}`}>
          <button> Read Blog</button>
    </Link>
      </article>
  )
}

export default BlogCard