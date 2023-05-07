import Contact from "../contactData";

export const getAllContactData = async (req, res) => {
  let contact;
  try {
    contact = await Contact.find()
  } catch (err) {
    return new Error(err);
  }

  if (!contact) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
  if (contact.length === 0) {
    return res.status(404).json({ message: "No Data Found" });
  }
  return res.status(200).json({ contact });
};

export const addContact = async (req, res) => {
  const { name, email, phone, purpose, city, message } = req.body;
  console.log(req.body);
  // if (
  //   !name &&
  //   !email &&
  //   !phone &&
  //   !purpose &&
  //   !city
  // ) {
  //   return res.status(422).json({ message: "Enter Valid Inputs" });
  // }

  let contact;

  try {
    contact = new Contact({ name, email, phone, purpose, city, message });
    contact = await contact.save();
  } catch (err) {
    return new Error(err);
  }

  if (!contact) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
  return res.status(201).json({ contact });
};

export const getUserDetails = async (req, res) => {
  const id = req.query.id;

  let contact;
  try {
    contact = await contact.findById(id);
  } catch (err) {
    return new Error(err);
  }

  if (!contact) {
    return res.status(500).json("Internal Server Error");
  }
  return res.status(200).json({ contact });
};