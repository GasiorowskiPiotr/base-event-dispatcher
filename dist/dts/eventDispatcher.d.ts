/// <reference path="colWrapper.d.ts" />
/// <reference path="promiseWrapper.d.ts" />
/// <reference path="qWrapper.d.ts" />
/// <reference path="eventSubscription.d.ts" />
declare module evilduck {
    interface IEventDispatcher {
        on(event: string, handler: (any: any) => any, tag: string): SubscriptionInfo;
        unsubscribe(guid: string, event: string, tag: string): any;
        dispatch(data: any, eventName: string, tag: string): PromiseWrapper<any>;
    }
    class EventDispatcher implements IEventDispatcher {
        private _innerDict;
        private $q;
        private coll;
        constructor($q: QWrapper, coll: CollWrapper);
        on(event: string, handler: (any: any) => any, tag?: string): SubscriptionInfo;
        unsubscribe(guid: string, event: string, tag?: string): void;
        dispatch(data: any, eventName: string, tag?: string): PromiseWrapper<any>;
    }
    class SubscriptionInfo {
        constructor(guid: string, event: string, tag?: string);
        private event;
        private tag;
        private isDestroyed;
        private dispatcher;
        private guid;
        destroy(): void;
        Dispatcher: EventDispatcher;
    }
}
