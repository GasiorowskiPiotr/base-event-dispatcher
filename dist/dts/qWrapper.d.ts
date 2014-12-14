/// <reference path="promiseWrapper.d.ts" />
declare module evilduck {
    class QWrapper {
        when<T>(a?: any): PromiseWrapper<T>;
        all<T>(promises: PromiseWrapper<any>[]): PromiseWrapper<T>;
    }
}
