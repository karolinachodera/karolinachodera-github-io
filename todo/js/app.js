var app = angular.module("TODO_list", ["listCtrlModule", "ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider 
		.when("/", {
			templateUrl: "views/secondPage.html",
			controller: "listCtrl"
		})
});