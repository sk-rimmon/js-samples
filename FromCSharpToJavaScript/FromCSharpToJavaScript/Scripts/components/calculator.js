(function (window, sample) {
    'use strict';

    // A simple Calculator module representing some testable business module.
    // Contains only two methods Add and Multiply and it's working only with whole numbers but the functionality it's not important.
    // More important is that we have an unit with custom logic for testing.
    var Calculator = function () { };

    Calculator.prototype.add = function (a, b) {
        var aIsNotANumber = window.isNaN(a),
            bIsNotANumber = window.isNaN(b);

        if (aIsNotANumber && bIsNotANumber) {
            return 0;
        }
        if (aIsNotANumber) {
            return b;
        }
        if (bIsNotANumber) {
            return a;
        }

        return (a * 1) + (b * 1);
    };

    Calculator.prototype.multiply = function (a, b) {
        if (Math.abs(a) > Math.abs(b)) {
            var c = b;
            b = a;
            a = c;
        }

        var result = 0;
        b = a < 0 ? -b : b;
        a = Math.abs(a);

        for (var i = 0; i < a; i++) {
            result = this.add(result, b);
        }

        return result;
    };

    sample.calculator = Calculator;

})(window, window.sample = window.sample || {});