/// <reference path="qWrapper.d.ts" />
/// <reference path="promiseWrapper.d.ts" />
declare module evilduck {
    interface ISubscription {
        wrap($q: QWrapper, data: any): PromiseWrapper<any>;
        guid: string;
    }
    class InnerSubscription implements ISubscription {
        private _func;
        private _guid;
        constructor(func: (any: any) => any, guid?: string);
        wrap($q: QWrapper, data: any): PromiseWrapper<any>;
        guid: string;
    }
}
