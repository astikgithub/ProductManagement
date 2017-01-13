(function () {
    'use strict';

    angular
        .module('productApp')
        .factory('userService', userService);

    userService.$inject = ['$http', 'BaseApiUrl'];

    function userService($http, BaseApiUrl) {
        var baseUrl = BaseApiUrl+'/UserWebApi/';
        var service = {
            getUserList: getUserList,
            getUserById: getUserById,
            AddUser: AddUser,
            UpdateUser: UpdateUser,
            DeleteUser: DeleteUser,
            CheckLoginUser:CheckLoginUser
        };

        return service;

        function getUserList() {
            return $http.get(baseUrl + "GetUserList");
        }
        function getUserById(id) {
            return $http.get(baseUrl + "GetUserById/"+ id);
        }
        function AddUser(userModel) {
            return $http.post(baseUrl + "AddUser", userModel);
        }
        function UpdateUser(userModel) {
            return $http.post(baseUrl + "UpdateUser", userModel);
        }
        function DeleteUser(id) {
            return $http.delete(baseUrl + "DeleteUser/"+id);
        }
        function CheckLoginUser(userModel) {
            return $http.post(baseUrl + "CheckUserLogin", userModel);
        }
    }
})();