import {readFileSync, writeFileSync} from 'fs';
import BaseEntity from "@model/BaseEntity";

export interface iJsonToCsv {
    id: string;
    name: string;
    type: string;
    data: string;
}

export const createCsvFile = (
    data: any,
    outputFileName: string
) => {
    writeFileSync(outputFileName, data.join('\n'));
}

export const csvToJson = (
    filePath: string
) => {
    const fileContent = readFileSync(filePath, 'utf-8');

    const lines = fileContent.split('\n').filter(Boolean);
    const headers = lines.shift()!.split(',').map(h => h.trim());

    return lines.map(line => {
        const values = line.split(',').map(v => v.trim());
        const obj: Record<string, string> = {};
        headers.forEach((header, i) => {
            obj[header] = values[i];
        });
        return obj;
    });
};

export const jsonToTxt = (
    objects: BaseEntity[],
    filePath = "output.txt"
) => {
    const lines = objects.map((obj: any) => {
        const header = `${obj.constructor.name} ${obj.name}`;

        const jsonPart = JSON.stringify(obj, null, 2);

        return `${header}\n${jsonPart};`;
    });

    const fileContent = lines.join("\n\n");

    writeFileSync(filePath, fileContent, "utf-8");
};