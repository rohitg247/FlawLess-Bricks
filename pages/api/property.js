import createProperty from 'api-helper/model/controller/propertydata-controller';
import { connectToDataBase } from 'utils/dbConnection';

export default async function handler(req, res) {
    connectToDataBase()
    if (req.method === 'POST') {
        createProperty(req, res)
        return;
    }
    else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
