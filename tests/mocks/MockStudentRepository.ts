import Student from "../../src/models/Student";
import StudentRepository from "../../src/dal/StudentRepository";

export default class MockStudentRepository extends StudentRepository {
    private students: Student[];

    constructor(initialStudents: Student[]) {
        super("");
        this.students = initialStudents;
    }

    async getAll(): Promise<Student[]> {
        return this.students;
    }

    async saveAll(students: Student[]): Promise<void> {
        this.students = students;
    }

    async addStudent(student: Student): Promise<void> {
        this.students.push(student);
    }

    async findById(id: string): Promise<Student | undefined> {
        return this.students.find(s => s.id === id);
    }
}
