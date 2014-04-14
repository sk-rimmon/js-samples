// BASIC OVERVIEW OF JAVASCRIPT:

(function (window, sample, undefined) {
    'use strict'; // always code in strict mode. this mode applies to the whole function's scope.

    // ---------
    // instances
    sample.log('--- INSTACES ---');
    var o1; // undefined
    var o2 = null; // null
    var o3 = {}; // instance of Object
    var s1 = 'sample string 1'; // instance of String
    var s2 = String('sample string 2'); // instance of String
    var s3 = new String('sample string 3'); // instance of String
    var a1 = new Array(1, 2, 3); // instance of Array
    var a2 = [1, 2, 3]; // instance of Array - quicker
    var n1 = 1,
        n2 = -1,
        n3 = NaN; // declaration chaining

    sample.log('o1', typeof o1, o1); // undefined, undefined
    sample.log('o2', typeof o2, o2); // null, null
    sample.log('o3', typeof o3, o3); // Object, {}
    sample.log('s1', typeof s1, s1); // String, sample string 1
    sample.log('s2', typeof s2, s2); // String, sample string 2
    sample.log('s3', typeof s3, s3); // String, sample string 3
    sample.log('a1', typeof a1, a1); // Object, not Array! (but (instanceof Array) === true), [1, 2, 3]
    sample.log('n1', typeof n1, n1); // Number, 1

    // ------------
    // comparisons:
    sample.log('--- COMPARISONS ---');
    var comp1 = '5',
        comp2 = 5;

    sample.log('"5" == 5', comp1 == comp2); // true, == provides type conversions
    sample.log('"5" === 5', comp1 === comp2); // false, types must be the same - much more quicke than ==, recommended to use in every ocasion.
    // use always === if you can, look at this:
    sample.log('[5] == 5', [5] == 5); // true, but === will outputs false
    sample.log('[] == 0', [] == 0); // true, but === will outputs false

    // ----
    // ifs:
    sample.log('--- IFs ---');
    var testIf = function () {
        // performance note: store length in variable once, it will be evaluated only once before first iteration.
        for (var i = 0, len = arguments.length; i < len; i++) {
            var obj = arguments[i];

            // the key here is that javascript can evaluate every instance whether is true or not. you can pass undefined, null, objects, array, custom classes,
            // functions, everything to the if clause.
            if (obj) {
                sample.log('If', obj, 'is true');
            } else {
                sample.log('If', obj, 'is false');
            }
        }
    }

    testIf(o1, o2, o3, s1, '', a2, [], n1, n2, n3, 0, $.noop);
    // outputs:
    // If undefined is false
    // If null is false
    // If {} is true
    // If 'sample string 1' is true
    // If '' is false
    // If [1, 2, 3] is true
    // If [] is true
    // If 1 is true
    // If -1 is true
    // If NaN is false
    // If 0 is false
    // If function () {} is true

    // please AVOID! this horrible method - it's absolute anti-pattern:
    var isNullOrEmpty = function (s) {
        return s == undefined || s == null || s == '';
    }
    // simple if (s) { ... } is enough here.

    // ------------------------
    // objects and inheritance:
    sample.log('--- OBJECTS AND INHERITANCE ---');

    // define class Robot -> each function is also a constructor. Constructors are starting with capital letter.
    var Robot = function (name) {

        // ensure the case that instance is possible to create without new keyword:
        // var robot = new Robot('name');
        // var robot = Robot('name');
        if (!(this instanceof Robot)) {
            return new Robot(name);
        }

        // we are expecting multiple instances in application so we will not specify methods inside constructor. Just call initial states of variables here.
        // variables must be public because we need them in prototype, use _ as a sign that you don't want to anybody to call them.
        this._name = name;
        this._health = 100;
    };

    // each class is inherited from Object class (the same as in C#), you can override methods from Object. In this case base method will be not called anymore.
    Robot.prototype.toString = function () {
        return this.getName() + ' [' + this._health + ']' + (this.isDestroyed() ? ' dead' : '');
    };

    // simple getter of name.
    Robot.prototype.getName = function () {
        return this._name;
    };

    // setter or action method
    Robot.prototype.damage = function (power) {
        this._health -= Math.min(power, this._health);
    };

    // boolean getter
    Robot.prototype.isDestroyed = function () {
        return this._health <= 0;
    }

    // action method
    Robot.prototype.attack = function (robot) {
        robot.damage(10);
    };

    // derived class which has Robot as a base class.
    var GiantDeathRobot = function () {
        if (!(this instanceof GiantDeathRobot)) {
            return new GiantDeathRobot(name);
        }

        // call base constructor, this sets the _name
        Robot.apply(this, arguments);

        // override default value in _health with our own
        this._health = 1000;
    }

    // set base class but contructor set back to GiantDeathRobot -> this is the key of inheritance.
    GiantDeathRobot.prototype = new Robot();
    GiantDeathRobot.constructor = GiantDeathRobot;

    // now you can override methods and append new ones. GiantDeathRobot have already got all methods from Robot.
    // override method getName. this method demonstrates the call to the base().
    GiantDeathRobot.prototype.getName = function () {
        return 'GiantDeathRobot: ' + Robot.prototype.getName.apply(this, arguments);
    }

    // increase robot's damage
    GiantDeathRobot.prototype.attack = function (robot) {
        robot.damage(500);
    };

    // run
    var builder = new Robot('Builder');
    sample.log(builder); // outputs: 'Builder [100]'
    sample.log(typeof builder, builder instanceof Robot, builder instanceof GiantDeathRobot); // ouputs: object, true, false

    var warrior = new GiantDeathRobot('Beast');
    sample.log(warrior); // outputs: 'GiantDeathRobot: Beast [1000]'
    sample.log(typeof warrior, warrior instanceof Robot, warrior instanceof GiantDeathRobot); // ouputs: object, true, true

    builder.attack(warrior);
    sample.log(warrior); // outputs: 'GiantDeathRobot: Beast [990]'

    warrior.attack(builder);
    sample.log(builder); // outputs: Builder [0] dead

    // notes:
    // there is also possible define real getters and setter just like in C# but is not supported in IE8
    // for more visit: __defineGetter__, __defineSetter__

    // performance notes:
    // use prototype whenever you expecting two or more instances of object. method defined on prototype is in memory only once and each instance has pointer to it.
    // attaching methods in contructor allocates and creates new method in memory for every instance. AVOID!
    // methods defined on instances always winning over prototype methods:
    var TestObject = function () {
        this.testMethod = function () {
            return 'I\'m method defined on instance.';
        };
    }

    TestObject.prototype.testMethod = function () {
        return 'I\'m method defined on protoype.';
    }

    var testObject = new TestObject();
    sample.log(testObject.testMethod()); // outputs 'I'm method defined on instance.', doesn't matter in which order they were defined.

    // ----------
    // overloads:
    sample.log('--- OVERLOADS ---');
    var testMethod = function (s, number, something) {
        sample.log('testMethod:', s, number, something, arguments.length);
    };

    testMethod(); // outputs: 'testMethod: undefined undefined undefined 0'
    testMethod('s', 1); // outputs: 'testMethod: s 1 undefined 2'
    testMethod('s', 1, {}, 'another'); // outputs: 'testMethod: s 1 {} 4'; 'another' is not in output but number of arguments is 4.

    sample.log(testMethod.length); // outputs: 3

    // call and apply:
    var testMethod2 = function (param1, param2) {
        sample.log(this, param1, param2);
    }

    testMethod2.call(this, 'sample string 1', 'sample string 2'); // outputs Window, 'sample string 1', 'sample string 2'
    testMethod2.apply(this, ['sample string 1', 'sample string 2']); // outputs Window, 'sample string 1', 'sample string 2'

    testMethod2.call({}, 'sample string 1', 'sample string 2'); // outputs Object, 'sample string 1', 'sample string 2'
    testMethod2.apply(1, ['sample string 1', 'sample string 2']); // outputs Number, 'sample string 1', 'sample string 2'

    // -----
    // misc:
    sample.log('--- MISC ---');
    sample.log(5.11 * 100); // outputs 511.00000000000006 because of approximations -> same thing what happens with "double" type in C# but in JS there is no "decimal" type so there is no workaround, there is only method toFixed(n).
    sample.log(0.1 + 0.2); // 0.30000000000000004 ^^, visit http://www.2ality.com/2012/04/number-encoding.html for more information
    sample.log(parseInt('10'), parseInt('010'), parseInt('010', 10)); // outputs 10, 8, 10; older browser parsing strings with leading zero as octal numbers -> always specify radix.
    sample.log(typeof (5 + '')); // outputs string -> very fast conversion toString
    sample.log(typeof ('5' * 1)); // outputs Number -> better than parseInt('5', 10). But if you need this or parseInt() something is wrong with your code.

    // AVOID! Seriously! AVOID!
    // eval('var evalVariable = 7; sample.log("message from eval()", evalVariable);');
    // setTimeout('var timeoutVariable = 9; sample.log("message from timeout", timeoutVariable);', 0);

    // scopes:
    sample.log('--- SCOPES ---');

    try {
        __i = 0; // defines global variable __i -> the same as window.__i = 0; AVOID! it's not event runable in strict mode and it will throw ReferenceError exception.
    } catch (e) {
        sample.log(e);
    }

    var j = 5; // defines variable for current function's scope;

    // careful: in this for cycle, k is defined on the same scope as j, javascript moves all var declarations to the begin of the scope.
    for (var k = 0; k < j; k++) {
        // do nothing
    }

    sample.log('value of k:', k); // outputs 5; k is available here
    // var k; -> will cause duplicate declaration here and possible bugs
    var nestedMethod = function () {
        // new method creates new inherited scope
        sample.log('value of j in nested method: ', j); // outputs 5, scope are inherited so j from outter scope is available here.
        // if you define k here, it will be available only in this method and will hide the k from outter scope. AVOID!
        var k = 6;
        sample.log('value of k in nested method: ', k); // outputs 6, there is no way how to get value of k from outter scope.
        var l = 55;
        sample.log('value of l in nested method: ', l); // outputs 55. value is not visible outside this scope.
    };

    nestedMethod();
    try {
        sample.log('value of l:', l); // outputs undefined; l is not available here. in strict mode this is not runable and you will get ReferenceError.
    } catch (e) {
        sample.log('value of l:', e);
    }

    // must read articles:
    // Google Code JavaScript tips: https://code.google.com/p/jslibs/wiki/JavascriptTips
    // StackOverflow tips: http://stackoverflow.com/questions/724826/javascript-tips-and-tricks-javascript-best-practices
    // Performance best practices: http://developer.nokia.com/community/wiki/JavaScript_Performance_Best_Practices

})(window, window.sample = window.sample || {});