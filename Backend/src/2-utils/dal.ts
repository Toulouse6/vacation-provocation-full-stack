import mysql2, { PoolOptions, QueryError } from "mysql2";
import { appConfig } from "./app-config";

// DAL = Data Access Layer:
class DAL {

    // Database configuration:
    private options: PoolOptions = {
        host: appConfig.mysqlHost,
        user: appConfig.mysqlUser,
        password: appConfig.mysqlPassword,
        database: appConfig.mysqlDatabase
    }

    // Creating a connection. If closed, the pool will create another one:
    private readonly connection = mysql2.createPool(this.options);

    // Execute sql: 
    public execute(sql: string, values?: any[]): Promise<any> { // To Promisify
        return new Promise<any>((resolve, reject) => {
            this.connection.query(sql, values, (err: QueryError, result: any) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
}

export const dal = new DAL();
