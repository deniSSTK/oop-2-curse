import {readFileSync, writeFileSync} from 'fs';
import BaseEntity from "@entity/BaseEntity";

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

export const jsonToCsv = (
    objects: BaseEntity[], //polymorphism
    filePath="output.csv"
) => {
    const lines = objects.map(obj => obj.toCsv()).join('\n');
    const headers = "id, name, type, data\n";

    const fileContent = headers + lines + '\n';

    writeFileSync(filePath, fileContent);
}