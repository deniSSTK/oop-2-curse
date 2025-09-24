import EntityContext from "../dal/EntityContext";
import BaseEntity from "@model/BaseEntity";

class EntityService {
    constructor(private context: EntityContext<BaseEntity>) {}

    async save(entities: BaseEntity[]) {
        await this.context.save(entities)
    }

    async add(entity: BaseEntity) {
        await this.context.add(entity)
    }

    async load() {
        return await this.context.load()
    }
}

export default EntityService;