import * as fs from 'fs';
import { addContact, getAllContactData } from '../../api-helper/model/controller/contactdata-controller';
import { connectToDataBase } from "../../utils/dbConnection";

export default async function handler(req, res) {
  connectToDataBase();
  if (req.method === 'POST') {
    // Process a POST request
    addContact(req, res);
    // let data = await fs.promises.readdir('contactdata');
    // fs.promises.writeFile(`contactdata/${data.length+1}.json`, JSON.stringify(req.body))
    // res.status(200).json(req)
  }
  else if (req.method === 'GET') {
    getAllContactData(req, res);

  }

  else {
    // Handle any other HTTP method
    res.status(200).json(["allokay"])
    // name, email , desc
  }
}