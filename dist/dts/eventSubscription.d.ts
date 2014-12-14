/// <reference path="colWrapper.d.ts" />
/// <reference path="qWrapper.d.ts" />
/// <reference path="tagSubscription.d.ts" />
/// <reference path="innerSubscription.d.ts" />
declare module evilduck {
    interface IEventSubscription {
        wrap(data: any, tagName: string): PromiseWrapper<any>;
    }
    class EventSubscription implements IEventSubscription {
        private _eventName;
        private _tagSubs;
        private _subs;
        private _q;
        private _coll;
        constructor(eventName: string, q: QWrapper, coll: CollWrapper);
        eventName: string;
        subscribe(func: (any: any) => any, tag?: string): SubscriptionInfo;
        private subscribeGeneral(func, tag?);
        wrap(data: any, tagName?: string): PromiseWrapper<any>;
        unsubscribe(guid: string, tag?: string): void;
        count: number;
        private createGuid();
    }
}
