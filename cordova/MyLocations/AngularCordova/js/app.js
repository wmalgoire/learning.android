var app = angular.module("angularCordova", ["ngRoute", "ngCordova"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "partials/allLocations.html",
            controller: "allLocationsController"
        })
        .when("/addLocation", {
            templateUrl: "partials/addLocation.html",
            controller: "addLocationController"
        })
         .when("/location/:id", {
             templateUrl: "partials/oneLocation.html",
             controller: "oneLocationController"
         })
        .otherwise({ redirectTo: "/" });
});