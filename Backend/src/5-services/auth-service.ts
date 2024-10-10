import { OkPacketParams } from "mysql2";
import { UserModel } from "../3-models/user-model";
import { dal } from "../2-utils/dal";
import { cyber } from "../2-utils/cyber";
import { CredentialsModel } from "../3-models/credentials-model";
import { UnauthorizedError, ValidationError } from "../3-models/client-errors";
import { RoleModel } from "../3-models/role-model";

class AuthService {

    // Register new user:
    public async register(user: UserModel): Promise<string> {

        user.validateInsert();

        // email is taken validation:
        const isTaken = await this.isEmailTaken(user.email);
        if (isTaken) throw new ValidationError("Email already taken.");

        // Init roleId as regular user:
        user.roleId = RoleModel.User;

        // Hash password:
        user.password = cyber.hashPassword(user.password);

        // Create Prepared Statement & const info: 
        const sql = "INSERT INTO users(firstName, lastName, email, password, roleId) VALUES(?,?,?,?,?)";
        const info: OkPacketParams = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.roleId]);

        // Set back auto increment id:
        user.id = info.insertId;

        // Create new token: 
        const token = cyber.getNewToken(user);
        return token;
    }


    // Login existing user:
    public async login(credentials: CredentialsModel): Promise<string> {

        credentials.validate();
        credentials.password = cyber.hashPassword(credentials.password);

        const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
        const users = await dal.execute(sql, [credentials.email, credentials.password]);
        const user = users[0];

        if (!user) throw new UnauthorizedError("Incorrect email or password.");

        // Create new token: 
        const token = cyber.getNewToken(user);
        return token;
    }


    // Is email taken:
    private async isEmailTaken(email: string): Promise<boolean> {

        const sql = `SELECT EXISTS(SELECT * FROM users WHERE email = '${email}') AS isTaken`;
        const result = await dal.execute(sql);
        const isTaken = result[0].isTaken;
        return isTaken === 1;
    }


}

export const authService = new AuthService();
