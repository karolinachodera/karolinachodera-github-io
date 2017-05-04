var app = angular.module("TODO_list", ["startListCtrl", "ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider 
		.when("/", {
			templateUrl: "views/secondPage.html",
			controller: "listCtrl"
		})
		.when("/nextPage", {
			templateUrl: "view/nextPage.html",
			controller: "listCtrl"
		})
});