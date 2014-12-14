﻿/// <reference path="colWrapper.ts"/>
/// <reference path="promiseWrapper.ts"/>
/// <reference path="qWrapper.ts"/>
/// <reference path="eventSubscription.ts"/>

module evilduck {

    export interface IEventDispatcher {
        on(event: string, handler: (any) => any, tag: string): SubscriptionInfo;
        unsubscribe(guid: string, event: string, tag: string);
        dispatch(data: any, eventName: string, tag: string): PromiseWrapper<any>;
    }

    export class EventDispatcher implements IEventDispatcher {

        private _innerDict: any;
        private $q: QWrapper;
        private coll: CollWrapper;

        constructor($q: QWrapper, coll: CollWrapper) {
            this._innerDict = {};
            this.$q = $q;
            this.coll = coll;
        }

        public on(event: string, handler: (any) => any, tag: string = null): SubscriptionInfo {

            if (!event) {
                throw new Error('Event name must not be empty');
            }

            if (!handler) {
                throw new Error('Handler must be defined');
            }

            if (!this._innerDict[event]) {
                this._innerDict[event] = new EventSubscription(event, this.$q, this.coll);
            }

            var subsInfo = (<EventSubscription>this._innerDict[event]).subscribe(handler, tag);
            subsInfo.Dispatcher = this;
            return subsInfo;
        }

        public unsubscribe(guid: string, event: string, tag: string = null) {
            if (this._innerDict[event]) {
                (<EventSubscription>this._innerDict[event]).unsubscribe(guid, tag);
                if ((<EventSubscription>this._innerDict[event]).count === 0) {
                    delete this._innerDict[event];
                }
            }
        }

        public dispatch(data: any, eventName: string, tag: string = null): PromiseWrapper<any> {

            if (this._innerDict[eventName]) {
                return (<EventSubscription>this._innerDict[eventName]).wrap(data, tag);
            }
            return this.$q.when();
        }
    }

    

    export class SubscriptionInfo {

        constructor(guid: string, event: string, tag: string = null) {
            this.event = event;
            this.tag = tag;
            this.isDestroyed = false;
        }

        private event: string;
        private tag: string;
        private isDestroyed: boolean;
        private dispatcher: EventDispatcher;
        private guid: string;

        public destroy(): void {
            if (!this.isDestroyed) {
                this.dispatcher.unsubscribe(this.guid, this.event, this.tag);
                this.isDestroyed = true;
            }
        }

        public get Dispatcher(): EventDispatcher {
            return this.dispatcher;
        }

        public set Dispatcher(value: EventDispatcher) {
            this.dispatcher = value;
        }

    }
} 