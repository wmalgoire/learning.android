﻿
app.controller('addMomentController', function ($scope, $rootScope, $location, $cordovaGeolocation) {

    $scope.moment = {
        image: 'images/place.PNG',
        title: ''
    };

    $cordovaGeolocation.getCurrentPosition()
        .then(function (position) {

            $scope.moment.geolocation = { "lat": position.coords.latitude, "lon": position.coords.longitude };

        }, function (error) { },
        { enableHighAccuracy: true }
        );

    $scope.addMoment = function () {

        if ($rootScope.moments) {
            $rootScope.moments.push($scope.moment);
        }
        else {
            $rootScope.moments = [$scope.moment];
        }
        $scope.save();

    };

    $scope.save = function () {

        requestFileSystem(window.PERSISTENT, 0, fsReceived, errorHandler);
        $location.path('/');

    };

    var fsReceived = function (fileSystem) {
        fileSystem.root.getFile('moments.json', { create: true, exclusive: false }, feReceived, errorHandler);
    };

    var feReceived = function (fileEntry) {
        fileEntry.createWriter(fwReceived, errorHandler);
    };

    var fwReceived = function (fileWriter) {
        var momentsText = angular.toJson($scope.moments);
        fileWriter.write(momentsText);
    };

    var errorHandler = function (error) {

    };

});