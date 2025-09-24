import DataProvider from "./providers/DataProvider";
import BaseEntity from "@model/BaseEntity";

class EntityContext<T extends BaseEntity> {
    constructor(private provider: DataProvider<T>) {}

    async save(entities: T[]): Promise<void> {
        await this.provider.save(entities);
    }

    async add(entity: T): Promise<void> {
        await this.provider.add(entity);
    }

    async load(): Promise<T[]> {
        return await this.provider.load();
    }
}

export default EntityContext;