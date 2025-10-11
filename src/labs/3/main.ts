import Student from "@model/Student";
import Menu from "../../pl/Menu";
import SupportedFileTypesEnum from "@enum/SupportedFileTypesEnum";
import BaseEntityGenerate from "@interface/BaseEntityGenerate";

async function Main() {
    for (const type of Object.values(SupportedFileTypesEnum)) {
        await new Menu<Student>(
            Student as unknown as typeof BaseEntityGenerate,
            type
        ).Menu();
    }
}

Main();