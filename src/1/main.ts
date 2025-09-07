import Student from "@entity/Student";
import StudentCard from "@entity/StudentCard";

import eSexEnum from "@enum/SexEnum";
import eCourseEnum from "@enum/CourseEnum";
import eStudentCardCode from "@enum/StudentCardCodesEnum";

import {sn} from "../mixins/consoleMixins";
import {createCsvFile, csvToJson} from "../mixins/fileMixins";

console.log("---START 1 LAB---")
console.log("---GENERATE 5 RANDOM STUDENTS---")
console.log(Student.generateRandomStudentsList(5))
sn()

console.log("---CREATE STUDENT CARD---")
console.log("Input params CardCode = BB, CardNumber = 100")
const studentCard = new StudentCard(eStudentCardCode.BB, 100)

console.log("Overwrote method toString() for StudentCard output: " + studentCard.toString())
console.log("Overwrote parent method getAll() for StudentCard output: ", studentCard.getAll())
sn()

console.log("---CREATE STUDENT---")
const student = new Student('Denis', 'Tkachenko', eCourseEnum.SECOND, eSexEnum.MALE, studentCard, 3.5, 123456789)
console.log(student.getAll())
sn()

console.log("---LAB TASK CSV FILE---")
console.log("Description: Обчислити кількість студентів-чоловіків 2-го курсу, які займаються на відмінно. Отримати їх дані з файлу")
createCsvFile(
    [
        Student.csvParams(),
        ...Student.generateRandomStudentsList(100).map(student => student.toString())
    ],
    'students.csv')

console.log("File generated: src/1/students.csv")
console.log("Filtered list", csvToJson(__dirname + '/students.csv').filter(s =>
    s.Sex === eSexEnum.MALE &&
    Number(s.Course) === eCourseEnum.SECOND &&
    Number(s.GPA)  >= 3.5))
sn()