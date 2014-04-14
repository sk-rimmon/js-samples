(function (angular, $, undefined) {
    'use strict';

    angular.module('crm.screen', [])
        .directive('title', [
            '$screen', function ($screen) {
                return {
                    restrict: 'E',
                    scope: true,
                    link: function ($scope) {
                        $scope.title = $scope.title || '';

                        $scope.update = function (title) {
                            $scope.title = title;
                        };

                        $screen.registerTitle($scope);
                    }
                };
            }
        ])
        .factory('$screen', function () {
            return new (function () {
                var title = null;

                this.registerTitle = function (scope) {
                    title = scope;
                };

                this.setTitle = function (text) {
                    return title && title.update(text);
                };
            })();
        })
        .run([
            '$rootScope', '$screen', function ($rootScope, $screen) {
                $rootScope.$on('$routeChangeStart', function ($event, $current) {
                    var route = $current.$$route;
                    if (route) {
                        var title = route.title;
                        if (title) {
                            $screen.setTitle(title);
                        }
                    }
                });
            }
        ]);

}(window.angular, window.jQuery));