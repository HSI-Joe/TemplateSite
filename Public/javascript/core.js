// Angular =====================================================================
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

}

var stringController = function mainController($scope, $http) {
  $scope.formData = {};
}

display.controller('dataController', dataController)

// jQuerey =====================================================================

// Import external files
$.get("/navigation.html", function(data) {
  $("#nav-placeholder").replaceWith(data);
})
$.get("/warning.html", function(data) {
  $("#warning-placeholder").replaceWith(data);
})
$.get("/footer.html", function(data) {
  $("#footer-placeholder").replaceWith(data);
})

// onClick functions ===========================================================
function displayWarning() {
  alert("Attention users:\nWe are currently migrating databases for the operation/part manuals. Manuals may be offline until the migration is complete.")
}
