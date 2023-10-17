// css
import styles from './BlogList.module.css'
// import { useState } from 'react';

const BlogList = (props) => {
  console.log('BlogList props:', props)
  return (
    <main className={styles.container}>
      Blog List
    </main>
  )
}

export default BlogList