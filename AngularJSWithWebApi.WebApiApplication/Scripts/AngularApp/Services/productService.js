(function () {
    'use strict';

    angular
        .module('productApp')
        .factory('productService', productService);

    productService.$inject = ['$http'];

    function productService($http) {
        var baseUrl = 'http://localhost/AngularJSWithWebApi.WebApiApplication/api/ProductWebApi/';
        var service = {
            GetAllRecords: GetAllRecords,
            GetProduct: GetProduct,
            AddProduct: AddProduct,
            UpdateProduct: UpdateProduct,
            DeleteProduct: DeleteProduct,
            GetCurrentUser: GetCurrentUser
        };
        return service;

        function GetCurrentUser() {
            return $http.get("http://localhost/AngularJSWithWebApi.WebApiApplication/Product/GetCurrentUser");
        }

       function GetAllRecords() {
            return $http.get(baseUrl +'GetProductsList');
        }
       function GetProduct(productId) {
           return $http.get(baseUrl +'GetProductById/' + productId);
        }
       function AddProduct(productModel) {
           return $http.post(baseUrl +'AddProduct', productModel);
        }
       function UpdateProduct(productModel) {
           return $http.post(baseUrl +'UpdateProduct', productModel);
        }
       function DeleteProduct(productId) {
           return $http.delete(baseUrl +'DeleteProduct/' + productId);
        }
    }
})();