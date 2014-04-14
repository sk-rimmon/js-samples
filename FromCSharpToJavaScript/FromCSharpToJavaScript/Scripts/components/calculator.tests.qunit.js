/// <reference path="../qunit-1.14.0.js"/>
/// <reference path="calculator.js"/>

// calculator tests written in qunit.
// how to run:
// 1. browse url /test-samples/qunit/ or
// 2. run this file in R# tests or
// 3. run this tests using R# together with phantomJS
(function (window, sample) {

    module('Calculator - Add function');

    // qunit missing set up and tear down methods that could initialize instances of calculator. so the constructors are called inside tests.

    var testSamples = [
        { it: 'should add two positive numbers', a: 5, b: 7, r: 12 },
        { it: 'should add one positive and one negative number', a: -5, b: 7, r: 2 },
        { it: 'should be symmetric', a: 5, b: -7, r: -2 },
        { it: 'add two negative numbers', a: -5, b: -7, r: -12 },
        { it: 'should ignore null parameter', a: 5, b: null, r: 5 },
        { it: 'should ignore null parameters', a: null, b: null, r: 0 }
    ];

    for (var i = 0, len = testSamples.length; i < len; i++) {
        var testSample = testSamples[i];

        test(testSample.it, function () {
            var calc = new sample.calculator();
            var result = calc.add(testSample.a, testSample.b);

            strictEqual(result, testSample.r, testSample.error);
        });
    }

    test('should work without parameters', function () {
        var calc = new sample.calculator();
        var result = calc.add();

        strictEqual(result, 0);
    });

    test('should work with only one parameter', function () {
        var calc = new sample.calculator();
        var result = calc.add(5);

        strictEqual(result, 5);
    });

    test('should ignore empty strings in paremeter', function () {
        var calc = new sample.calculator();
        var result = calc.add(5, '');

        strictEqual(result, 5);
        notStrictEqual(result, '5');
    });

    test('should convert integers in strings and properly use them', function () {
        var calc = new sample.calculator();
        var result = calc.add(5, '7');

        strictEqual(result, 12);
        notStrictEqual(result, '12');
    });

    test('should ignore letters in parameter', function () {
        var calc = new sample.calculator();
        var result = calc.add(5, 'abc');

        strictEqual(result, 5);
        notStrictEqual(result, '5abc');
    });

    module('Calculator - Multiply function');

    testSamples = [
        { it: 'should multiply whole positive numbers', a: 5, b: 7, r: 35 },
        { it: 'should multiply whole positive and negative numbers', a: -5, b: 7, r: -35 },
        { it: 'should be symmetric', a: 5, b: -7, r: -35 },
        { it: 'should multiply whole negative numbers', a: -5, b: -7, r: 35 },
        { it: 'should mutliply zeros', a: 5, b: 0, r: 0 },
        { it: 'should ignore null in parameter', a: 5, b: null, r: 0 },
        { it: 'should ignore null in parameters', a: null, b: null, r: 0 }
    ];

    for (i = 0, len = testSamples.length; i < len; i++) {
        testSample = testSamples[i];

        test(testSample.it, function () {
            var calc = new sample.calculator();
            var result = calc.multiply(testSample.a, testSample.b);

            strictEqual(result, testSample.r, testSample.error);
        });
    }

    test('should be callable without parameters', function () {
        var calc = new sample.calculator();
        var result = calc.multiply();

        strictEqual(result, 0);
    });

    test('should ignore empty string in parameter', function () {
        var calc = new sample.calculator();
        var result = calc.multiply(5, '');

        strictEqual(result, 0);
    });

    test('should convert integers in strings and properly use them', function () {
        var calc = new sample.calculator();
        var result = calc.multiply(5, '7');
        strictEqual(result, 35);
        notStrictEqual(result, '35');
        notStrictEqual(result, '5555555');
        notStrictEqual(result, '77777');
    });

    test('should ignore letters in parameter', function () {
        var calc = new sample.calculator();
        var result = calc.multiply(5, 'abc');
        strictEqual(result, 0);
        notStrictEqual(result, 'abcabcabcabcabc');
    });

    test('should use minimal number of internal calls to add() method', function () {
        // qunit missing functionality that will be able to execute this test.
        ok(true, true);
    });

})(window, window.sample = window.sample || {});