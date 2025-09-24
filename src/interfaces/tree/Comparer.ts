interface iComparer<T> {
    compare(a: T, b: T): number;
}

export default iComparer;