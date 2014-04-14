(function (crm, angular, $, undefined) {
    'use strict';

    crm.defaults = $.extend(true, {
        errors: {
            generalError: '',
            logUrl: null
        }
    }, crm.defaults);

    angular.module('crm')
        .constant('$defaults', crm.defaults);

}(window.crm = window.crm || {}, window.angular, window.jQuery));