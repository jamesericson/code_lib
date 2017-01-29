var myApp = angular.module('myApp', []);

myApp.controller('loginController',['$scope', '$http', '$window',
  function($scope, $http, $window) {
  console.log('inside log in controller');

  $scope.login = function(){
    var userInfo = {
      username: $scope.emailIn,
      password: $scope.password
    };

    console.log('inside login | with: ', userInfo);
    $http({
      method: 'POST',
      url: '/',
      data: userInfo
    }).then(function successCallback(response) {
      console.log(response);
      $window.location.href = '/home';
    }, function errorCallback(error) {
      console.log('error', error);
      if (error.data === 'Unauthorized')alert('Incorrect username or password.');
    });
  };
}]);// end loginController()
