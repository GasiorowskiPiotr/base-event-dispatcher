/// <reference path="colWrapper.ts"/>
/// <reference path="qWrapper.ts"/>
/// <reference path="tagSubscription.ts"/>
/// <reference path="innerSubscription.ts"/>
var evilduck;
(function (evilduck) {
    var EventSubscription = (function () {
        function EventSubscription(eventName, q, coll) {
            this._eventName = eventName;
            this._tagSubs = new Array();
            this._subs = new Array();
            this._q = q;
            this._coll = coll;
        }
        Object.defineProperty(EventSubscription.prototype, "eventName", {
            get: function () {
                return this._eventName;
            },
            enumerable: true,
            configurable: true
        });
        EventSubscription.prototype.subscribe = function (func, tag) {
            if (tag === void 0) { tag = null; }
            return this.subscribeGeneral(func, tag);
        };
        EventSubscription.prototype.subscribeGeneral = function (func, tag) {
            if (tag === void 0) { tag = null; }
            var guid = this.createGuid();
            if (tag) {
                this._tagSubs.push(evilduck.TagSubscription.General(tag, func, guid));
                return new evilduck.SubscriptionInfo(guid, this._eventName, tag);
            }
            else {
                this._subs.push(new evilduck.InnerSubscription(func, guid));
                return new evilduck.SubscriptionInfo(guid, this._eventName);
            }
        };
        EventSubscription.prototype.wrap = function (data, tagName) {
            var _this = this;
            if (tagName === void 0) { tagName = null; }
            var subs;
            var tagSubs;
            if (tagName) {
                subs = new Array();
                // TODO: Cache it
                tagSubs = this._coll.filter(this._tagSubs, function (ts) { return ts.tagName === tagName; });
            }
            else {
                subs = this._subs;
                tagSubs = this._tagSubs;
            }
            var toExec = this._coll.union(subs, tagSubs);
            if (toExec.length == 0) {
                return this._q.when();
            }
            var promises = this._coll.map(toExec, function (sub) {
                return sub.wrap(_this._q, data);
            });
            return this._q.all(promises);
        };
        EventSubscription.prototype.unsubscribe = function (guid, tag) {
            if (tag === void 0) { tag = null; }
            if (tag) {
                var itemT = this._coll.find(this._tagSubs, function (s) { return s.tagName === tag && s.guid === guid; });
                var idxT = this._coll.indexOf(this._tagSubs, itemT);
                this._tagSubs.splice(idxT, 1);
            }
            else {
                var itemS = this._coll.find(this._subs, function (s) { return s.guid === guid; });
                var idxS = this._coll.indexOf(this._subs, itemS);
                this._subs.splice(idxS, 1);
            }
        };
        Object.defineProperty(EventSubscription.prototype, "count", {
            get: function () {
                return this._subs.length + this._tagSubs.length;
            },
            enumerable: true,
            configurable: true
        });
        EventSubscription.prototype.createGuid = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };
        return EventSubscription;
    })();
    evilduck.EventSubscription = EventSubscription;
})(evilduck || (evilduck = {}));
