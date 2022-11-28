// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//http://localhost:3000/api/getBlogs?slug=how-to-learn-js
import * as fs from 'fs';
export default function handler(req, res) {
  //console.log(res)
  fs.readFile(`Blogdata/${req.query.slug}.json`,'utf-8',(err,data) => {
    console.log(typeof JSON.parse(data)) // after parsing the data it becomes a js object before it was a string 
    if (err){
      res.status(500).json({error: "No such blog found"})
    }
    console.log(req.query.slug)
    res.status(200).json(JSON.parse(data))
  })
  
}
