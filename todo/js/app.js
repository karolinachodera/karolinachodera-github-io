var app = angular.module("TODO_list", ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider

		.when("/", {
			templateUrl: "views/startList.html",
			controller: "startList"
		})
		
		.when("/list", {
			templateUrl: "list.html",
			controller: "startList"
		})
		
		.when("/addItem", {
			templateUrl: "addItem.html",
			controller: ["startList", "todo_items"]
		})	
		
		.otherwise({
			redirectTo: "/"
		})
		
});

app.controller("startList", function($scope) {
	$scope.list = {};
	$scope.list.name = "";
	$scope.list.title = "";
});

app.controller("todo_items", function($scope) {
	$scope.listItems = [
		{complated: true, name: "Shopping", date: "2017-05-05"},
		{complated: true, name: "Programming", date: "2017-05-03"},
		{complated: true, name: "Eating", date: "2017-05-04"}
	]
});