import Student from "@model/Student";
import StudentRepository from "../dal/StudentRepository";
import eSexEnum from "@enum/SexEnum";

export default class StudentService {
    constructor(private repository: StudentRepository) {}

    async getAllStudents(): Promise<Student[]> {
        return this.repository.getAll();
    }

    async getExcellentMaleStudentsInCourse(course: number): Promise<Student[]> {
        const students = await this.repository.getAll();
        return students.filter(
            s => s.sex === eSexEnum.MALE && s.course === course && s.averageGrade >= 90
        );
    }

    async giveScholarship(studentId: string, amount: number): Promise<boolean> {
        const students = await this.repository.getAll();
        const student = students.find(s => s.id === studentId);
        if (!student) return false;

        student.scholarship = (student.scholarship || 0) + amount;
        await this.repository.saveAll(students);
        return true;
    }
}