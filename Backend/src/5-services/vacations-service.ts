import { OkPacketParams } from "mysql2";
import { appConfig } from "../2-utils/app-config";
import { dal } from "../2-utils/dal";
import { VacationModel } from "../3-models/vacation-model";
import { ResourceNotFoundError } from "../3-models/client-errors";
import { fileSaver } from "uploaded-file-saver";


class VacationsService {

    // Get all Vacations:
    public async getAllVacations() {

        const sql = `SELECT *, CONCAT('${appConfig.baseImageUrl}', imageName) as imageUrl FROM vacations`;
        const vacation = await dal.execute(sql);
        return vacation;
    }

    // Get one vacation: 
    public async getOneVacation(id: number): Promise<VacationModel> {

        // Fetches all vacations by vacation.Id & CONCAT imageUrl by linking baseImageUrl to imageName.
        const sql = `SELECT *, CONCAT('${appConfig.baseImageUrl}', imageName) as imageUrl FROM vacations WHERE id = ?`;
        const vacations = await dal.execute(sql, [id]);

        // Extract one vacation by id:
        const vacation = vacations[0];

        // if not found- throw Error
        if (!vacation) throw new ResourceNotFoundError(id);

        return vacation;
    }

    // Get upcoming vacations:
    public async getUpcomingVacations() {

        // Fetches all vacations with startDate >= today & CONCAT imageUrl by linking baseImageUrl to imageName.
        const sql = `SELECT *, CONCAT('${appConfig.baseImageUrl}', imageName) as imageUrl 
        FROM vacations WHERE startDate >= CURRENT_DATE`;
        const vacations = await dal.execute(sql);
        return vacations;
    }


    // Active vacations:
    public async getActiveVacations() {

        // Fetches all vacations with startDate <= today AND endDate >= today  & CONCAT imageUrl:
        const sql = `SELECT * , CONCAT('${appConfig.baseImageUrl}', imageName) as imageUrl 
        FROM vacations WHERE startDate <= CURRENT_DATE AND endDate >= CURRENT_DATE`;
        const vacations = await dal.execute(sql);
        return vacations;
    }


    //Favorite vacations
    public async getFavoriteVacations(userId: number): Promise<VacationModel[]> {

        // Fetches vacations liked by specific user AND JOIN vacations + likes tables to filter userId.
        const sql = `
            SELECT v.*, CONCAT('${appConfig.baseImageUrl}', v.imageName) as imageUrl
            FROM vacations v
            JOIN likes l ON l.vacationId = v.id AND l.userId = ?
        `;
        const vacations = await dal.execute(sql, [userId]);
        return vacations;
    }


    // Add vacation:
    public async addVacation(vacation: VacationModel): Promise<VacationModel> {

        vacation.validateInsert();

        // Save image to hard-disk:
        const imageName = await fileSaver.add(vacation.image);

        // Adds a new vacation record to the database:
        const sql = `INSERT INTO vacations (destination, description, startDate, endDate, price, imageName) 
        VALUES (?, ?, ?, ?, ?, ?)`;

        // Parameters for the query to insert into database:
        const info: OkPacketParams = await dal.execute(sql, [
            vacation.destination,
            vacation.description,
            vacation.startDate,
            vacation.endDate,
            vacation.price,
            imageName
        ]);
        // Return added vacation using insert ID.
        return await this.getOneVacation(info.insertId);
    }


    // Edit vacation:
    public async EditVacation(vacation: VacationModel): Promise<VacationModel> {

        vacation.validateUpdate();

        // Get old image name: 
        const oldImageName = await this.getImageName(vacation.id);

        // Update image in the hard-disk: 
        const newImageName = vacation.image ? await fileSaver.update(oldImageName, vacation.image) : oldImageName;

        const sql = `
        UPDATE vacations
        SET
           destination = ?,
           description = ?,
           startDate = ?,
           endDate = ?,
           price = ?,
           imageName = ?
        WHERE id = ?`;

        // Parameters for the query to update:
        const info: OkPacketParams = await dal.execute(sql, [
            vacation.destination,
            vacation.description,
            vacation.startDate,
            vacation.endDate,
            vacation.price,
            newImageName,
            vacation.id
        ]);

        // If no rows were affected - throw an error:
        if (info.affectedRows === 0) throw new ResourceNotFoundError(vacation.id);
        vacation = await this.getOneVacation(vacation.id);
        return vacation;
    }


    // Delete vacation:
    public async deleteVacation(id: number): Promise<void> {

        const imageName = await this.getImageName(id);

        const sql = "DELETE FROM vacations WHERE id = ?";
        const info: OkPacketParams = await dal.execute(sql, [id]);

        if (info.affectedRows === 0) throw new ResourceNotFoundError(id);

        // Delete image from hard-disk:
        await fileSaver.delete(imageName);
    }


    // Get image name:
    private async getImageName(id: number): Promise<string> {

        // Fetches imageName of the specific vacation on vacation.id:
        const sql = `SELECT imageName FROM vacations WHERE id = ${id}`;
        const vacations = await dal.execute(sql);
        const vacation = vacations[0];

        if (!vacation) return null;

        // If vacation found, return imageName:
        const imageName = vacation.imageName;
        return imageName;
    }


}

const vacationsService = new VacationsService();
export { vacationsService };