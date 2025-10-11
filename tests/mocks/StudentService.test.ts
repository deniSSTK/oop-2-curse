import test from "node:test";
import assert from "node:assert";
import MockStudentRepository from "./MockStudentRepository";
import StudentService from "../../src/bll/StudentService";
import Student from "../../src/models/Student";
import eSexEnum from "../../src/enums/SexEnum";
import eCurseEnum from "../../src/enums/CourseEnum";
import StudentCard from "../../src/models/StudentCard";
import Residence from "../../src/models/Residence";
import eStudentCardCodeEnum from "../../src/enums/StudentCardCodesEnum";

export const studentsMock: Student[] = [
    new Student(
        "John",
        "Doe",
        eCurseEnum.SECOND,
        20,
        eSexEnum.MALE,
        new StudentCard(eStudentCardCodeEnum.DD, 1234),
        4.8,
        1001,
        new Residence("123 Main St", "Kyiv", "01001", "Ukraine"),
        95
    ),
    new Student(
        "Alex",
        "Smith",
        eCurseEnum.SECOND,
        21,
        eSexEnum.MALE,
        new StudentCard(eStudentCardCodeEnum.AA, 123),
        4.0,
        1002,
        new Residence("456 Oak St", "Lviv", "79000", "Ukraine"),
        85
    ),
    new Student(
        "Mary",
        "Jane",
        eCurseEnum.SECOND,
        20,
        eSexEnum.FEMALE,
        new StudentCard(eStudentCardCodeEnum.DD, 4),
        4.9,
        1003,
        new Residence("789 Pine St", "Odesa", "65000", "Ukraine"),
        98
    ),
];

test("should return only excellent male students in course 2", async () => {
    const service = new StudentService(new MockStudentRepository(studentsMock));
    const result = await service.getExcellentMaleStudentsInCourse(2);
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].surname, "John");
});

test("should give scholarship correctly", async () => {
    const service = new StudentService(new MockStudentRepository(studentsMock));
    const success = await service.giveScholarship("1", 500);
    const updatedStudent = (await service.getAllStudents()).find(s => s.id === "1");
    assert.strictEqual(success, true);
    assert.strictEqual(updatedStudent?.scholarship, 500);
});

test("should return false if student not found", async () => {
    const service = new StudentService(new MockStudentRepository(studentsMock));
    const success = await service.giveScholarship("nonexistent", 100);
    assert.strictEqual(success, false);
});
