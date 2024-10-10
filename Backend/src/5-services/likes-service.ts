import { appConfig } from '../2-utils/app-config';
import { dal } from '../2-utils/dal';


class LikesService {

    // Like Exists
    public async likeExists(userId: number, vacationId: number): Promise<boolean> {

        // Create database query by SQL: 
        const sql = `SELECT COUNT(1) AS 'exists' FROM likes WHERE userId = ? AND vacationId = ?`;

        // Execute the SQL query to determine if any like exists for the specific user.id:
        const result = await dal.execute(sql, [userId, vacationId]);

        // Return true if the Like count result > 0:
        return result[0].exists > 0;
    }

    // Add like
    public async addLike(userId: number, vacationId: number): Promise<void> {

        const sql = `INSERT INTO likes (userId, vacationId) VALUES (?, ?)`;

        // Execute the SQL query to add like for the specific user.id::
        await dal.execute(sql, [userId, vacationId]);
    }

    // Remove like
    public async removeLike(userId: number, vacationId: number): Promise<void> {

        const sql = `DELETE FROM likes WHERE userId = ? AND vacationId = ?`;
        await dal.execute(sql, [userId, vacationId]);
    }

    // Get all user likes:
    public async getUserLikes(userId: number): Promise<any[]> {

        const sql = `SELECT * FROM likes WHERE userId = ?`;
        const result = await dal.execute(sql, [userId]);
        return result;
    }

    // Get all vacations along with the like count of each:
    public async getVacationsWithLikes(): Promise<any[]> {
        try {

            // JOIN vacations & likes tables:
            const sql = `
                SELECT v.*, COUNT(l.vacationId) as likesCount
                FROM vacations v
                LEFT JOIN likes l ON v.id = l.vacationId
                GROUP BY v.id
            `;
            // Groups the resultS by vacationID, counting the likes for vacation.
            const vacationsWithLikes = await dal.execute(sql);
            return vacationsWithLikes;
        }
        catch (error) {
            console.error('Error fetching likes reports:', error);
            throw new Error('Failed to fetch likes reports');
        }
    }


}

export const likesService = new LikesService();
