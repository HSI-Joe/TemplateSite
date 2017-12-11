var display = angular.module('displayApp', []);
var man = "NSS"

var dataController = function mainController($scope, $http) {
  $scope.formData = {};

  // Load from data base ====================================
  $http({
    method: 'GET',
    url: '/api/parts',
    headers: { 'Content-Type': 'application/json' },
    params: { part_man: man }
  }).then(function (result) {
    var data = result.data;
    $scope.parts = data;
  }, function (error) {
    console.log("Error: " + error);
  });

  // Load manufacturer parts
  $http({
    method: 'GET',
    url: '/api/manufacturers'
  }).then(function (result) {
    var data = result.data;
    $scope.types = data;
  }, function (error) {
    console.log("Error: " + error);
  });

  // Load strings ===========================================
  $http({
    method: 'GET',
    url: '/api/strings'
  }).then(function (result) {
    var data = result.data;
    $scope.name = data.name;
  }, function (error) {
    console.log("Error: " + error);
  });

  // create new object
  $scope.createPart = function() {
    $http.post('/api/todos', $scope.formData)
      .success(function(data) {
        $scope.formData = {}; //Clear form for user
        $scope.parts = data;
        console.log(data);
      })
      .error(function(data) {
        console.log("Error: " + data);
      })
  }

}

var stringController = function mainController($scope, $http) {
  $scope.formData = {};
}

display.controller('dataController', dataController)
