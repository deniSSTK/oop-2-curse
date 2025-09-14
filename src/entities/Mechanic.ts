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

    public toCsv(): string {
        return super.toCsvFormat({
            id: this.id,
            name: this.name,
            type: typeof Mechanic,
            data: JSON.stringify(this.getAll())
        })
    }
    
    public static generateRandom(): Mechanic {
        const names = ["John", "Michael", "Robert", "William", "David"];
        const surnames = ["Smith", "Johnson", "Brown", "Davis", "Wilson"];
        const specs = Object.values(eMechanicSpecializationEnum);
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
        const randomSpec = specs[Math.floor(Math.random() * specs.length)];
        const randomExperience = Math.floor(Math.random() * 20) + 1;

        return new Mechanic(randomName, randomSurname, randomSpec, randomExperience);
    }
}

export default Mechanic;
