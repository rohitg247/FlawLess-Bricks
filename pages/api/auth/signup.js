import { addUser, getAllUserDetails } from "../../../api-helper/model/controller/login-controller";
import { connectToDataBase } from "../../../utils/dbConnection";



export default async function handler(req, res) {
  try {
    await connectToDataBase();

    if (req.method == "GET") {
      getAllUserDetails(req, res);
    }
    else if (req.method === "POST") {
      addUser(req, res)
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}







// export default async function handler(req, res) {
//   connectToDataBase();

//   } else if (req.method == "POST") {
//     addUser(req, res)
//   }
// }   