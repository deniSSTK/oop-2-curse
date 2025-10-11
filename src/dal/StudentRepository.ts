import * as fs from "fs/promises";
import Student from "@model/Student";

export default class StudentRepository {
    private readonly filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    async getAll(): Promise<Student[]> {
        const data = await fs.readFile(this.filePath, "utf-8");
        return JSON.parse(data) as Student[];
    }

    async saveAll(students: Student[]): Promise<void> {
        await fs.writeFile(this.filePath, JSON.stringify(students, null, 2), "utf-8");
    }
}