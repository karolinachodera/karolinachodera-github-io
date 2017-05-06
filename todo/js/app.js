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
			controller: "todoItemsCtrl"
		})	
		
		.otherwise({
			templateUrl: "error.html"
		})
		
});

app.service("todo_list", function() {
	var todoList = {};
	
	todoList.items = [
		{id: 1, complated: true, name: "Shopping", date: "2017-05-05"},
		{id: 2,complated: true, name: "Programming", date: "2017-05-03"},
		{id: 3,complated: true, name: "Eating", date: "2017-05-04"}
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
	$scope.listItem = {id: 4, completed: true, name: "zadanie", date: new Date()}
	$scope.save = function() {
		todo_list.save($scope.listItem);
		$location.path("/list");
	}
});