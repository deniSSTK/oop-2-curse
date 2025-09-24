import DataProvider from "./DataProvider";
import { encode, decode } from "@msgpack/msgpack";
import {readFileSync, writeFileSync, existsSync} from "fs";

class BinaryProvider<T> implements DataProvider<T> {
    constructor(public path: string) {}

    async save(data: T[]): Promise<void> {
        const buffer = encode(data);
        writeFileSync(this.path, buffer);
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
            const buffer = readFileSync(this.path);
            return decode(buffer) as T[];
        } catch (e) {
            console.error(`BinaryProvider: Error while loading data from file '${this.path}':`, e);
            return [];
        }
    }
}

export default BinaryProvider;