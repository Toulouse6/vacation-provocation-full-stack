import express, { NextFunction, Request, Response } from "express";
import { vacationsService } from "../5-services/vacations-service";
import { VacationModel } from "../3-models/vacation-model";
import { fileSaver } from "uploaded-file-saver";
import { StatusCode } from "../3-models/enums";
import { securityMiddleware } from "../4-middleware/security-middleware";


class VacationsController {

    public router = express.Router();

    public constructor() {
        this.registerRoutes();
    }

    private registerRoutes(): void {

        this.router.get('/', securityMiddleware.verifyLoggedIn, this.getAllVacations.bind(this));
        this.router.get('/:id(\\d+)', securityMiddleware.verifyLoggedIn, this.getOneVacation.bind(this));
        this.router.get('/upcoming', securityMiddleware.verifyLoggedIn, this.getUpcomingVacations.bind(this));
        this.router.get('/active', securityMiddleware.verifyLoggedIn, this.getActiveVacations.bind(this));
        this.router.get('/favorites/:userId', securityMiddleware.verifyLoggedIn, this.getFavoriteVacations.bind(this));
        this.router.post('/', securityMiddleware.verifyLoggedIn, securityMiddleware.verifyAdmin, this.addVacation.bind(this));
        this.router.put('/:id(\\d+)', securityMiddleware.verifyLoggedIn, securityMiddleware.verifyAdmin, this.editVacation.bind(this));
        this.router.delete('/:id(\\d+)', securityMiddleware.verifyLoggedIn, securityMiddleware.verifyAdmin, this.deleteVacation.bind(this));
        this.router.get('/images/:imageName', this.getImageFile.bind(this));

    }


    // GET http://localhost:4000/api/vacations
    private async getAllVacations(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const vacations = await vacationsService.getAllVacations();
            response.json(vacations); // Status = 200
        }
        catch (err: any) { next(err); }
    }


    // GET http://localhost:4000/api/vacations/:id(\\d+)
    private async getOneVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const id = +request.params.id;
            const vacation = await vacationsService.getOneVacation(id);
            response.json(vacation); // status = 200
        }
        catch (err: any) { next(err); }
    }


    // GET http://localhost:4000/api/vacations/upcoming/
    private async getUpcomingVacations(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const vacations = await vacationsService.getUpcomingVacations();
            response.json(vacations);
        }
        catch (err: any) { next(err); }
    }


    // GET http://localhost:4000/api/vacations/active/
    private async getActiveVacations(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const vacations = await vacationsService.getActiveVacations();
            response.json(vacations);
        }
        catch (err: any) { next(err); }
    }


    // GET http://localhost:4000/api/favorites/:userId(\\d+)
    private async getFavoriteVacations(request: Request, response: Response): Promise<void> {
        try {
            const userId = parseInt(request.params.userId);
            if (isNaN(userId)) {
                response.status(400).send("Invalid user ID");
                return;
            }
            const favoriteVacations = await vacationsService.getFavoriteVacations(userId);
            response.json(favoriteVacations);
        } catch (error) {
            console.error('Error fetching favorite vacations:', error);
            response.status(500).send('Error fetching favorite vacations');
        }
    }


    // POST http://localhost:4000/api/vacations/add
    private async addVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            request.body.image = request.files?.image;
            const vacation = new VacationModel(request.body);
            const addedVacation = await vacationsService.addVacation(vacation);
            response.status(StatusCode.Created).json(addedVacation);
        }
        catch (err: any) { next(err); }
    }


    // PUT http://localhost:4000/api/vacations/edit/:id(\\d+)
    private async editVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            request.body.id = +request.params.id;
            request.body.image = request.files?.image;
            const vacation = new VacationModel(request.body);
            const editedVacation = await vacationsService.EditVacation(vacation);
            response.json(editedVacation); // Status = 200
        }
        catch (err: any) { next(err); }
    }


    // DELETE http://localhost:4000/api/vacations/:id(\\d+)
    private async deleteVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const id = +request.params.id;
            await vacationsService.deleteVacation(id);
            response.sendStatus(StatusCode.NoContent); // status + send
        }
        catch (err: any) { next(err); }
    }


    // GET http://localhost:4000/vacations/images/:imageName
    private async getImageFile(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const imageName = request.params.imageName;
            const imagePath = fileSaver.getFilePath(imageName, true);
            response.sendFile(imagePath);
        }
        catch (err: any) { next(err); }
    }


}

const vacationsController = new VacationsController();
export const vacationsRouter = new VacationsController().router;
