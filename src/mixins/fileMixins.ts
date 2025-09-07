import {readFileSync, writeFileSync} from 'fs';

export const createCsvFile = (data: any, outputFileName: string) => {
    writeFileSync(outputFileName, data.join('\n'));
}

export const csvToJson = (filePath: string) => {
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