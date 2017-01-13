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
                        localStorage.setItem('FirstTimeLogin', false);
                    }
                    else {
                        localStorage.setItem('CurrentUser', data.CurrentUser);
                        localStorage.setItem('FirstTimeLogin', true);
                        $window.location = 'http://localhost/AngularJSWithWebApi.WebApiApplication/Product/ProductInline';
                        swal({
                            title: "Welcome <span style='color:#008000'>" + localStorage.getItem('CurrentUser') + "!</span>",
                            text: "<span style='color:#F8BB86'>Product Management System<span>",
                            html: true,
                            timer: 1000,
                            showConfirmButton: false
                        });
                    }
                });
            }
        }
        //End Login
    }
})();
