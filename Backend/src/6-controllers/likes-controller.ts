import express, { Request, Response } from "express";
import { likesService } from "../5-services/likes-service";

class LikesController {

    public readonly router = express.Router();

    public constructor() {
        this.registerRoutes();
    }

    private registerRoutes(): void {

        this.router.get('/exists/:userId/:vacationId', this.checkLikeExists.bind(this));
        this.router.post('/:userId/:vacationId', this.addLike);
        this.router.delete('/:userId/:vacationId', this.removeLike);
        this.router.get('/user/:userId', this.getUserLikes.bind(this));
        this.router.get('/reports', this.getAllVacationsWithLikes.bind(this));
    }


    // GET http://localhost:4000/api/exists/:userId/:vacationId
    private async checkLikeExists(req: Request, res: Response): Promise<void> {

        const { userId, vacationId } = req.params;

        // Check if a like exists for userId & vacationId using likesService:
        const exists = await likesService.likeExists(Number(userId), Number(vacationId));
        res.json({ exists });
    }


    // POST http://localhost:4000/api/:userId/:vacationId
    private async addLike(req: Request, res: Response): Promise<void> {

        const { userId, vacationId } = req.params;

        // Add like for userId & vacationId:
        await likesService.addLike(Number(userId), Number(vacationId));
        res.status(201).json({ message: 'Like added' });
    }


    // DELETE http://localhost:4000/api/:userId/:vacationId
    private async removeLike(req: Request, res: Response): Promise<void> {

        const { userId, vacationId } = req.params;
        await likesService.removeLike(Number(userId), Number(vacationId));
        res.status(204).send();
    }


    // GET http://localhost:4000/api/user/:userId
    private async getUserLikes(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;
        const likes = await likesService.getUserLikes(Number(userId));
        res.json(likes);
    }


    // GET http://localhost:4000/api/reports
    private async getAllVacationsWithLikes(request: Request, response: Response): Promise<void> {
        try {
            // Get vacations with Like for the Reports:
            const vacationsWithLikes = await likesService.getVacationsWithLikes();
            response.json(vacationsWithLikes);
        }
        catch (error) {
            console.error('Error fetching vacations with likes:', error);
            response.status(500).json({ error: 'Failed to fetch vacations with likes' });
        }
    }


}

export const likesRouter = new LikesController().router;

