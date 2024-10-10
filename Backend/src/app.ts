import express from "express";
import expressFileUpload from "express-fileupload";
import { appConfig } from "./2-utils/app-config";
import { errorsMiddleware } from "./4-middleware/errors-middleware";
import { loggerMiddleware } from "./4-middleware/logger-middleware";
import { securityMiddleware } from "./4-middleware/security-middleware";
import { authRouter } from "./6-controllers/auth-controller";
import cors from "cors";
import expressRateLimit from "express-rate-limit";
import { vacationsRouter } from "./6-controllers/vacations-controller";
import { likesRouter } from "./6-controllers/likes-controller";
import { Request, Response } from 'express';

class App {

    public server = express();

    public start(): void {

        // Max requests allowed per IP during the window period:
        this.server.use(expressRateLimit({
            windowMs: 1000,
            limit: Infinity,
            skip: securityMiddleware.skipRateLimit
        }));

        // Enable CORS for any frontend website:
        this.server.use(cors());

        // Create a request.body containing the frontend json:
        this.server.use(express.json());

        // Create request.files containing uploaded files: 
        this.server.use(expressFileUpload());

        // Register middleware:
        this.server.use(loggerMiddleware.logToConsole);

        // Connect all controllers to the server:
        
        this.server.use('/api', authRouter);
        this.server.get("/", (request: Request, response: Response) => response.send("<h1>Welcome to Vacation Provocation REST API</h1>"));        
        this.server.use('/api/vacations', vacationsRouter);
        this.server.use("/api/likes", likesRouter);


        // Route not found middleware: 
        this.server.use(errorsMiddleware.routeNotFound);

        // Catch all middleware: 
        this.server.use(errorsMiddleware.catchAll);

        // Run server: 
        this.server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
    }


}

export const app = new App();
app.start();
