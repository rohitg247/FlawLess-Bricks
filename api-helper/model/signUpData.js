import mongoose from "mongoose";
const Schema = mongoose.Schema;

const signUpSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  access: {
    type: String,
    required: true,
  },
});
export default mongoose.models.SignUp || mongoose.model("SignUp", signUpSchema);