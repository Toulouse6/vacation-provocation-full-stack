import { UserModel } from "../3-models/user-model";
import jwt, { SignOptions } from "jsonwebtoken";
import { appConfig } from "./app-config";
import { RoleModel } from "../3-models/role-model";
import crypto from "crypto";

class Cyber {

    public getNewToken(user: UserModel): string {

        // Remove password from user: 
        delete user.password;

        // Create container object containing the user:
        const container = { user };

        // Create options:
        const options: SignOptions = { expiresIn: "5h" };

        // Create & return token:
        const token = jwt.sign(container, appConfig.jwtSecretKey, options);
        return token;
    }


    // Check if token is valid:
    public isTokenValid(token: string): boolean {
        // If no token:
        try {
            if (!token) return false;

            // Verify token & return if verified:
            jwt.verify(token, appConfig.jwtSecretKey);
            return true;
        }
        // Token is not valid.
        catch (err: any) {
            return false;
        }
    }


    // Check if user is admin:
    public isAdmin(token: string): boolean {

        // Extract container from token:
        const container = jwt.decode(token) as { user: UserModel };

        // Extract user from container:
        const user = container.user;

        // Return true if user is Admin:
        return user.roleId === RoleModel.Admin;
    }


    // Hash password:
    public hashPassword(plainText: string): string {

        // SHA = Secured Hashing Algorithm
        // HMAC = Hash-Based Message Authentication Code 
        const hashedPassword = crypto.createHmac("sha512", appConfig.passwordSalt).update(plainText).digest("hex");
        return hashedPassword;
    }

}

export const cyber = new Cyber();
