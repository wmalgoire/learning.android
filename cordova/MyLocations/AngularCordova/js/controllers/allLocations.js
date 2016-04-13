app.controller("allLocationsController", function ($scope, $rootScope, $cordovaFile) {

    if (!$rootScope.locations) {
        $cordovaFile.readFile("locations.json")
            .then(function (result) {
                if (typeof result == "string") {
                    $rootScope.locations = JSON.parse(result);
                }
                else {
                    $rootScope.locations = result;
                }

            }, function (error) { });

    }

});