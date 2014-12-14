module evilduck {
    export class CollWrapper {
        public map<T, U>(col: Array<T>, func: (T) => U): Array<U> {
            throw new Error("Not implemented");
        }

        public union<T>(col1: Array<T>, col2: Array<T>): Array<T> {
            throw new Error("Not implemented");
        }

        public find<T>(col: Array<T>, pred: (T) => boolean): T {
            throw new Error("Not implemented");
        }

        public indexOf<T>(col: Array<T>, item: T): number {
            throw new Error("Not implemented");
        }

        public filter<T>(col: Array<T>, pred: (T) => boolean): Array<T> {
            throw new Error("Not implemented");
        }
    }
} 