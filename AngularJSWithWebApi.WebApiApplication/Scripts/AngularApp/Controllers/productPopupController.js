(function () {
    'use strict';

    angular
        .module('productApp')
        .controller('productPopupController', productPopupController);

    productPopupController.$inject = ['$rootScope', '$scope', 'productService', '$timeout', '$window'];

    function productPopupController($rootScope, $scope, productService, $timeout, $window) {
        $scope.title = 'productController';
        activate();
        function activate() {
            if (localStorage.getItem('CurrentUser') != null) {
                $("#currentUser").text("Welcome " + localStorage.getItem('CurrentUser') + "   ");
            }
            else {
                $window.location = 'http://localhost/AngularJSWithWebApi.WebApiApplication/User/UserLogin';
            }
        }

        $scope.productsData = null;
        $scope.editMode = false;
        $scope.addMode = false;
        $scope.showHideColumn = ['ProductName', 'Description', 'Price', 'Quantity'];
        $scope.Product = {
            ProductId: '',
            ProductName: '',
            Description: '',
            Price: '',
            Quantity: ''
        };
        $scope.productShowHide = {
            ProductName: false,
            Description: false,
            Price: false,
            Quantity: false
        };
        var oldProduct;

        //Sorting
        $scope.productSorting = [];
        //End Sorting

        //Start Toggle filter
        $scope.togglefilter = {};
        $scope.copyFitlerValue = { ProductName: '', Description: '', Price: '', Quantity: '' };
        $scope.filterOperartorList = [
           { text: 'Is equal to', value: 'eq' },
           { text: 'Is not equal to', value: 'neq' },
           { text: 'Starts with', value: 'startswith' },
           { text: 'Ends with', value: 'endswith' },
           { text: 'Contains', value: 'contain' },
           { text: 'Does not contain', value: 'dncontain' },
           { text: 'Is null', value: 'null' },
           { text: 'Is not null', value: 'nnull' }
        ];
        $scope.filterProduct = {};
        $scope.filterOperator = { ProductName: '', Description: '', Price: '', Quantity: '' };
        $scope.filterValue = { ProductName: '', Description: '', Price: '', Quantity: '' };
        $scope.toggleFilterData = ['ProductName', 'Description', 'Price', 'Quantity'];
        $scope.getToggleFilter = function () {
            return "toggleTemplate";
        };

        $scope.getToggleFilterData = function (data) {
            $scope.loadingImg = true;
            $scope.togglefilter[data] = false;
            $scope.copyFitlerValue[data] = $scope.filterValue[data];
            productService.GetAllRecords().success(function (datalist) {
                $scope.productsData = datalist.filter(function (e) {
                    var datavalue = [];
                    for (var i = 0; i < Object.keys($scope.copyFitlerValue).length; i++) {
                        var dt = $scope.toggleFilterData[i];
                        var cfvalue = $scope.copyFitlerValue[dt];
                        var fovalue = $scope.filterOperator[dt];
                        if (cfvalue != "" && fovalue != 'null' && fovalue != 'nnull') {
                            if ($scope.filterOperator[dt] == 'eq')
                                datavalue[i] = e[dt] == cfvalue;
                            else if (fovalue == 'neq')
                                datavalue[i] = e[dt] != cfvalue;
                            else if (fovalue == 'startswith')
                                datavalue[i] = e[dt].toString().toLowerCase().indexOf(cfvalue.toLowerCase()) == 0;
                            else if (fovalue == 'endswith')
                                datavalue[i] = e[dt].toString().toLowerCase().endsWith(cfvalue.toLowerCase());
                            else if (fovalue == 'contain')
                                datavalue[i] = e[dt].toString().toLowerCase().indexOf(cfvalue.toLowerCase()) > -1;
                            else if (fovalue == 'dncontain')
                                datavalue[i] = e[dt].toString().toLowerCase().indexOf(cfvalue.toLowerCase()) == -1;
                            else
                                datavalue[i] = true;
                        }
                        else
                            if (fovalue == 'null')
                                datavalue[i] = e[dt] == null || e[dt] == "";

                            else if (fovalue == 'nnull')
                                datavalue[i] = e[dt] != null || e[dt] != "";
                            else
                                datavalue[i] = true;
                    }
                    return datavalue.every(function (e) {
                        return e;
                    });
                });
                $scope.loadingImg = false;
            }).error(function () {
                $scope.loadingImg = false;
            });
        }
        $scope.clearToggleFilterData = function (data) {
            $scope.filterValue[data] = "";
            $scope.filterOperator[data] = 'eq';
            $scope.getToggleFilterData(data);
        }
        //End Toggle filter

        //Get Product list
        productService.GetAllRecords().success(function (data) {
            $scope.productsData = data;
            $scope.loadingImg = false;
        },
        function () {
            sweetAlert("Oops...", "Something went wrong!", "error");
            $scope.loadingImg = false;
        });

        //Add New Product
        $scope.save = function () {
            if ($scope.dataValidation(this.Product)) {
                productService.AddProduct($scope.Product).success(function(response) {
                    $scope.clear();
                    $scope.addMode = false;
                    $scope.editidData = response.ProductId;
                    $('#productModel').modal('hide');
                    $scope.editMode = false;
                    swal("Success!", "Product added successfully", "success");
                }, function errorCallback(response) {
                    swal("Error!", response.data.ExceptionMessage, "error");
                });
            }
            else 
                swal("Error!", "Please Enter All the Values !! ", "error");
        };

        // Edit product data
        $scope.edit = function (data) {
            $scope.Product = data;
            $scope.editMode = true;
            oldProduct = angular.copy($scope.Product);
            $("#productModel").modal('show');
        }

        // Update product data
        $scope.update = function () {
            if ($scope.dataValidation(this.Product)) {
                if (angular.equals(oldProduct, this.Product)) {
                    $scope.cancel(this.product);
                }
                else {
                    productService.UpdateProduct(this.Product).success(function (response) {
                        $scope.editMode = false;
                        $scope.editidData = response.ProductId;
                        $('#productModel').modal('hide');
                        swal("Success!", "Product updated successfully", "success");
                    }, function errorCallback(response) {
                        swal("Error!", response.data.ExceptionMessage, "error");
                    });
                }
            }
            else {
                swal("Error!", "Please Enter All the Values !! ", "error");
            }
        };

        // Delete product data
        $scope.delete = function () {
            var index = $scope.productsData.indexOf(this.product);
            productService.DeleteProduct($scope.Product.ProductId).success(function (data) {
                $scope.productsData.splice(index, 1);
                swal("Deleted!", "Product deleted successfully", "success");
            }, function errorCallback(response) {
                swal("Error!", response.data.ExceptionMessage, "error");
            });
        };

        // Reset product data
        $scope.clear = function () {
            $scope.Product.ProductId = '';
            $scope.Product.ProductName = '';
            $scope.Product.Description = '';
            $scope.Product.Price = '';
            $scope.Product.Quantity = '';
        }

        // Product detail
        $scope.detail = function (data) {
            $scope.Product = data;
            $("#productDetailModal").modal('show');
        }

        // Show popup when click on Add Product
        $scope.showadd = function () {
            $scope.Product = null;
            $scope.editMode = false;
            $scope.addMode = true;
            $scope.addProductForm.$setPristine();
            $scope.addProductForm.$setUntouched();
            $("#productModel").modal('show');
        };

        // Delete confirmation
        $scope.showconfirm = function (data) {
            $scope.Product = data;
            swal({
                title: "Are you sure?",
                text: "Are you sure to delete this record!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
            function () {
                $scope.delete();
            });
        };

        // Cancel button
        $scope.cancel = function (data) {
            var index = $scope.productsData.indexOf(data);
            if ($scope.editMode) {
                $scope.productsData[index] = oldProduct;
            }
            $scope.addProductForm.$setPristine();
            $scope.addProductForm.$setUntouched(); 
            $scope.Product = null;
            $scope.editMode = false;
            $scope.addMode = false;
            $scope.editidData = "";
            $(':input', '#addProductForm').val("");
            $("#productModel").modal('hide');
        };

        // Product sorting
        $scope.sortingList = function (columnName) {
            var index = $scope.productSorting.indexOf(columnName);
            var reverseIndex = $scope.productSorting.indexOf("-" + columnName);
            if (index == -1 && reverseIndex == -1) {
                $scope.productSorting.push(columnName);
            }
            else if (reverseIndex == -1) {
                $scope.productSorting[index] = "-" + columnName;
            }
            else 
                $scope.productSorting.splice(reverseIndex, 1);
        };

        //function show hide column
        $scope.funshowhideColumn = function (obj) {
            if ($('input[type="checkbox"].ng-not-empty').length < 3 && obj.cbProduct) {
                return true;
            }
            else {
                if (obj.cbProduct) {
                    obj.cbProduct = false;
                    swal("Warning!", "At least one column sholud be visible", "warning");
                }
                return false;
            }
        }

        // function data validation
        $scope.dataValidation = function (data) {
            if (data != null && data.ProductName != null && data.ProductName != "" && data.Price != null && data.Price != "" && data.Quantity != null && data.Quantity != "") {
                return true;
            }
            else {
                return false;
            }
        }
    };
})();
