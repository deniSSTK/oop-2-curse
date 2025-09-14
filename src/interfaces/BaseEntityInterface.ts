interface iBaseEntityInterface {
    id: string;
    date: Date;
    update: Date;

    getAll(): Object;
    toCsv(): string;
}

export default iBaseEntityInterface;