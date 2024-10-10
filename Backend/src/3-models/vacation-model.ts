import Joi from "joi";
import { ValidationError } from "./client-errors";
import { UploadedFile } from "express-fileupload";

export class VacationModel {

    public id: number;
    public destination: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public price: number;
    public image: UploadedFile;
    public imageUrl: string;

    public constructor(vacation: VacationModel) { // Copy Constructor.
        this.id = vacation.id;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.image = vacation.image;
        this.imageUrl = vacation.imageUrl;
    }


    // Create a schema for validating vacation insert:
    private static insertValidationSchema = Joi.object({
        id: Joi.number().forbidden(),
        destination: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(10).max(250),
        startDate: Joi.date().required().min(new Date().toISOString().split('T')[0]),
        endDate: Joi.date().required().min(Joi.ref('startDate')),
        price: Joi.number().required().min(0).max(10000),
        image: Joi.object().required(),
        imageUrl: Joi.string().optional().max(200)
    });

    // Create a schema for validating vacation update:
    private static updateValidationSchema = Joi.object({
        id: Joi.number().optional(),
        destination: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(10).max(250),
        startDate: Joi.date().required(),
        endDate: Joi.date().required().min(Joi.ref('startDate')),
        price: Joi.number().required().min(0).max(10000),
        image: Joi.object().optional(),
        imageUrl: Joi.string().optional().max(200)
    });


    // Validating current object against the insert schema:
    public validateInsert(): void {
        const result = VacationModel.insertValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

    // Validating current object against the update schema:
    public validateUpdate(): void {
        const result = VacationModel.updateValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

}
