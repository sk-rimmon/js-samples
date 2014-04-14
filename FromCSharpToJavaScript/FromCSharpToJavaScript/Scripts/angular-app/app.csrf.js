(function (angular, $, undefined) {
    'use strict';

    angular.module('crm.csrf', [])
        .factory('$csrf', function () {
            return new (function () {
                var name = "__RequestVerificationToken";

                this.getToken = function () {
                    return this.getTokenElement().val();
                };

                this.getTokenElement = function () {
                    return angular.element('#tokens input[name="' + name + '"]');
                };

                this.getName = function () {
                    return name;
                };
            })();
        });

}(window.angular, window.jQuery));