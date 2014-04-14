(function (angular, $, undefined) {
    'use strict';

    angular.module('crm')
        .config([
            '$httpProvider', function ($httpProvider) {
                $httpProvider.interceptors.push([
                    '$q', '$log', '$csrf', function ($q, $log, $csrf) {
                        return new (function () {
                            this.request = function (config) {
                                $log.debug('AJAX request:', config);

                                var token = $csrf.getToken();
                                if (token) {
                                    config.headers[$csrf.getName()] = token;
                                }

                                return config || $q.when(config);
                            };

                            this.response = function (response) {
                                $log.debug('AJAX response:', response);
                                return response || $q.when(response);
                            };
                        })();
                    }
                ]);

                $httpProvider.interceptors.push([
                    '$q', '$log', '$window', '$defaults', '$injector', function ($q, $log, $window, $defaults, $injector) {
                        return new (function () {
                            this.requestError = function (rejection) {
                                $log.debug('AJAX request error', rejection);
                                return $q.reject(rejection);
                            };

                            this.responseError = function (rejection) {
                                $log.debug('AJAX response error', rejection);

                                var message = '';
                                var width = 1000;
                                var location;

                                if (rejection.status === 404) {
                                    message = 'A given url was not found.';
                                    width = 580;
                                    // 500 - internal error
                                } else if (rejection.status === 500) {
                                    location = rejection.headers()['location'];
                                    if (location) {
                                        $window.location.href = location;
                                        return $q.reject(rejection);
                                    }
                                }

                                if (!message) {
                                    message = $defaults.errors.generalError;
                                }

                                // $dialogs is dependent on $http, so it will cause a circular dependency when we try to inject it to method parameters.
                                var $dialogs = $injector.get('$dialogs');
                                $dialogs.alert(message, {
                                    width: width
                                });

                                return $q.reject(rejection);
                            };
                        })();
                    }
                ]);
            }
        ]);

}(window.angular, window.jQuery));