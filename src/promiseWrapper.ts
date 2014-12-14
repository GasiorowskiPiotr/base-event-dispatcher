module evilduck {
    export class PromiseWrapper<T> {
        public then(func: (T) => any): PromiseWrapper<any> {
            throw new Error("Not implemented");
        }

        public catch(func: (T) => any): PromiseWrapper<any> {
            throw new Error("Not implemented");
        }

        public finally(func: (T) => any): PromiseWrapper<any> {
            throw new Error("Not implemented");
        }
    }
} 