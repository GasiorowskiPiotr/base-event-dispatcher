var evilduck;
(function (evilduck) {
    var CollWrapper = (function () {
        function CollWrapper() {
        }
        CollWrapper.prototype.map = function (col, func) {
            throw new Error("Not implemented");
        };
        CollWrapper.prototype.union = function (col1, col2) {
            throw new Error("Not implemented");
        };
        CollWrapper.prototype.find = function (col, pred) {
            throw new Error("Not implemented");
        };
        CollWrapper.prototype.indexOf = function (col, item) {
            throw new Error("Not implemented");
        };
        CollWrapper.prototype.filter = function (col, pred) {
            throw new Error("Not implemented");
        };
        return CollWrapper;
    })();
    evilduck.CollWrapper = CollWrapper;
})(evilduck || (evilduck = {}));
