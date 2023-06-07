import SignUp from "../signUpData";
import { hash, compare } from "bcryptjs";
// import { connectToMongoDB } from "../../../lib/mongodb";
// import User from "../../../models/user";
import mongoose from "mongoose";
import { signIn } from "next-auth/react";

export const getAllUserDetails = async (req, res) => {
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
  if (!req.body) return res.status(400).json({ error: "Data is missing" });

  const { firstname, lastname, email, password, access } = req.body;

  const userExists = await SignUp.findOne({ email });

  if (userExists) {
    return res.status(409).json({ error: "User Already exists" });
  } else {
    if (password.length < 6)
      return res
        .status(409)
        .json({ error: "Password should be 6 characters long" });

    const hashedPassword = await hash(password, 12);

    const user = new SignUp({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      access,
    })
    user.save().then((result) => res.status(201).json({ message: "user created" })).catch(err => console.log(err))

    // await SignUp.create(
    //   {
    //     firstname,
    //     lastname,
    //     email,
    //     password: hashedPassword,
    //     access,
    //   }
    //   // ,
    //   // (error, data) => {
    //   //   if (error && error instanceof mongoose.Error.ValidationError) {
    //   //     //mongo db will return array
    //   //     // but we only want to show one error at a time
    //   //     for (let field in error.errors) {
    //   //       const msg = error.errors[field].message;
    //   //       return res.status(409).json({ error: msg });
    //   //     }
    //   //   }

    //   //   const user = {
    //   //     email: data.email,
    //   //     firstname: data.firstname,
    //   //     lastname: data.lastname,
    //   //     password: data.password,
    //   //     _id: data._id,
    //   //   };

    //   //   return res.status(201).json({
    //   //     success: true,
    //   //     user,
    //   //   });
    //   // }
    // );

  }
}
export const getUserDetails = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email)

  if (!email || !password) {
    return res.status(400).json({ message: "enter valid details" })
  }
  const hashedPassword = await hash(password, 12);

  let login;


  try {
    login = await SignUp.findOne({ email: email })
    console.log("hp", hashedPassword, "lp", login.password)
  } catch (err) {
    return new Error(err);
  }
  if (login.length === 0) {
    res.status(402).json({ message: "NO user found" })
  }

  else if (login.email === email && compare(password, login.password)) {
    res.status(200).json({
      status: "success",
      access: login.access,
      username: login.firstname
    })
  }

};

export const getErrorMsg = (key, errors) => {
  if (errors.find(err => err.hasOwnProperty(key) !== undefined)) {
    const errorObj = errors.find(err => err.hasOwnProperty(key))
    return errorObj && errorObj[key]
  }
}


export const loginUser = async ({ email, password }) => {
  const res = await signIn("credentials", {
    redirect: false,
    email,
    password
  })

  return res
}