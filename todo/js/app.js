var app = angular.module("TODO_list", ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "startList.html"
		})
		
		.when("/list", {
			templateUrl: "list.html",
			controller: "todoItemsCtrl"
		})
		
		.when("/addItem", {
			templateUrl: "addItem.html",
			controller: "todoItemsCtrl"
		})	
		
		.when("/addItem/edit:date/", {
			templateUrl: "edit.html"
		})
		
		.otherwise({
			templateUrl: "error.html"
		})
		
});

app.service("todo_list", function() {
	var todoList = {};
	
	todoList.items = [
	]
	
	
	todoList.save = function(newItem) {
		todoList.items.push(newItem);
	};
	
	return todoList;
})

app.controller("startList", function($scope) {
	$scope.list = {};
	$scope.list.name = "";
	$scope.list.title = "";
});

app.controller("todoItemsCtrl", function($scope, todo_list, $location) {
	$scope.listItems = todo_list.items;
	$scope.listItem = {completed: true, name: "", date: new Date()}
	$scope.save = function() {
		todo_list.save($scope.listItem);
		$location.path("/list");
	}
});