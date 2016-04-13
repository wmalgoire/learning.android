
var app = angular.module('myMoments', ['ngRoute', 'ngCordova']);

app.config(function ($routeProvider, $compileProvider) {

    $compileProvider.imgSrcSanitizationWhitelist('/');

    $routeProvider
        .when('/', {
            templateUrl: 'partials/allMoments.html',
            controller: 'allMomentsController'
        })
        .when('/addmoment', {
            templateUrl: 'partials/addMoment.html',
            controller: 'addMomentController'
        })
        .otherwise({ redirectTo: '/' });

});