import DataProvider from "./DataProvider";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { parseStringPromise, Builder } from "xml2js";

class XMLProvider<T> implements DataProvider<T> {
    constructor(public path: string) {}

    async save(data: T[]): Promise<void> {
        const builder = new Builder({ rootName: 'items', xmldec: { version: '1.0', encoding: 'UTF-8' } });
        const xml = builder.buildObject({ item: data });
        writeFileSync(this.path, xml, 'utf-8');
    }

    async add(data: T): Promise<void> {
        const currentData = await this.load();
        currentData.push(data);
        await this.save(currentData);
    }

    async load(): Promise<T[]> {
        if (!existsSync(this.path)) {
            await this.save([]);
            return [];
        }

        try {
            const xml = readFileSync(this.path, 'utf-8');
            const result = await parseStringPromise(xml);
            return result.items?.item ?? [];
        } catch (e) {
            console.error(`XMLProvider: Error while loading data from file '${this.path}':`, e);
            return [];
        }
    }
}

export default XMLProvider;
