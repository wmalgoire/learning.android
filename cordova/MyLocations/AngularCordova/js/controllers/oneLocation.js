app.controller("oneLocationController", function ($scope, $rootScope, $location, $routeParams) {

    $scope.location = $rootScope.locations[$routeParams.id];

    $scope.getMap = function () {

    };

    if ($scope.location.geoLocation) {
        $scope.getMap();
    }

});