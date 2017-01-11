(function () {
    'use strict';

    angular
        .module('productApp')
        .controller('userController', userController);

    userController.$inject = ['$scope', 'userService', '$timeout', '$location', '$window'];

    function userController($scope, userService, $timeout, $location, $window) {
        $scope.title = 'userController';
        activate();

        function activate() {
            if (localStorage.getItem('CurrentUser') != null && $window.location.pathname == "/AngularJSWithWebApi.WebApiApplication/User/UserLogin") {
                $window.location = 'http://localhost/AngularJSWithWebApi.WebApiApplication/Product/ProductInline';
            }
            else if (localStorage.getItem('CurrentUser') == null && $window.location.pathname != "/AngularJSWithWebApi.WebApiApplication/User/UserLogin" ) {
                $window.location = 'http://localhost/AngularJSWithWebApi.WebApiApplication/User/UserLogin';
            }
            else {
                $("#currentUser").text("Welcome " + localStorage.getItem('CurrentUser') + "   ");
            }
        }

        $scope.userModel = {UserId:'',Name:'',EmailId:'',MobileNo:'', IsAdmin:'', CreatedDate:'', UpdatedDate:'', Password:'', ConfirmPassword:''}
        $scope.usersData = [];

        userService.getUserList().success(function (data) {
            $scope.usersData = data;
        });

        $scope.saveUser = function (userModel) {
            userService.AddUser(userModel).success(function (data) {
                $scope.userModel = data;
                $scope.userModel.ConfirmPassword = data.Password;
                swal("Success!", "User added successfully", "success");
            }).error(function (data) {
                swal("Error!", data.ExceptionMessage, "error");
            });
        }

        $scope.cancelUser = function () {
            $scope.userModel = "";
        }

        //Login
        $scope.userLogin = function (userModel) {
            if(userModel.Password !=null && userModel.EmailId !=null){
                userService.CheckLoginUser(userModel).success(function (data) {
                    if (data.Error) {
                        swal("Error!", data.Message, "error");
                    }
                    else {
                        localStorage.setItem('CurrentUser', data.CurrentUser);
                        $window.location = 'http://localhost/AngularJSWithWebApi.WebApiApplication/Product/ProductInline';
                    }
                });
            }
        }
        //End Login
    }
})();
