import StudentRepository from "../dal/StudentRepository";
import StudentService from "../bll/StudentService";

async function main() {
    const repo = new StudentRepository("./students.json");
    const service = new StudentService(repo);

    console.log("Fetching all excellent male students in course 2...");
    const excellentStudents = await service.getExcellentMaleStudentsInCourse(2);
    console.log(excellentStudents);

    if (excellentStudents.length > 0) {
        const student = excellentStudents[0];
        console.log(`Giving scholarship to ${student.name} ${student.surname}`);
        await service.giveScholarship(student.id, 1000);
        console.log("Scholarship granted!");
    }
}

main();