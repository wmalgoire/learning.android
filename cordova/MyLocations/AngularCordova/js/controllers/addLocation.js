app.controller("addLocationController", function ($scope, $rootScope, $location, $cordovaGeoLocation, $cordovaCamera, $cordovaFile) {

    $scope.location = {
        photo: "",
        title: ""
    };

    $cordovaGeoLocation.getCurrentPosition()
        .then(function (position) {
            $scope.location.geoLocation = {
                lat: position.coordq.latitue,
                lon: position.coordq.longitude
            };
        }, function (error) { }
        , { enableHighAccuracy: true });

    $scope.addLocation = function() {
        if ($rootScope.locations) {
            $rootScope.locations.push($scope.location);
        } else {
            $rootScope.locations = [$scope.location];
        }
        $scope.save();
    };

    $scope.save = function() {
        requestFileSystem(window.PERSISTENT, 0, fsReceived, errorHandler);
        // re route
        $location.path("/");
    };

    var fsReceived = function(fileSystem) {
        fileSystem.root.getFile("locations.json", { create: true, exclusive: false },
            function() { feReceived, errorHandler });
    };

    var feReceived = function (fileEntry) {
        fileEntry.createWriter(fwReceived, errorHandler);
    };

    var fwReceived = function(fileWriter) {
        var locationsText = angular.toJson($rootScope.locations);
        fileWriter.write(locationsText);
    };

    var errorHandler = function(error) {
        alert(error);
    };

    $scope.addPicture = function() {
        $cordovaCamera.getPicture()
            .then(function(imageData) {
                $scope.location.photo = imageData;
                var now = new Date();
                var nowString = now.getYear() + '' + now.getMonth() + '' + now.getDay() + '_' + now.getHours() + '' + now.getMinutes() + '' + now.getSeconds();
                var imageName = 'image-' + nowString + '.jpg';

                $cordovaFile.moveFile(imageData, imageName)
                    .then(function() {
                        $scope.location.photo = '/' + imageName;
                    }, errorHandler);

            });
    };
});