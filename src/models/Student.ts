import BaseEntity from "@model/BaseEntity";
import eCurseEnum from "@enum/CourseEnum";
import eSexEnum from "@enum/SexEnum";
import StudentCard from "@model/StudentCard";
import eCourseEnum from "@enum/CourseEnum";
import eStudentCardCode from "@enum/StudentCardCodesEnum";
import Residence from "@model/Residence";
import BaseEntityGenerate from "@interface/BaseEntityGenerate";

class Student extends BaseEntityGenerate {

    readonly name: string;
    readonly surname: string;
    readonly age: number;
    readonly course: eCurseEnum;
    readonly sex: eSexEnum;
    readonly studentCard: StudentCard;
    readonly gpa: number;
    readonly studentRecordBookNumber: number;
    readonly residence: Residence;

    private static readonly MIN_AGE = 17;
    private static readonly MAX_AGE = 30;

    constructor(
        name: string,
        surname: string,
        course: eCurseEnum,
        age: number,
        sex: eSexEnum,
        studentCard: StudentCard,
        gpa: number,
        studentRecordBookNumber: number,
        residence: Residence
    ) {
        super();
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.course = course;
        this.sex = sex;
        this.studentCard = studentCard;
        this.gpa = gpa;
        this.studentRecordBookNumber = studentRecordBookNumber;
        this.residence = residence;
    }

    public override getAll() {
        return {
            ...super.getAll(),
            name: this.name,
            surname: this.surname,
            course: this.course,
            sex: this.sex,
            studentCard: this.studentCard,
            gpa: this.gpa,
            studentRecordBookNumber: this.studentRecordBookNumber,
        }
    }

    static override generateRandom(): Student {
        const names = ["Denis", "Anna", "Ivan", "Olga"];
        const surnames = ["Tkachenko", "Petrenko", "Ivanov", "Shevchenko"];
        const gpas = [2.5, 3.0, 3.5, 4.0, 4.5, 5.0];

        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
        const courses = Object.values(eCourseEnum).filter(v => typeof v === "number") as eCourseEnum[];
        const randomCourse = courses[Math.floor(Math.random() * courses.length)];
        const randomAge = Math.floor(Math.random() * (Student.MAX_AGE - Student.MIN_AGE + 1)) + Student.MIN_AGE;
        const randomSex = Math.random() < 0.5 ? eSexEnum.MALE : eSexEnum.FEMALE;

        const randomGpa = gpas[Math.floor(Math.random() * gpas.length)];

        const codes = Object.values(eStudentCardCode)
        const randomCode = codes[Math.floor(Math.random() * codes.length)];

        const randomCardNumber = Math.floor(Math.random() * 1000000000);
        const randomBookNumber = Math.floor(Math.random() * 1000000000);

        return new Student(
            randomName,
            randomSurname,
            randomCourse,
            randomAge,
            randomSex,
            new StudentCard(randomCode, randomCardNumber),
            randomGpa,
            randomBookNumber,
            new Residence("Street", "City", "12345", "USA")
        );
    }

    static override generateRandomsList(n: number): Student[] {
        return Array.from({ length: n}, () => this.generateRandom())
    }

    static csvParams() {
        return `Name, Surname, Course, Sex, StudentCard, GPA, StudentRecordBookNumber`
    }

    override toString() {
        return `${this.name}, ${this.surname}, ${this.course}, ${this.sex}, ${this.studentCard.toString()}, ${this.gpa}, ${this.studentRecordBookNumber}`;
    }

    public override toCsv(): string {
        return super.toCsvFormat({
            id: this.id,
            name: this.name,
            type: typeof Student,
            data: JSON.stringify(this.getAll())
        })
    }
}

export default Student;