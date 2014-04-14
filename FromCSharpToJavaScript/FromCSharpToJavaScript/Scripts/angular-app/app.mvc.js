(function (angular, $, undefined) {
    'use strict';

    angular.module('crm')
        .config([
            '$httpProvider', function ($httpProvider) {
                // https://github.com/angular/angular.js/commit/3a75b1124d062f64093a90b26630938558909e8d
                $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
            }
        ]);

}(window.angular, window.jQuery));