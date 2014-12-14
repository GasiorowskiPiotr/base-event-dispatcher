declare module evilduck {
    class CollWrapper {
        map<T, U>(col: T[], func: (T: any) => U): U[];
        union<T>(col1: T[], col2: T[]): T[];
        find<T>(col: T[], pred: (T: any) => boolean): T;
        indexOf<T>(col: T[], item: T): number;
        filter<T>(col: T[], pred: (T: any) => boolean): T[];
    }
}
