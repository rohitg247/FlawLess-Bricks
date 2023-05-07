import { getUserDetails } from "../../api-helper/model/controller/login-controller";
import { connectToDataBase } from "../../utils/dbConnection";

export default async function handler(req, res) {
    connectToDataBase();
    if (req.method == "POST") {
        getUserDetails(req, res)
    }
}   