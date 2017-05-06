var app = angular.module("TODO_list", ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "startList.html",
			controller: "startList"
		})
		
		.when("/list", {
			templateUrl: "list.html",
			controller: "todoItemsCtrl"
		})
		
		.when("/addItem", {
			templateUrl: "addItem.html",
			controller: "startList"
		})	
		
		.otherwise({
			templateUrl: "error.html"
		})
		
});

app.service("todo_list", function() {
	var todoList = {};
	
	todoList.items = [
		{complated: true, name: "Shopping", date: "2017-05-05"},
		{complated: true, name: "Programming", date: "2017-05-03"},
		{complated: true, name: "Eating", date: "2017-05-04"}
	]
	
	return todoList;
})

app.controller("startList", function($scope) {
	$scope.list = {};
	$scope.list.name = "";
	$scope.list.title = "";
});

app.controller("todoItemsCtrl", function($scope, "todo_list") {
	$scope.listItems = todo_list.items;
});