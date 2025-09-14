import BaseEntity from "@entity/BaseEntity";
import eDoctorSpecializationEnum from "@enum/DoctorSpecializationEnum";
import iSpeaker from "@interface/Speaker";

class Doctor extends BaseEntity implements iSpeaker {
    public name: string;
    public surname: string;
    public specialization: eDoctorSpecializationEnum;
    public yearsOfExperience: number;

    constructor(
        name: string,
        surname: string,
        specialization: eDoctorSpecializationEnum,
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
        return `Dr. ${this.getFullName()}, specialization: ${this.specialization}, experience: ${this.yearsOfExperience} years.`;
    }

    public static generateRandom(): Doctor {
        const names = ["Denis", "Anna", "Ivan", "Olga"];
        const surnames = ["Tkachenko", "Petrenko", "Ivanov", "Shevchenko"];
        const specs = Object.values(eDoctorSpecializationEnum);
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
        const randomSpec = specs[Math.floor(Math.random() * specs.length)];
        const randomExperience = Math.floor(Math.random() * 30);

        return new Doctor(randomName, randomSurname, randomSpec, randomExperience);
    }

    public tellHistory(): string {
        return "History"
    }

    public toCsv(): string {
        return super.toCsvFormat({
            id: this.id,
            name: this.name,
            type: typeof Doctor,
            data: JSON.stringify(this.getAll())
        });
    }
}

export default Doctor;
