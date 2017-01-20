var myApp = angular.module('myApp', []);

myApp.controller('homeController',['$scope', 'libFactory', '$http', '$window',
  function($scope, libFactory, $http, $window) {
  console.log('inside home controller');

  $scope.techCategory = [];

  $scope.getUserInfo = function(){
    console.log('in getUserInfo');

    $http({
      method: 'GET',
      url: '/users'
    }).then(function successCallback(response) {
      console.log('success', response);
      $scope.firstName = response.data.first_name;
      $scope.lastName = response.data.last_name;
      libFactory.library = response.data.libTechnology;
      $scope.techCategory = libFactory.getTechCat();
    }, function errorCallback(error) {
      console.log('error occurred!');
    }); // end http get
  };// end getUserInfo()

  $scope.getUserLib = function(){
    console.log('in getUseLib');

    $http({
      method: 'GET',
      url: '/library'
    }).then(function successCallback(response) {
      console.log('success', response);

    }, function errorCallback(error) {
      console.log('error occurred!');
    }); // end http get
  }; // end getUserLib

  $scope.init = function(){
    $scope.getUserInfo();
  };// end init()

}]);// end mainController()

myApp.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
}); // end filter capitalize
