(function () {
    'use strict';

    angular
        .module('productApp')
        .controller('userController', userController);

    userController.$inject = ['$scope', 'userService'];

    function userController($scope, userService) {
        $scope.title = 'userController';
        activate();

        function activate() { }
        $scope.userModel = {UserId:'',Name:'',EmailId:'',MobileNo:'', IsAdmin:'', CreatedDate:'', UpdatedDate:'', Password:''}
        $scope.usersData = [];

        userService.getUserList().success(function (data) {
            $scope.usersData = data;
        });

    }
})();
