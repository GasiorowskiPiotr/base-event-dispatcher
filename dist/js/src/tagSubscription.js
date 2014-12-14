/// <reference path="innerSubscription.ts"/>
/// <reference path="qWrapper.ts"/>
/// <reference path="promiseWrapper.ts"/>
var evilduck;
(function (evilduck) {
    var TagSubscription = (function () {
        function TagSubscription() {
        }
        TagSubscription.General = function (tagName, func, guid) {
            if (guid === void 0) { guid = null; }
            var s = new TagSubscription();
            s._sub = new evilduck.InnerSubscription(func, guid);
            s._tagName = tagName;
            return s;
        };
        Object.defineProperty(TagSubscription.prototype, "tagName", {
            get: function () {
                return this._tagName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TagSubscription.prototype, "subscription", {
            get: function () {
                return this._sub;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TagSubscription.prototype, "guid", {
            get: function () {
                return this._guid;
            },
            enumerable: true,
            configurable: true
        });
        TagSubscription.prototype.wrap = function ($q, data) {
            return this._sub.wrap($q, data);
        };
        return TagSubscription;
    })();
    evilduck.TagSubscription = TagSubscription;
})(evilduck || (evilduck = {}));
