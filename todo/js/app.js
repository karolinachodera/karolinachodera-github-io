var app = angular.module("TODO_list", ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "views/startList.html"
		})
		
		.when("/list", {
			templateUrl: "views/list.html",
			controller: "todoItemsCtrl"
		})
		
		.when("/addItem", {
			templateUrl: "views/addItem.html",
			controller: "todoItemsCtrl"
		})	
				
		.otherwise({
			templateUrl: "/"
		})
		
});

app.service("todo_list", function() {
	var todoList = {};
	
	todoList.items = [
	]
	
	todoList.save = function(newItem) {
		todoList.items.push(newItem);
	};
	
	todoList.remove = function(entry) {
		var  index = todoList.items.indexOf(entry);
		todoList.items.splice(index, 1);
	};
	
	todoList.complete = function(entry) {
		entry.completed = !entry.completed;
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
	
	$scope.listItem = {completed: false, name: "", date: new Date()};
	
	$scope.save = function() {
		todo_list.save($scope.listItem);
		$location.path("/list");
	};
	
	$scope.remove = function(entry) {
		todo_list.remove(entry);
	};
	
	$scope.complete = function(entry) {
		todo_list.complete(entry);
	};
	
});