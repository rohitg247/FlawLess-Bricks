import mongoose from "mongoose";
const Schema = mongoose.Schema;

const contactDataSchema = new Schema({
  // name, email, phone, purpose, city, message
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
});
export default mongoose.models.Contact || mongoose.model("Contact", contactDataSchema);