(function (angular, $, undefined) {
    'use strict';

    angular.module('crm.grids', [])
        .directive('gridWrapper', [
            '$parse', '$timeout', function ($parse, $timeout) {
                return {
                    restrict: 'C',
                    scope: true,
                    controller: function ($scope, $element, $attrs) {

                        var curtainTimeout;
                        var reload = function (page, size, filter) {

                            $timeout.cancel(curtainTimeout);
                            curtainTimeout = $timeout(function () {
                                $grid.$curtain = true;
                            }, 250);

                            $grid.$selectedRow = $grid.$selectedRowIndex = null;

                            $scope.bind($scope.$parent, { page: page, size: size, filter: filter, sort: $grid.getOrder() })
                                .success(function (response) {
                                    $timeout.cancel(curtainTimeout);
                                    $grid.$curtain = false;

                                    if (!response.error) {
                                        $scope.bound($scope.$parent, { data: response.rows, total: response.total, page: response.page });

                                        $grid.$data = response.rows;
                                        $grid.$total = response.total;
                                        $grid.$page = response.page;
                                    } else {
                                        $scope.error($scope.$parent, { error: response.error });
                                    }
                                });
                        };

                        var $grid = $scope.$grid = {
                            $page: 1,
                            $size: 10,
                            $total: 0,
                            $data: [],
                            $filter: '',
                            $selectedRow: null,
                            $selectedRowIndex: null,
                            $curtain: false,
                            $orderScopes: [],
                            selectPage: function (page) {
                                reload(page, $grid.$size, $grid.$filter);
                            },
                            search: function () {
                                reload($grid.$page, $grid.$size, $grid.$filter);
                            },
                            getOrder: function () {
                                var result = [];
                                angular.forEach($grid.$orderScopes, function (value) {
                                    if (value.order) {
                                        result.push({ member: value.member, order: value.order });
                                    }
                                });

                                return result;
                            }
                        };

                        $scope.lazy = $attrs.lazy === 'true';

                        this.reload = function () {
                            $grid.search();
                        };

                        this.clearOrders = function () {
                            if ($scope.singleSort) {
                                angular.forEach($grid.$orderScopes, function (value) {
                                    value.order = '';
                                });
                            }
                        };

                        this.registerOrder = function ($orderScope) {
                            $grid.$orderScopes.push($orderScope);
                        };
                    },
                    link: function ($scope, $element, $attrs, $controller) {
                        if (!$scope.lazy) {
                            $controller.reload();
                        }
                    }
                };
            }
        ])
        .directive('grid', [
            '$parse', function ($parse) {
                return {
                    restrict: 'C',
                    require: '^gridWrapper',
                    link: function ($scope, $element, $attrs) {
                        var $grid = $scope.$grid;

                        $scope.bind = $attrs.bind ? $parse($attrs.bind) : angular.noop;
                        $scope.bound = $attrs.bound ? $parse($attrs.bound) : angular.noop;
                        $scope.error = $attrs.error ? $parse($attrs.error) : angular.noop;
                        $scope.select = $attrs.select ? $parse($attrs.select) : angular.noop;
                        $scope.doubleClick = $attrs.doubleClick ? $parse($attrs.doubleClick) : angular.noop;
                        $scope.singleSort = $attrs.singleSort === 'true';

                        $scope.onClick = function ($index, $event) {
                            var row = $grid.$data[$index];
                            $grid.$selectedRow = row;
                            $grid.$selectedRowIndex = $index;

                            $scope.select($scope.$parent, { data: row, row: $($event.target).closest('tr') });
                        };

                        $scope.onDoubleClick = function ($index, $event) {
                            var row = $grid.$data[$index];
                            $grid.$selectedRow = row;
                            $grid.$selectedRowIndex = $index;

                            $scope.doubleClick($scope.$parent, { data: row, row: $($event.target).closest('tr') });
                        };
                    }
                };
            }
        ])
        .directive('gridOrder', function () {
            return {
                restrict: 'A',
                transclude: true,
                template: '<a data-ng-click="toggleOrder()"><span data-ng-transclude=""></span>{{orderString()}}</a>',
                require: '^gridWrapper',
                scope: {},
                link: function ($scope, $element, $attrs, $controller) {
                    $scope.member = $attrs.gridOrder;
                    $scope.order = '',
                        $scope.toggleOrder = function () {
                            if ($scope.order === '') {
                                $controller.clearOrders();
                                $scope.order = 'asc';
                            } else if ($scope.order === 'asc') {
                                $scope.order = 'desc';
                            } else {
                                $scope.order = '';
                            }

                            $controller.reload();
                        };

                    $scope.orderString = function () {
                        if (!$scope.order) {
                            return '';
                        }

                        return ' (' + $scope.order + ')';
                    };

                    $controller.registerOrder($scope);
                }
            };
        });

}(window.angular, window.jQuery));