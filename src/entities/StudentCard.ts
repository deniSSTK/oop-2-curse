import BaseEntity from "@entity/BaseEntity";
import eStudentCardCode from "@enum/StudentCardCodesEnum";

class StudentCard extends BaseEntity {

    private readonly code: eStudentCardCode;
    private readonly number: number;

    constructor(code: eStudentCardCode, number: number) {
        super();
        this.code = code;
        this.number = number;
    }

    public override getAll() {
        return {
            ...super.getAll(),
            code: this.code,
            number: this.number
        };
    }

    public override toString() {
        return `${this.code}-${this.number}`;
    }
}

export default StudentCard;