var evilduck;
(function (evilduck) {
    var PromiseWrapper = (function () {
        function PromiseWrapper() {
        }
        PromiseWrapper.prototype.then = function (func) {
            throw new Error("Not implemented");
        };
        PromiseWrapper.prototype.catch = function (func) {
            throw new Error("Not implemented");
        };
        PromiseWrapper.prototype.finally = function (func) {
            throw new Error("Not implemented");
        };
        return PromiseWrapper;
    })();
    evilduck.PromiseWrapper = PromiseWrapper;
})(evilduck || (evilduck = {}));
