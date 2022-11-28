// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from 'fs';
export default async function handler(req, res) {
  //console.log(res)
  // fs.readdir("Blogdata",(err,data) => {
  //   console.log(data)
  //   // console.log(typeof data)       (string)
  //   res.status(200).json(data)
  // })
  let data=await fs.promises.readdir("Blogdata")
  let myfile;
  let allBlogs=[]
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    console.log(element)
    myfile=await fs.promises.readFile('Blogdata/'+element,'utf-8')
    allBlogs.push(JSON.parse(myfile))
  }
  res.status(200).json(allBlogs)
}
