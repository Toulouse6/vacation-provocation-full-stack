class LikesModel {

    public readonly userId: number;
    public readonly vacationId: number;

    constructor(userId: number, vacationId: number, id?: number) {

        this.userId = userId;
        this.vacationId = vacationId;
    }
}

export default LikesModel;