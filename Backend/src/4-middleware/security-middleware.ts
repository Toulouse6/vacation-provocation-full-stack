import { NextFunction, Request, Response } from "express";
import { cyber } from "../2-utils/cyber";
import { UnauthorizedError } from "../3-models/client-errors";

class SecurityMiddleware {

    // Verify login:
    public verifyLoggedIn(request: Request, response: Response, next: NextFunction): void {

        // Get authorization header: 
        const authorizationHeader = request.header("authorization");
        const token = authorizationHeader?.substring(7); // 7 --> token index

        if (!cyber.isTokenValid(token)) {
            return response.redirect("/login");
        }

        next();
    }

    // Verify admin:
    public verifyAdmin(request: Request, response: Response, next: NextFunction): void {

        const authorizationHeader = request.header("authorization");
        const token = authorizationHeader?.substring(7);

        if (!cyber.isAdmin(token)) {
            const err = new UnauthorizedError("You are not authorized.");
            next(err);
        }
        else {
            next();
        }
    }

    // Skip rate limiting for image fetching and during tests
    public skipRateLimit(request: Request, response: Response): boolean {

        return request.originalUrl.startsWith("/api/vacations/images/") ||
            request.headers['x-skip-rate-limit'] === 'true';
    }

}

export const securityMiddleware = new SecurityMiddleware();
