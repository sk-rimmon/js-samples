(function (angular, $, undefined) {
    'use strict';

    angular.module('crm.forms', [])
        .run([
            '$templateCache', function ($templateCache) {
                $templateCache.put(
                    'templates/validation-summary.html',
                    '<div class="alert alert-danger validation-summary" data-ng-class="{ \'validation-summary-invalid\': $errors.length }">' +
                    '<ul class="validation-summary-errors">' +
                    '<li data-ng-repeat="$error in $errors">{{$error.message}}</li>' +
                    '</ul>' +
                    '</div>'
                );
            }
        ])
        .directive('validationSummary', function () {
            return {
                restrict: 'A',
                replace: true,
                require: '^form',
                templateUrl: 'templates/validation-summary.html',
                link: function ($scope, $element, $attrs, controller) {
                    $scope.$errors = [];
                    controller.registerSummary($scope);
                }
            };
        })
        .directive('form', function () {
            return {
                restrict: 'E',
                require: '^form',
                link: function ($scope, $element, $attrs, controller) {
                    var summaries = [];

                    controller.registerSummary = function (summary) {
                        summaries.push(summary);
                    };

                    controller.updateSummaries = function (modelState) {
                        angular.forEach(summaries, function (summary) {
                            summary.$errors = modelState;
                        });
                    };

                    $scope.$watch(controller.$name + '.$modelState', function (value) {
                        controller.updateSummaries(value);

                        angular.element('.form-group', $element).removeClass('has-error has-warning has-success');
                        angular.forEach(value, function (error, index) {
                            if (error.member && error.message) {
                                var input = angular.element('[name="' + error.member + '"]', $element);
                                if (input.length) {
                                    input.closest('.form-group').addClass('has-error');
                                }
                            }
                        });

                        angular.element('.has-error:first', $element).find(':input').focus();
                    });
                }
            };
        });

}(window.angular, window.jQuery));