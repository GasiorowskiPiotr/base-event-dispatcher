/// <reference path="qWrapper.ts"/>
/// <reference path="promiseWrapper.ts"/>

module evilduck {
    export interface ISubscription {
        wrap($q: QWrapper, data: any): PromiseWrapper<any>;
        guid: string;
    }

    export class InnerSubscription implements ISubscription {

        private _func: (any) => any;
        private _guid: string;

        constructor(func: (any) => any, guid: string = null) {
            this._func = func;
            this._guid = guid;
        }

        public wrap($q: QWrapper, data: any): PromiseWrapper<any> {
            return $q.when(this._func(data));
        }

        public get guid() {
            return this._guid;
        }
    }
} 