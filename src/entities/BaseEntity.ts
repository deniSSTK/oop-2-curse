import { v4 as uuidv4 } from "uuid"
import iBaseEntityInterface from "@entity/BaseEntity";

class BaseEntity implements iBaseEntityInterface {

    private readonly id: string;
    private readonly date: Date;
    private readonly update: Date;

    constructor() {
        this.id = uuidv4()
        this.date = new Date();
        this.update = new Date();
    }

    public getAll() {
        return {
            id: this.id,
            date: this.date,
            update: this.update,
        }
    }
}

export default BaseEntity;