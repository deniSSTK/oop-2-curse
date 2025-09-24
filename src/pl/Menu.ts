import EntityService from "../bll/EntityService";
import EntityContext from "../dal/EntityContext";
import JSONProvider from "../dal/providers/JSONProvider";
import BaseEntityGenerate from "@interface/BaseEntityGenerate";
import SupportedFileTypesEnum from "@enum/SupportedFileTypesEnum";
import XMLProvider from "../dal/providers/XMLProvider";
import BinaryProvider from "../dal/providers/BinaryProvider";
import BaseEntity from "@model/BaseEntity";

class Menu<T extends BaseEntityGenerate> {

    private entities: T[] = [];
    private service: EntityService;
    readonly type: typeof BaseEntityGenerate;

    private readonly fileType: SupportedFileTypesEnum;

    constructor(
        type: typeof BaseEntityGenerate,
        fileType: SupportedFileTypesEnum
    ) {
        this.fileType = fileType;
        this.type = type;

        switch (this.fileType) {
            case SupportedFileTypesEnum.JSON:
                this.service = new EntityService(new EntityContext<T>(new JSONProvider<T>("students.json")));
                break;
            case SupportedFileTypesEnum.XML:
                this.service = new EntityService(new EntityContext<T>(new XMLProvider<T>("students.xml")));
                break;
            case SupportedFileTypesEnum.Binary:
                this.service = new EntityService(new EntityContext<T>(new BinaryProvider<T>("students.bin")))
                break;
            default:
                throw new Error("Unsupported file type");
        }
    }

    private staticMethods() {
        return this.type as typeof BaseEntityGenerate & {
            generateRandom(): T;
            generateRandomsList(n: number): BaseEntity[];
        };
    }

    async Menu(entities: T[] = []): Promise<void> {
        console.log(`${this.fileType}Menu`);
        if (entities.length > 0) {
            await this.service.save(entities);
        }
        this.entities = await this.service.load() as T[];
        console.log("loaded entities: ", this.entities);

        await this.service.add(this.staticMethods().generateRandom())
        this.entities = await this.service.load() as T[];
        console.log("loaded entities with new one: ", this.entities);
    }
}

export default Menu;