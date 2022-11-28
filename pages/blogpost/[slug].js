import React ,{useState,useEffect} from 'react';

import styles from '../../styles/BlogPost.module.css'
import { useRouter } from 'next/router';
import * as fs from 'fs'
// Step1 : find file corresponding to slug 
// Step2 : populate them inside the page.
const Slug = (props) => {
    const [blog,setBlog]=useState(props.myBlog);
    // const router=useRouter();
    // useEffect(() =>{
    //   if(!router.isReady) return;
    //   const { slug }=router.query;
    //   fetch(`http://localhost:3000/api/getBlogs?slug=${slug}`).then((a)=>{
    //   return a.json();
    // }).then((parsed) =>{
    //   // console.log(parsed)
    //   setBlog(parsed)
    // })
    // },[router.isReady])
   

  return (
    
    <div className={styles.container}>
      <main className={styles.main}>
      <h1>{blog && blog.title}</h1>
      <hr />
      <div>
        {blog && blog.content}
      </div>
      </main>
    </div>
  )
}
export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: 'how-to-learn-js' } },
          { params: { slug: 'how-to-learn-react' } },
          { params: { slug: 'how-to-learn-next' } }],
    fallback: true, // can also be true or 'blocking'
  }
}
// export async function getServerSideProps(context) {
  
//   const { slug } = context.params;
//   let data = await fetch(`http://localhost:3000/api/getBlogs?slug=${slug}`)
//   let myBlog = await data.json()
//   return {
//   props: {myBlog}, // will be passed to the page component as props
//   }
// }
export async function getStaticProps(context) {
  const { slug } = context.params;
  let myBlog = await fs.promises.readFile(`Blogdata/${slug}.json`,'utf-8');
  //,(err,data) => {
    //console.log(typeof JSON.parse(data)) // after parsing the data it becomes a js object before it was a string 
    return{
      props: {myBlog : JSON.parse(myBlog)},
    }
}
export default Slug;
