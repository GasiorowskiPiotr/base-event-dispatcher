/// <reference path="innerSubscription.d.ts" />
/// <reference path="qWrapper.d.ts" />
/// <reference path="promiseWrapper.d.ts" />
declare module evilduck {
    class TagSubscription implements ISubscription {
        private _tagName;
        private _sub;
        private _guid;
        static General(tagName: string, func: (any: any) => any, guid?: string): TagSubscription;
        tagName: string;
        subscription: ISubscription;
        guid: string;
        wrap($q: QWrapper, data: any): PromiseWrapper<any>;
    }
}
