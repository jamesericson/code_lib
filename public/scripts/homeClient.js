var myApp = angular.module('myApp', []);

myApp.controller('homeController',['$scope', '$http', '$window',
  function($scope, $http, $window) {
  console.log('inside home controller');

  $scope.getUserInfo = function(){
    console.log('in getUserInfo');

    $http({
      method: 'GET',
      url: '/users'
    }).then(function successCallback(response) {
      console.log('success', response);
      $scope.firstName = response.data.first_name;
      $scope.lastName = response.data.last_name;
    }, function errorCallback(error) {
      console.log('error occurred!');
    }); // end http get
  };// end getUserInfo()


  $scope.init = function(){
    $scope.getUserInfo();
    $scope.getUserLib();
  };// end init()

}]);// end mainController()

myApp.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
}); // end filter capitalize
