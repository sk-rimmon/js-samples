(function (angular, $, undefined) {

    angular.module('crm')
        .config([
            '$routeProvider', function ($routeProvider) {
                $routeProvider
                    .when('/new', {
                        templateUrl: '/customer/new/',
                        controller: 'CustomerController',
                        title: 'New customer',
                        mode: 'new'
                    })
                    .when('/detail/:id', {
                        templateUrl: '/customer/detail/',
                        controller: 'CustomerController',
                        title: 'Customer\'s detail',
                        mode: 'detail'
                    })
                    .when('/list', {
                        templateUrl: '/customers/',
                        controller: 'CustomersController',
                        title: 'Customers'
                    })
                    .otherwise({
                        redirectTo: '/list'
                    });
            }
        ]);

}(window.angular, window.jQuery));