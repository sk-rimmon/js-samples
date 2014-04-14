(function (angular, $, undefined) {
    'use strict';

    angular.module('crm.dialogs', [])
        .run([
            '$templateCache', function ($templateCache) {
                $templateCache.put(
                    'template/modal/one-message-dialog.html',
                    '<div class="modal-header">' +
                    '<h3 class="{{options.headerCssClass}}">{{options.headerText}}</h3>' +
                    '</div>' +
                    '<div class="modal-body">{{message}}</div>' +
                    '<div class="modal-footer">' +
                    '<button data-ng-click="close()" class="btn btn-default">{{options.buttonText}}</button>' +
                    '</div>'
                );

                $templateCache.put(
                    'template/modal/confirm.html',
                    '<div class="modal-header">' +
                    '<h3 class="{{options.headerCssClass}}">{{options.headerText}}</h3>' +
                    '</div>' +
                    '<div class="modal-body">{{message}}</div>' +
                    '<div class="modal-footer">' +
                    '<button data-ng-click="confirm()" class="btn btn-default">{{options.buttonConfirmText}}</button>' +
                    '<button data-ng-click="reject()" class="btn btn-default">{{options.buttonRejectText}}</button>' +
                    '</div>'
                );
            }
        ])
        .controller('oneMessageDialogController', function ($scope, $modalInstance, message, options) {
            $scope.message = message;
            $scope.options = options;

            $scope.close = function () {
                $modalInstance.close();
            };
        })
        .controller('confirmDialogController', function ($scope, $modalInstance, message, options) {
            $scope.message = message;
            $scope.options = options;

            $scope.confirm = function () {
                $modalInstance.close();
            };

            $scope.reject = function () {
                $modalInstance.dismiss();
            };
        })
        .factory('$dialogs', [
            '$window', '$timeout', '$modal', '$q', function ($window, $timeout, $modal, $q) {
                return new (function () {

                    var oneMessageDialog = function (message, userOptions, defaults) {
                        return new (function () {
                            var options = $.extend({}, defaults, userOptions);

                            var deferred = $q.defer();

                            var modalInstance = $modal.open({
                                templateUrl: 'template/modal/one-message-dialog.html',
                                controller: 'oneMessageDialogController',
                                windowClass: options.windowClass,
                                resolve: {
                                    message: function () {
                                        return message;
                                    },
                                    options: function () {
                                        return options;
                                    }
                                }
                            });

                            modalInstance.result.then(function (result) {
                                deferred.resolve(result);
                            });

                            this.closed = function (callback) {
                                deferred.promise.then(callback);
                                return this;
                            };

                            if (options.closed) {
                                this.closed(options.closed);
                            }
                        })();
                    };

                    this.alert = function (message, options) {
                        return oneMessageDialog(message, options, {
                            windowClass: 'modal-dialog-alert',
                            headerText: 'Alert',
                            buttonText: 'Close',
                            headerCssClass: 'text-danger'
                        });
                    };

                    this.warning = function (message, options) {
                        return oneMessageDialog(message, options, {
                            windowClass: 'modal-dialog-warning',
                            headerText: 'Warning',
                            buttonText: 'Close',
                            headerCssClass: 'text-warning'
                        });
                    };

                    this.message = function (message, options) {
                        return oneMessageDialog(message, options, {
                            windowClass: 'modal-dialog-message',
                            headerText: 'Message',
                            buttonText: 'OK',
                            headerCssClass: 'text-info'
                        });
                    };

                    this.confirm = function (message, userOptions) {
                        return new (function () {
                            var options = $.extend({}, {
                                headerCssClass: 'text-info',
                                headerText: 'Confirm',
                                buttonConfirmText: 'Yes',
                                buttonRejectText: 'No',
                            }, userOptions);

                            var deferred = $q.defer();

                            var modalInstance = $modal.open({
                                templateUrl: 'template/modal/confirm.html',
                                controller: 'confirmDialogController',
                                windowClass: options.windowClass,
                                resolve: {
                                    message: function () {
                                        return message;
                                    },
                                    options: function () {
                                        return options;
                                    }
                                }
                            });

                            modalInstance.result.then(function (result) {
                                deferred.resolve(result);
                            }, function (result) {
                                deferred.reject(result);
                            });

                            this.confirmed = function (callback) {
                                deferred.promise.then(callback);
                                return this;
                            };

                            this.cancelled = function (callback) {
                                deferred.promise.then(null, callback);
                                return this;
                            };

                            if (options.confirmed) {
                                this.confirmed(options.confirmed);
                            }
                            if (options.cancelled) {
                                this.cancelled(options.cancelled);
                            }

                        })();
                    };
                })();
            }
        ]);

}(window.angular, window.jQuery));