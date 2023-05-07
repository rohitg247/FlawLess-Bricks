import mongoose from "mongoose";

export const connectToDataBase = async () => {

mongoose
    .connect(
        "mongodb+srv://rohitg247:KRT3Vv7OMoyepEjD@cluster0.pkxcjqu.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("connected"))
    .catch((err) => console.log(err));
};