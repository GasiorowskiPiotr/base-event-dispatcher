/// <reference path="promiseWrapper.ts"/>

module evilduck {
    export class QWrapper {
        public when<T>(a: any = null): PromiseWrapper<T> {
            throw new Error("Not implemented");
        }

        public all<T>(promises: PromiseWrapper<any>[]): PromiseWrapper<T> {
            throw new Error("Not implemented");
        }
    }
} 