// services/IUserService.js
import { User } from "next-auth";

class IUserService {
    signInCredentials(email, password) {
        return Promise.resolve(/* implementation of signInCredentials method */);
    }
}

export default IUserService;
