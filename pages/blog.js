import React, { useEffect, useState } from 'react'
import styles from '../styles/Blog.module.css'
import Link from 'next/link'
import * as fs from 'fs';
// step 1 : collect all the files from Blogdata json directory.
// step 2 : Iterate through them and display them.

const Blog = (props) => {
  console.log(props)
  const [blogs,setBlogs] = useState(props.allBlogs)
  // useEffect(() => {
  //   console.log("useEffect is running !!")
  //   fetch('http://localhost:3000/api/blogs').then((a)=>{
  //     return a.json();
  //   }).then((parsed) =>{
  //     // console.log(parsed)
  //     setBlogs(parsed)
  //   })
  // },[])

  return (
      <div className="blogs">
       <main className={styles.main}>
        {blogs.map((blogitem) => {
          return <div key={blogitem.slug}>
          <Link href={`/blogpost/${blogitem.slug}`}>
          <h3 className={styles.blogposth3}>{blogitem.title}</h3></Link>
          <p className={styles.blogitemsp}>{blogitem.metadesc.substr(0,150)}...</p>
        </div>
        })}
      </main>
      </div>
  )
}

// export async function getServerSideProps(context) {
  
//     let data = await fetch('http://localhost:3000/api/blogs')
//     let allBlogs = await data.json()
//     return {
//     props: {allBlogs}, // will be passed to the page component as props
//   }
// }
export async function getStaticProps(context) {
  
  let data=await fs.promises.readdir("Blogdata")
  let myfile;
  let allBlogs=[]
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    //console.log(element)
    myfile=await fs.promises.readFile('Blogdata/'+element,'utf-8')
    allBlogs.push(JSON.parse(myfile))
  }
  return {
  props: {allBlogs}, // will be passed to the page component as props
 }
}

export default Blog
