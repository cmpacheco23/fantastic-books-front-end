import { Link } from "react-router-dom";

import styles from "./BlogCard.module.css";

const BlogCard = ({blog}) => {
  return (
    <Link to={`/blogs/${blog._id}`}>
      <article className={styles.container}>
        <header>
          <span>
            <h1>{blog.blogTitle}</h1>
          </span>
          <h4>{blog.blogger.name}</h4>
        </header>
        <p>{blog.text}</p>
      </article>
    </Link>
  )
}

export default BlogCard