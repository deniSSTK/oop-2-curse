import BaseEntity from "@entity/BaseEntity";
import {eMechanicSpecializationEnum} from "@enum/MechanicSpecializtionEnum";

class Mechanic extends BaseEntity {
    public name: string;
    public surname: string;
    public specialization: eMechanicSpecializationEnum;
    public yearsOfExperience: number;

    constructor(
        name: string,
        surname: string,
        specialization: eMechanicSpecializationEnum,
        yearsOfExperience: number
    ) {
        super();
        this.name = name;
        this.surname = surname;
        this.specialization = specialization;
        this.yearsOfExperience = yearsOfExperience;
    }

    public getFullName(): string {
        return `${this.name} ${this.surname}`;
    }

    public introduce(): string {
        return `${this.getFullName()}, specialization: ${this.specialization}, experience: ${this.yearsOfExperience} years.`;
    }
}

export default Mechanic;
