(function() {
    'use strict';

    angular
        .module('productApp')
        .directive('autoComplete', autoComplete);

    autoComplete.$inject = ['$window'];
    
    function autoComplete($window) {
        var directive = {
            link:{post:post},
            restrict: 'A'
        };
        return directive;

        function post(scope, element, attr) {
            $(element).autocomplete({
                    source: function (request, response) {
                        var autoComplete = [];
                        if (scope.productsData != null) {
                            for (var i = 0; i < scope.productsData.length; i++) {
                                if (autoComplete.length < 10 && scope.productsData[i][attr.id].toString().toLowerCase().indexOf(request.term.toLowerCase()) > -1 && scope.filteredData.indexOf(scope.productsData[i]) > -1 && autoComplete.indexOf(scope.productsData[i][attr.id].toString()) == -1) {
                                    autoComplete.push(scope.productsData[i][attr.id].toString());
                                }
                            }
                        }
                        response(autoComplete);
                    },
                    minLength: 1,
                    select: function (event, selectedItem) {
                        scope.$apply(function () {
                            scope.filterProduct[attr.id] = selectedItem.item.value;
                        });
                    }
                });
            }
    }

})();