/// <reference path="jasmine.js"/>
/// <reference path="../components/calculator.js"/>

// calculator tests written in jasmine.
// how to run:
// 1. browse url /test-samples/jasmine/ or
// 2. run this file in R# tests or
// 3. run this tests using R# together with phantomJS
(function (window, sample) {

    // tests for add function.
    describe('Calculator - Add function', function () {

        // set up
        beforeEach(function () {
            this.calc = new sample.calculator();
        });

        // tear down
        afterEach(function () {
            // nothing to do here
        });

        it('should add two positive numbers', function () {
            var result = this.calc.add(5, 7);
            expect(result).toBe(12);
        });

        it('should add one positive and one negative number', function () {
            var result = this.calc.add(-5, 7);
            expect(result).toBe(2);
        });

        it('should be symmetric', function () {
            var result = this.calc.add(5, -7);
            expect(result).toBe(-2);
        });

        it('add two negative numbers', function () {
            var result = this.calc.add(-5, -7);
            expect(result).toBe(-12);
        });

        it('should ignore null parameter', function () {
            var result = this.calc.add(5, null);
            expect(result).toBe(5);
        });

        it('should ignore null parameters', function () {
            var result = this.calc.add(null, null);
            expect(result).toBe(0);
        });

        it('should work without parameters', function () {
            var result = this.calc.add();
            expect(result).toBe(0);
        });

        it('should work with only one parameter', function () {
            var result = this.calc.add(5);
            expect(result).toBe(5);
        });

        it('should ignore empty strings in paremeter', function () {
            var result = this.calc.add(5, '');
            expect(result).toBe(5);
            expect(result).not.toBe('5');
        });

        it('should convert integers in strings and properly use them', function () {
            var result = this.calc.add(5, '7');
            expect(result).toBe(12);
            expect(result).not.toBe('12');
        });

        it('should ignore letters in parameter', function () {
            var result = this.calc.add(5, 'abc');
            expect(result).toBe(5);
            expect(result).not.toBe('5abc');
        });
    });

    describe('Calculator - Multiply function', function () {

        beforeEach(function () {
            this.calc = new sample.calculator();
        });

        it('should multiply whole positive numbers', function () {
            var result = this.calc.multiply(5, 7);
            expect(result).toBe(35);
        });

        it('should multiply whole positive and negative numbers', function () {
            var result = this.calc.multiply(-5, 7);
            expect(result).toBe(-35);
        });

        it('should be symmetric', function () {
            var result = this.calc.multiply(5, -7);
            expect(result).toBe(-35);
        });

        it('should multiply whole negative numbers', function () {
            var result = this.calc.multiply(-5, -7);
            expect(result).toBe(35);
        });

        it('should mutliply zeros', function () {
            var result = this.calc.multiply(5, 0);
            expect(result).toBe(0);
        });

        it('should ignore null in parameter', function () {
            var result = this.calc.multiply(5, null);
            expect(result).toBe(0);
        });

        it('should ignore null in parameters', function () {
            var result = this.calc.multiply(null, null);
            expect(result).toBe(0);
        });

        it('should be callable without parameters', function () {
            var result = this.calc.multiply();
            expect(result).toBe(0);
        });

        it('should be callable only with one parameter', function () {
            var result = this.calc.multiply(5);
            expect(result).toBe(0);
        });

        it('should ignore empty string in parameter', function () {
            var result = this.calc.multiply(5, '');
            expect(result).toBe(0);
        });

        it('should convert integers in strings and properly use them', function () {
            var result = this.calc.multiply(5, '7');
            expect(result).toBe(35);
            expect(result).not.toBe('35');
            expect(result).not.toBe('5555555');
            expect(result).not.toBe('77777');
        });

        it('should ignore letters in parameter', function () {
            var result = this.calc.multiply(5, 'abc');
            expect(result).toBe(0);
            expect(result).not.toBe('abcabcabcabcabc');
        });

        it('should use minimal number of internal calls to add() method', function () {
            spyOn(this.calc, 'add').and.callThrough();

            // 100 * 2 means add 100 times the number 2, that's not very optimal. better is add 2 times the number 100.
            var result = this.calc.multiply(100, 2);
            expect(result).toBe(200);
            expect(this.calc.add.calls.count()).toBe(2);
        });
    });

})(window, window.sample = window.sample || {});