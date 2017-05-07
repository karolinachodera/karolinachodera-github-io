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