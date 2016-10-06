(function() {
    'use strict';

    angular
        .module('productApp')
        .directive('outsideClick', outsideClick);

    outsideClick.$inject = ['$window'];
    
    function outsideClick($window) {
        var directive = {
            link:{post:post},
            restrict: 'A'
        };
        return directive;

        function post(scope, element, attrs) {
         var onClick = function (event) {
                var isChild = $(element).has(event.target).length > 0;
                var isSelf = element[0] == event.target;
                var isInside = isChild || isSelf;
                if (!isInside) {
                    scope.$apply(attrs.outsideClick);
                }
            }
            $(document).click(onClick);
        }
    }

})();