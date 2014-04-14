(function (cr, angular, $, undefined) {

    angular.module('crm')
        .factory('$customerService', [
            '$http', function ($http) {
                var service = {
                    list: function (page, size, filter, sort) {
                        return $http.post('/customers/', { page: page, size: size, filter: filter, sort: sort });
                    },
                    detail: function (id) {
                        return $http.get('/customer/detail/' + id);
                    },
                    edit: function (id) {
                        return $http.get('/customer/edit/' + id);
                    },
                    update: function (model) {
                        return $http.post('/customer/edit/' + id, model);
                    }
                };

                return service;
            }
        ]);

}(window.cr = window.cr || {}, window.angular, window.jQuery));