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
                $scope.displayMessage("success", "User added successfully");
            }).error(function (data) {
                $scope.displayMessage("error", data.ExceptionMessage);
            });
        }

        $scope.cancelUser = function () {
            $scope.userModel = "";
        }

        $scope.displayMessage = function (type, message) {
            $scope.successMessage = message;
            if (type == "error") {
                $scope.error = true;
                $timeout(function () {
                    $scope.error = false;
                }, 3000)
            }
            else if (type == "warning") {
                $scope.warning = true;
                $timeout(function () {
                    $scope.warning = false;
                }, 3000)
            }
            else {
                $scope.success = true;
                $timeout(function () {
                    $scope.success = false;
                }, 3000)
            }
        };

        //Login
        $scope.userLogin = function (userModel) {
            if(userModel.Password !=null && userModel.EmailId !=null){
                userService.CheckLoginUser(userModel).success(function (data) {
                    if (data.Error) {
                        $scope.displayMessage('error', data.Message);
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
