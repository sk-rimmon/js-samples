(function (angular, $, undefined) {
    'use strict';

    angular.module('crm', [
        // angular
        'ngRoute',

        // bootstrap
        'ui.bootstrap',

        // crm
        'crm.console',
        'crm.csrf',
        'crm.dialogs',
        'crm.forms',
        'crm.grids',
        /*'crm.panels',*/
        'crm.screen'
    ]);

}(window.angular, window.jQuery));