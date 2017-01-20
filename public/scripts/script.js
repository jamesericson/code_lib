var myApp = angular.module('myApp', []);

myApp.factory('exfactory', function(){
  var myFactory = {};
  myFactory.items = [];
  return myFactory;
}); // end shelf Factory


myApp.controller('homeController',['$scope', '$http', '$window',
  function($scope, $http, $window) {
  console.log('inside home controller');

}]);// end mainController()
