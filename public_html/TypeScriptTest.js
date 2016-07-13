var Person = (function () {
    function Person(age) {
        this.age = 33;
        this.age = age;
    }
    return Person;
}());
;
var Car = (function () {
    function Car(engine) {
        var _this = this;
        this.engine = engine;
        this.stop = function () { return "Stopped " + _this.engine; };
    }
    Car.prototype.start = function () {
        return "Started " + this.engine;
    };
    return Car;
}());
