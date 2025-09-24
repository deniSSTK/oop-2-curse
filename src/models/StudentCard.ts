import BaseEntity from "@model/BaseEntity";
import eStudentCardCode from "@enum/StudentCardCodesEnum";

class StudentCard extends BaseEntity {

    private readonly code: eStudentCardCode;
    private readonly number: string;

    constructor(code: eStudentCardCode, number: number) {
        super();
        this.code = code;
        this.number = String(number).padStart(6, '0');
    }

    public override getAll() {
        return {
            ...super.getAll(),
            code: this.code,
            number: this.number
        };
    }

    public checkValidity(): boolean {
        const codes = Object.values(eStudentCardCode).join("|");
        const regex = new RegExp(`^(${codes})-\\d{6}$`);

        return regex.test(this.toString());
    }

    public override toString() {
        return `${this.code}-${this.number}`;
    }
}

export default StudentCard;