(function (angular, $, undefined) {

    angular.module('crm')
        .controller('CustomersController', [
            '$scope', '$log', '$customerService', '$location', function ($scope, $log, $customerService, $location) {
                $scope.onDataBind = function (page, size, filter, sort) {
                    $log.debug('bind', page, size, filter, sort);
                    return $customerService.list(page, size, filter, sort);
                };

                $scope.onDataBound = function (data, total, page) {
                    $log.debug('bound', data, total, page);
                };

                $scope.onRowSelected = function (data, row) {
                    $log.debug('select', data, row);
                };

                $scope.onDetailClicked = function (selectedRow) {
                    $log.debug('detail', selectedRow);
                    $location.path('/detail/' + selectedRow.id);
                };

                $scope.onRowDoubleClick = function (data, row) {
                    $log.debug('doubleClick', data, row);

                    $scope.onDetailClicked(data);
                };
            }
        ])
        .controller('CustomerController', [
            '$scope', '$log', '$customerService', '$routeParams', '$route', '$dialogs', function ($scope, $log, $customerService, $routeParams, $route, $dialogs) {

                var mode = $route.current.mode;
                var customerId = $routeParams.id;

                if (mode === 'detail') {
                    $customerService.detail(customerId)
                        .success(function (response) {
                            if (response.success) {
                                $scope.customer = response.data;
                                if ($scope.customer.numberOfOrders > 0) {
                                    $dialogs.warning('Customer has one or more unresolved orders.')
                                        .closed(function (result) {
                                            $log.debug('Warning dialog closed.', result);
                                        });
                                }
                            } else {
                                $dialogs.alert(response.message);
                            }
                        });
                }
            }
        ]);

}(window.angular, window.jQuery));