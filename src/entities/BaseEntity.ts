import { v4 as uuidv4 } from "uuid"
import iBaseEntityInterface from "@entity/BaseEntity";
import {iJsonToCsv} from "../mixins/fileMixins";
import StudentCard from "@entity/StudentCard";
import Mechanic from "@entity/Mechanic";

abstract class BaseEntity implements iBaseEntityInterface {

    protected readonly id: string;
    private readonly date: Date;
    private readonly update: Date;

    protected constructor() {
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

    public toCsvFormat(
        data: iJsonToCsv
    ): string {
        const escape = (str: string) => `"${str.replace(/"/g, '""')}"`;
        return [
            escape(data.id),
            escape(data.name),
            escape(data.type),
            escape(data.data)
        ].join(",");
    }

    public toCsv(): string {
        return this.toCsvFormat({
            id: this.id,
            name: "",
            type: typeof BaseEntity,
            data: JSON.stringify(this.getAll())
        })
    }

}

export default BaseEntity;