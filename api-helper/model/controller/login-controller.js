import SignUp from "../signUpData";

export const getAllUserDetails = async (res, req) => {
  let login;
  try {
    login = await SignUp.find();
  } catch (err) {
    return new Error(err);
  }

  if (!login) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
  if (login.length === 0) {
    return res.status(404).json({ message: "No Data Found" });
  }
  return res.status(200).json({ login });
};

export const addUser = async (req, res) => {
  console.log(req.body);
  const { firstname, lastname, email, password, access } = req.body;
  if (
    !firstname &&
    firstname.trim() === "" &&
    !lastname &&
    lastname.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === "" &&
    !access &&
    access.trim() === ""
  ) {
    return req.status(422).json({ message: "Enter Valid Inputs" });
  }

  let login;

  try {
    login = new SignUp({ firstname, lastname, email, password, access });
    login = await login.save();
  } catch (err) {
    return new Error(err);
  }

  if (!login) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
  return res.status(201).json({ login });
};

export const getUserDetails = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email)

  if (!email || !password) {
    return res.status(400).json({ message: "enter valid details" })
  }

  let login;
  try {
    login = await SignUp.findOne({ email: email })
  } catch (err) {
    return new Error(err);
  }
  if (login.length === 0) {
    res.status(402).json({ message: "NO user found" })
  }
  else if (login.email === email && login.password === password) {
    res.status(200).json({
      status: "success",
      access: login.access,
      username: login.firstname
    })
  }

};