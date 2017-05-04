angular.module("listCtrlModule", [])

.controller("ListCtrl", function($scope) {
	$scope.listObject = {};
	$scope.listObject.title = "TODO List";
	$scope.listObject.exampleNumber = 4;
})