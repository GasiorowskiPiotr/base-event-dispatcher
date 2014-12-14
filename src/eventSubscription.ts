/// <reference path="colWrapper.ts"/>
/// <reference path="qWrapper.ts"/>
/// <reference path="tagSubscription.ts"/>
/// <reference path="innerSubscription.ts"/>

module evilduck {

    export interface IEventSubscription {
        wrap(data: any, tagName: string): PromiseWrapper<any>;
    }

    export class EventSubscription implements IEventSubscription {
        private _eventName: string;
        private _tagSubs: TagSubscription[];
        private _subs: ISubscription[];
        private _q: QWrapper;
        private _coll: CollWrapper;

        constructor(eventName: string, q: QWrapper, coll: CollWrapper) {
            this._eventName = eventName;
            this._tagSubs = new Array<TagSubscription>();
            this._subs = new Array<ISubscription>();
            this._q = q;
            this._coll = coll;
        }

        public get eventName(): string {
            return this._eventName;
        }

        public subscribe(func: (any) => any, tag: string = null): SubscriptionInfo {
            return this.subscribeGeneral(func, tag);
        }

       
        private subscribeGeneral(func: (any) => any, tag: string = null): SubscriptionInfo {
            var guid = this.createGuid();
            if (tag) {
                this._tagSubs.push(TagSubscription.General(tag, func, guid));
                return new SubscriptionInfo(guid, this._eventName, tag);
            } else {
                this._subs.push(new InnerSubscription(func, guid));
                return new SubscriptionInfo(guid, this._eventName);
            }
        }

        public wrap(data: any, tagName: string = null): PromiseWrapper<any> {

            var subs: ISubscription[];
            var tagSubs: TagSubscription[];

            if (tagName) {
                subs = new Array<ISubscription>();
                // TODO: Cache it
                tagSubs = this._coll.filter(this._tagSubs, (ts: TagSubscription) => ts.tagName === tagName);
            } else {
                subs = this._subs;
                tagSubs = this._tagSubs;
            }

            var toExec = this._coll.union(subs, tagSubs);
            if (toExec.length == 0) {
                return this._q.when();
            }

            var promises = this._coll.map(toExec, (sub: ISubscription) => {
                return sub.wrap(this._q, data);
            });

            return this._q.all(promises);
        }

        public unsubscribe(guid: string, tag: string = null) {
            if (tag) {
                var itemT = this._coll.find(this._tagSubs, (s: TagSubscription) => s.tagName === tag && s.guid === guid);
                var idxT = this._coll.indexOf(this._tagSubs, itemT);
                this._tagSubs.splice(idxT, 1);
            } else {
                var itemS = this._coll.find(this._subs, (s: ISubscription) => s.guid === guid);
                var idxS = this._coll.indexOf(this._subs, itemS);
                this._subs.splice(idxS, 1);
            }
        }

        public get count(): number {
            return this._subs.length + this._tagSubs.length;
        }

        private createGuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    }
} 