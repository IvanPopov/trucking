/// <reference path="../Scripts/angular-1.1.4.js" />

/*#######################################################################
  
  Dan Wahlin
  http://twitter.com/DanWahlin
  http://weblogs.asp.net/dwahlin
  http://pluralsight.com/training/Authors/Details/dan-wahlin

  Normally like to break AngularJS apps into the following folder structure
  at a minimum:

  /app
      /controllers      
      /directives
      /services
      /partials
      /views

  #######################################################################*/

var app = angular.module('customersApp', []);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        .when('/CreateOrder',
            {
                controller: 'CreateOrder',
                templateUrl: '/app/partials/createOrder.html'
            })
        .when('/login',
            {
                controller: 'CreateOrder',
                templateUrl: '/app/partials/loginForm.html'
            })
        .otherwise({ redirectTo: '/login' });
});




