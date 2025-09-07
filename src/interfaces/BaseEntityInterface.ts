interface iBaseEntityInterface {
    id: string;
    date: Date;
    update: Date;
    getAll(): Object;
}

export default iBaseEntityInterface;