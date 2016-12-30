(function () {
    'use strict';

    angular
        .module('productApp')
        .controller('productInlineController', productInlineController);

    productInlineController.$inject = ['$rootScope', '$scope', 'productService', '$timeout', '$window'];

    function productInlineController($rootScope, $scope, productService, $timeout, $window) {
        $scope.title = 'productDataController';
        activate();

        function activate() {
            if (localStorage.getItem('CurrentUser') != null) {
                $("#currentUser").text("Welcome " + localStorage.getItem('CurrentUser')+"   ");
            }
            else {
                $window.location = 'http://localhost/AngularJSWithWebApi.WebApiApplication/User/UserLogin';
            }
        }

        $scope.productsData = [];
        $scope.product = null;
        $scope.additemIndex = 0;
        $scope.showHideColumn = ['ProductName', 'Description', 'Price', 'Quantity'];
        $scope.editMode = true;
        var oldProduct = "";
        $scope.editData = false;
        $scope.productShowHide = {
            ProductName: false,
            Description: false,
            Price: false,
            Quantity: false
        };
        var copyProduct = "";
        $scope.addMode = false;
        $scope.copyProductId;

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
                            if (fovalue == 'eq')
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
        $scope.getTemplate = function (data) {
            if ($scope.product == null) return 'display';
            else if (data.ProductId == "" && !$scope.editMode) return 'edit';
            else if (data.ProductId == $scope.product.ProductId && $scope.editData && $scope.editMode) return 'edit';
            else return 'display';
        }

        productService.GetAllRecords().success(function (data) {
            $scope.productsData = data;
            $scope.loadingImg = false;
        }, function () {
            $scope.displayMessage("error", "Error occurs!");
            $scope.loadingImg = false;
        });

        $scope.add = function () {
            if ($scope.dataValidation(this.product)) {
                productService.AddProduct(this.product).success(function (data) {
                    $scope.editidData = data.ProductId;
                    $scope.addMode = false;
                    $scope.product.ProductId = data.ProductId;
                    $scope.displayMessage("success", "Product added successfully");
                }).error(function (data) {
                    $scope.displayMessage("error", "Error : " + data.ExceptionMessage);
                });
            }
            else {
                $scope.displayMessage("error", "Please Enter All the Values !! ");
            }
        };

        $scope.edit = function (data) {
            if ($scope.addMode) {
                var addProductData = $scope.productsData.find(function (data) {
                    return data.ProductId == "";
                })
                $scope.productsData.splice($scope.productsData.indexOf(addProductData), 1);
                $scope.addMode = false;
            }
            $scope.clearCopyData("Add");
            $scope.product = data;
            oldProduct = angular.copy($scope.product);
            $scope.editMode = true;
            $scope.editData = true;
        };

        $scope.update = function () {
            if ($scope.dataValidation(this.product)) {
                if (angular.equals(oldProduct, this.product)) {
                    $scope.cancel(this.product);
                }
                else {
                    productService.UpdateProduct(this.product).success(function (data) {
                        $scope.editidData = data.ProductId;
                        $scope.editData = false;
                        $scope.displayMessage("success", "Product updated successfully");
                    }).error(function (data) {
                        $scope.displayMessage("error", "Error : " + data.ExceptionMessage);
                    });
                }
            }
            else {
                $scope.displayMessage("error", "Please Enter All the Values !! ");
            }
        };

        $scope.detail = function () {
            $scope.product = this.product;
            $scope.editData = false;
            $("#productDetailModal").modal('show');
        };

        $scope.delete = function () {
            var index = $scope.productsData.indexOf(this.product);
            productService.DeleteProduct(this.product.ProductId).success(function (data) {
                $scope.productsData.splice(index, 1);
                $('#confirmModal').modal('hide');
                $scope.displayMessage("success", "Product deleted successfully");
            }).error(function (data) {
                $scope.displayMessage("error", "Error : " + data.ExceptionMessage);
                $('#confirmModal').modal('hide');
            });
        };

        $scope.showadd = function () {
            if ($scope.copy) {
                $scope.product = copyProduct;
                $scope.productsData.splice($scope.additemIndex, 0, copyProduct);
            }
            else {
                $scope.product = {
                    ProductId: "",
                    ProductName: "",
                    Description: "",
                    Price: "",
                    Quantity: ""
                };
                $scope.productsData.splice($scope.additemIndex, 0, $scope.product);
            }
            $scope.editMode = false;
            $scope.editData = true;
            $scope.addMode = true;
            $scope.clearCopyData("Add");
            $('.product-container').scrollTop(0);
        };

        $scope.showconfirm = function (data) {
            $scope.product = data;
            $scope.editData = false;
            $("#confirmModal").modal('show');
        };

        $scope.cancel = function (data) {
            var index = $scope.productsData.indexOf(data);
            if (data.ProductId == "") {
                $scope.productsData.splice(index, 1);
            }
            else {
                $scope.productsData[index] = oldProduct;
                $scope.editMode = false;
            }
            $scope.editidData = "";
            $scope.addMode = false
            $scope.product = null;
            $scope.editData = false;
        };

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

        $scope.sortingList = function (columnName) {
            var index = $scope.productSorting.indexOf(columnName);
            var reverseIndex = $scope.productSorting.indexOf("-" + columnName);
            if (index == -1 && reverseIndex == -1) {
                $scope.productSorting.push(columnName);
            }
            else if (reverseIndex == -1) {
                $scope.productSorting[index] = "-" + columnName;
            }
            else {
                $scope.productSorting.splice(reverseIndex, 1);
            }
            $scope.clearCopyData("Add");
        };

        $scope.dataValidation = function (data) {
            if (data != null && data.ProductName != null && data.ProductName != "" && data.Price != null && data.Price != "" && data.Quantity != null && data.Quantity != "") {
                return true;
            }
            else {
                return false;
            }
        }

        $scope.funshowhideColumn = function (obj) {
            if ($($('ul.dropdown-menu').find('input[type="checkbox"].ng-not-empty')).length < 3 && obj.cbProduct) {
                return true;
            }
            else {
                if (obj.cbProduct) {
                    obj.cbProduct = false;
                    $scope.displayMessage("warning", "At least one column sholud be visible");
                }
                return false;
            }
        }

        $scope.fundataItemCheck = function (obj, data) {
            if (obj.dataItemCheck) {
                copyProduct = angular.copy(data);
                $scope.copyProductId = data.ProductId;
                copyProduct.ProductId = "";
                $scope.copy = true;
                $("#btnAddRecord").attr("title", "Copy Product");
                $("#btnAddRecord").attr("value", "Copy Product");
            }
            else {
                $scope.clearCopyData("Add");
            }
        }

        $scope.clearCopyData = function (data) {
            $scope.copy = false;
            $scope.copyProductId = "";
            copyProduct = "";
            $("#btnAddRecord").attr("title", data + " Product");
            $("#btnAddRecord").attr("value", data + " Product");
        }
    }
})();
