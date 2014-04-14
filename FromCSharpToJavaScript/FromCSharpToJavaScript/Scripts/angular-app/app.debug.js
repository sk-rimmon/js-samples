(function (cr, angular, $, undefined) {
    'use strict';

    angular.module('crm')
        .config([
            '$logProvider', function ($logProvider) {
                $logProvider.debugEnabled(true);
            }
        ]);

}(window.cr = window.cr || {}, window.angular, window.jQuery));