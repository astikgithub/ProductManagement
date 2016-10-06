(function () {
    'use strict';

    angular
        .module('productApp')
        .factory('userService', userService);

    userService.$inject = ['$http'];

    function userService($http) {
        var baseUrl = 'http://localhost/AngularJSWithWebApi.WebApiApplication/api/UserWebApi/';
        var service = {
            getUserList: getUserList,
            getUserById: getUserById,
            AddUser: AddUser,
            UpdateUser: UpdateUser,
            DeleteUser : DeleteUser
        };

        return service;

        function getUserList() {
            return $http.get(baseUrl + "GetUserList");
        }
        function getUserById() {
            return $http.get(baseUrl + "GetUserById");
        }
        function AddUser() {
            return $http.post(baseUrl + "AddUser");
        }
        function UpdateUser() {
            return $http.post(baseUrl + "UpdateUser");
        }
        function DeleteUser() {
            return $http.delete(baseUrl + "DeleteUser");
        }
    }
})();