/// <reference path="promiseWrapper.ts"/>
var evilduck;
(function (evilduck) {
    var QWrapper = (function () {
        function QWrapper() {
        }
        QWrapper.prototype.when = function (a) {
            if (a === void 0) { a = null; }
            throw new Error("Not implemented");
        };
        QWrapper.prototype.all = function (promises) {
            throw new Error("Not implemented");
        };
        return QWrapper;
    })();
    evilduck.QWrapper = QWrapper;
})(evilduck || (evilduck = {}));
