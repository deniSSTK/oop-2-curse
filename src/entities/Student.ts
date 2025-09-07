import BaseEntity from "@entity/BaseEntity";
import eCurseEnum from "@enum/CourseEnum";
import eSexEnum from "@enum/SexEnum";
import StudentCard from "@entity/StudentCard";
import eCourseEnum from "@enum/CourseEnum";
import eStudentCardCode from "@enum/StudentCardCodesEnum";

class Student extends BaseEntity {

    private readonly name: string;
    private readonly surname: string;
    private readonly course: eCurseEnum;
    private readonly sex: eSexEnum;
    private readonly studentCard: StudentCard;
    private readonly gpa: number;
    private readonly studentRecordBookNumber: number;

    constructor(
        name: string,
        surname: string,
        course: eCurseEnum,
        sex: eSexEnum,
        studentCard: StudentCard,
        gpa: number,
        studentRecordBookNumber: number,
    ) {
        super();
        this.name = name;
        this.surname = surname;
        this.course = course;
        this.sex = sex;
        this.studentCard = studentCard;
        this.gpa = gpa;
        this.studentRecordBookNumber = studentRecordBookNumber;
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

    public static generateRandomStudent(): Student {
        const names = ["Denis", "Anna", "Ivan", "Olga"];
        const surnames = ["Tkachenko", "Petrenko", "Ivanov", "Shevchenko"];
        const gpas = [2.5, 3.0, 3.5, 4.0, 4.5, 5.0];

        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
        const courses = Object.values(eCourseEnum).filter(v => typeof v === "number") as eCourseEnum[];
        const randomCourse = courses[Math.floor(Math.random() * courses.length)];
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
            randomSex,
            new StudentCard(randomCode, randomCardNumber),
            randomGpa,
            randomBookNumber
        );
    }

    public static generateRandomStudentsList(n: number): Student[] {
        return Array.from({ length: n}, () => this.generateRandomStudent())
    }

    public static csvParams() {
        return `Name, Surname, Course, Sex, StudentCard, GPA, StudentRecordBookNumber`
    }

    public override toString() {
        return `${this.name}, ${this.surname}, ${this.course}, ${this.sex}, ${this.studentCard.toString()}, ${this.gpa}, ${this.studentRecordBookNumber}`;
    }

    public generateHistory(): string {
        return "History"
    }
}

export default Student;