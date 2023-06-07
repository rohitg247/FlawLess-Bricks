// nextauth.js
import { DefaultSession, DefaultUser } from "next-auth";

// Define a role enum
export const Role = {
    user: "user",
    admin: "admin",
};

// common interface for JWT and Session
export const IUser = {
    role: Role,
};

// Extend the User and Session interfaces from next-auth
Object.assign(DefaultUser.prototype, IUser);

Object.assign(DefaultSession.prototype, { user: DefaultUser });

// Extend the JWT interface from next-auth/jwt
Object.assign(require("next-auth/jwt").JWT.prototype, IUser);
