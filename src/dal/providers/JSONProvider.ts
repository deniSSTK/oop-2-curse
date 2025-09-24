import DataProvider from "./DataProvider";
import {readFileSync, writeFileSync, existsSync} from "fs";

class JSONProvider<T> implements DataProvider<T> {
    constructor(public path: string) {}

    async save(data: T[]): Promise<void> {
        writeFileSync(this.path, JSON.stringify(data, null, 2))
    }

    async add(data: T): Promise<void> {
        await this.save([...await this.load(), data])
    }

    async load(): Promise<T[]> {
        if (!existsSync(this.path)) {
            await this.save([])
            return []
        }

        try {
            return JSON.parse(readFileSync(this.path, 'utf-8'))
        } catch (e) {
            console.error(`JSONProvider: Error while load data from file '${this.path}': `, e)
            return []
        }
    }
}

export default JSONProvider;