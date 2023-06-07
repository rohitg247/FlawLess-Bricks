// services/UserService.js
import { User } from "next-auth";
import { IUserService } from "./IUserService";
import { compare } from "bcryptjs";
import signUpData from "api-helper/model/signUpData";

class InMemoryUserService {
    signInCredentials(email, password) {
        const user = signUpData.find({ email })
        if (!user) {
            return Error("INvalid")
        }
        else if (user) {
            const emailFound = email === user.email;
            const isPasswordCorrect = compare(password, user.password);
            const userFound = emailFound && isPasswordCorrect;
            return userFound;
        }
        return user;
    }
}

const userService = new InMemoryUserService();

module.exports = { InMemoryUserService, userService };