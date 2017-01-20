var myApp = angular.module('myApp', []);

myApp.controller('registerController',['$scope', '$http', '$window',
  function($scope, $http, $window) {
  console.log('inside register controller');

  $scope.cancel = function(){
    $window.location.href = '/';
  }

  $scope.registerUser = function() {
    if( $scope.passwordIn !== $scope.repassIn)return alert('Passwords didn\'t match');

    var newUser = {
      email: $scope.emailIn,
      first_name: $scope.firstNameIn,
      last_name: $scope.lastNameIn,
      password: $scope.passwordIn
    };

    $http({
      method: 'POST',
      url: '/register',
      data: newUser
    }).then(function successCallback(response) {
      console.log('success', response);
      goToHome(newUser);
    }, function errorCallback(error) {
      console.log('error occurred!');
    });

  };// end register()

  var goToHome = function( userInfo ){

    var userInfo = {
      username: userInfo.email ,
      password: userInfo.password
    };

    $http({
      method: 'POST',
      url: '/',
      data: userInfo
    }).then(function successCallback(response) {
      console.log(response);
      $window.location.href = '/home';
    }, function errorCallback(error) {
      console.log('error', error);

      // $window.location.href = '/';
    });

  }; // end goToHome()

  var checkInput = function(name, password, checkPassword){
    console.log('in checkInput', name, password, checkPassword );
    if ( !name || !password || !checkPassword)return false;
    if ( password !== checkPassword )return false;

    return true;
  };// end checkInput()

}]);
