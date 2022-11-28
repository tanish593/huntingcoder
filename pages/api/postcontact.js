import * as fs from'fs'
import {parse, stringify} from 'flatted';
export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Process a POST request
      let data=await fs.promises.readdir('contactdata');

      fs.promises.writeFile(`contactdata/${data.length+1}.json`,JSON.stringify(req.body))
      const updated=stringify(req);
      res.status(200).json(updated)
    } else {
      res.status(200).json(["allBlogs"])
    }
  }
  