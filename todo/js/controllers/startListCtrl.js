var app = angular.module("startListCtrl", [])

app.controller("startList", function($scope) {
	$scope.list = {};
	$scope.list.name = "";
	$scope.list.title = "";
})
