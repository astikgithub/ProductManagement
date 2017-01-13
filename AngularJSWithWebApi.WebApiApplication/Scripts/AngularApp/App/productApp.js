(function () {
    'use strict';
    var app = angular.module('productApp', ['angularUtils.directives.dirPagination', 'ngRoute']);
  app.config(function ($routeProvider) {
        $routeProvider
            .when('/ProductInline', {
                templateUrl: 'Views/ProductInline',
                controller: 'productInlineController'
            })

            .when('/Product', {
                templateUrl: 'Views/Product',
                controller: 'productPopupController'
            })

            .when('/UserList', {
                templateUrl: 'Views/UserList',
                controller:'userController'
            })
    });
  app.constant('BaseApiUrl', 'http://localhost/AngularJSWithWebApi.WebApiApplication/api/');
})();