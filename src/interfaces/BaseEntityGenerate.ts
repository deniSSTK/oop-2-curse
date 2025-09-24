import BaseEntity from "@model/BaseEntity";

abstract class BaseEntityGenerate extends BaseEntity {

    static generateRandom(): BaseEntity {
        throw new Error("Method not implemented.");
    }

    static generateRandomsList(n: number): BaseEntity[] {
        throw new Error("Method not implemented.");
    }
}

export default BaseEntityGenerate;