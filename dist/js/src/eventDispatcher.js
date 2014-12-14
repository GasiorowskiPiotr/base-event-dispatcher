/// <reference path="colWrapper.ts"/>
/// <reference path="promiseWrapper.ts"/>
/// <reference path="qWrapper.ts"/>
/// <reference path="eventSubscription.ts"/>
var evilduck;
(function (evilduck) {
    var EventDispatcher = (function () {
        function EventDispatcher($q, coll) {
            this._innerDict = {};
            this.$q = $q;
            this.coll = coll;
        }
        EventDispatcher.prototype.on = function (event, handler, tag) {
            if (tag === void 0) { tag = null; }
            if (!event) {
                throw new Error('Event name must not be empty');
            }
            if (!handler) {
                throw new Error('Handler must be defined');
            }
            if (!this._innerDict[event]) {
                this._innerDict[event] = new evilduck.EventSubscription(event, this.$q, this.coll);
            }
            var subsInfo = this._innerDict[event].subscribe(handler, tag);
            subsInfo.Dispatcher = this;
            return subsInfo;
        };
        EventDispatcher.prototype.unsubscribe = function (guid, event, tag) {
            if (tag === void 0) { tag = null; }
            if (this._innerDict[event]) {
                this._innerDict[event].unsubscribe(guid, tag);
                if (this._innerDict[event].count === 0) {
                    delete this._innerDict[event];
                }
            }
        };
        EventDispatcher.prototype.dispatch = function (data, eventName, tag) {
            if (tag === void 0) { tag = null; }
            if (this._innerDict[eventName]) {
                return this._innerDict[eventName].wrap(data, tag);
            }
            return this.$q.when();
        };
        return EventDispatcher;
    })();
    evilduck.EventDispatcher = EventDispatcher;
    var SubscriptionInfo = (function () {
        function SubscriptionInfo(guid, event, tag) {
            if (tag === void 0) { tag = null; }
            this.event = event;
            this.tag = tag;
            this.isDestroyed = false;
        }
        SubscriptionInfo.prototype.destroy = function () {
            if (!this.isDestroyed) {
                this.dispatcher.unsubscribe(this.guid, this.event, this.tag);
                this.isDestroyed = true;
            }
        };
        Object.defineProperty(SubscriptionInfo.prototype, "Dispatcher", {
            get: function () {
                return this.dispatcher;
            },
            set: function (value) {
                this.dispatcher = value;
            },
            enumerable: true,
            configurable: true
        });
        return SubscriptionInfo;
    })();
    evilduck.SubscriptionInfo = SubscriptionInfo;
})(evilduck || (evilduck = {}));
