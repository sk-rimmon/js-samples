// THINGS TO AVOID:

sample.log('--- DON\'TS #1 ---');
// 1. global functions
// - don't use global functions. this declaration equals to:
//   window.getCurrentDate = function () { ... }
// - you can easily go to conflict if another module has the same method or you can replace native function in browser or harm extensions in Chrome and FF written in JS.
// - there is really very high possibility that helpers like getDate(), format(), getValue() would have conflicts.
function getCurrentDate() {
    return new Date();
}

function getCurrentDateString() {
    return getCurrentDate().toString();
}

// solution: create a module with helper methods for date and attach it to one common object.
(function (app) {
    // I'm sure that this helper will be instantiated only once on the page, so it doesn't matter if I attach methods inside constructor or I will use DateHelper.prototype.
    var DateHelper = function () {
        this.getCurrentDate = function () {
            return new Date();
        };
        this.getCurrentDateString = function () {
            return this.getCurrentDate().toString();
        }
    };

    app.dates = new DateHelper();
})(window.sample = window.sample || {}); // this will ensure one common object will be created only once and it's not dependent on order of js files. It's the same principle as in jQuery.

// run:
sample.log('Date helper - getCurrentDate:', sample.dates.getCurrentDate());
sample.log('Date helper - getCurrentDateString:', sample.dates.getCurrentDateString());

sample.log('--- DON\'TS #2 ---');
// -------------------------------
// 2. global variables and getters
// - the same rules as in 1.
var version = '1.1.2';

function getVersion() {
    return 'Sample Application v' + version;
}

// solution: attach this pair to the one common object:
(function (app) {
    // this variable is private inside this scope so nobody can read its value outside.
    var version = '1.1.2';

    // you can also have private methods.
    var formatVersion = function (name, ver) {
        return name + ' v' + ver;
    }

    app.getVersion = function () {
        // this variable is private inside this scope. variables from outter scopes are also available, so be careful with naming. 
        var name = 'Sample Application';
        // var version = '1.1.3'; will hide variable version from outter scope.

        // call private method, private methods don't require 'this', only public do.
        return formatVersion(name, version);
    };

})(window.sample = window.sample || {}); // reuse previous common object from 1.

// run
sample.log('Version:', sample.getVersion(), sample.version, sample.formatVersion); // outputs: 'Sample Application v1.1.2' undefined undefined

sample.log('--- DON\'TS #3 ---');
// -------------------------------------
// 3. ensure method is called only once.
// - don't use declaration like this, use anonymous methods (also know as Immediately Invoked Function Expression (IIFE))
// - you are creating a public api for your page and anybody in anytime can call this method again and again.
// - if name is missleading, some developers can also call this method again and again.
function initPage () {
    sample.log('Initialization started.');

    // sniff

    sample.log('Initialization ended.');
}

initPage();

// solution: anonymous method is declared in () and then imidiately called with ();
// you can pass arguments to the anonymous method, in most cases it should be global parameters: window, $, angular, require or window.sample object
(function (window, $, sample, undefined) {
    sample.log('Initialization started in anonymous method.');

    sample.log('Initialization - href:', window.location.href);
    sample.log('Initialization - supports ajax:', $.support.ajax);
    sample.log('Initialization - sample version:', sample.getVersion());

    // if you pass undefined as one additional parameter, you are sure that undefined is really undefined in this scope. if somebody change the global undefined 
    // to string, your code will be still working.
    sample.log('Initialization - undefined:', typeof undefined === "undefined");

    sample.log('Initialization ended in anonymous method.');
})(window, jQuery, window.sample = window.sample || {});

// you can also have anonymous constructor:
(function (sample) {
    sample.logger1 = (function (logger) {
        logger.debug = function () {
            sample.log.apply(sample, arguments);
        };

        return logger;
    })({});

    // or:
    sample.logger2 = new (function () {
        this.debug = function () {
            sample.log.apply(sample, arguments);
        };
    })();
})(window.sample = window.sample || {});

// run:
sample.logger1.debug('test', 'logger1');
sample.logger2.debug('test', 'logger2');