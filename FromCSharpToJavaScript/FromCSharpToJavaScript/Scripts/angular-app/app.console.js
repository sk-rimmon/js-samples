(function (angular, $, undefined) {
    'use strict';

    angular.module('crm.console', [])
        .config([
            '$logProvider', function ($logProvider) {
                $logProvider.debugEnabled(false);
            }
        ])
        .run([
            '$window', function ($window) {
                var console = $window.console = $window.console || {};
                console.log = console.log || angular.noop;
                console.debug = console.debug || console.log;
                console.info = console.info || console.debug;
            }
        ]);

}(window.angular, window.jQuery));