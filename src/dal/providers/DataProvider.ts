interface DataProvider<T> {
    path: string,

    save(data: T[]): Promise<void>;
    add(data: T): Promise<void>;
    load(): Promise<T[]>;
}

export default DataProvider;