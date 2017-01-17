var myApp = angular.module('myApp', []);

myApp.factory('exfactory', function(){
  var myFactory = {};
  myFactory.items = [];
  return myFactory;
}); // end shelf Factory

myApp.controller('loginController',['$scope', '$http', '$window',
  function($scope, $http, $window) {
  console.log('inside log in controller');

  $scope.login = function(){
    var userInfo = {
      username: $scope.username,
      password: $scope.password
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
      $window.location.href = '/';
    });
  };
}]);// end loginController()

myApp.controller('registerController',['$scope', '$http', '$window',
  function($scope, $http, $window) {
  console.log('inside register controller');

  $scope.cancel = function(){
    $window.location.href = '/';
  }

  $scope.register = function() {
    var userInfo = {
      username: $scope.username,
      password: $scope.password
    };

    if( checkInput(userInfo.username, userInfo.password, $scope.rePassword) ){
      console.log('headed to post');
      $http({
        method: 'POST',
        url: '/register',
        data: userInfo
      }).then(function successCallback(response) {
        console.log('success', response);
        goToHome(userInfo);
      }, function errorCallback(error) {
        console.log('error occurred!');
      });
    } else {
      alert("you didn't do that right! Idiot!");
    }
  };// end register()

  var goToHome = function( userInfo ){
    $http({
      method: 'POST',
      url: '/',
      data: userInfo
    }).then(function successCallback(response) {
      console.log(response);
      $window.location.href = '/home';
    }, function errorCallback(error) {
      console.log('error', error);
      $window.location.href = '/';
    });
  }; // end goToHome()

  var checkInput = function(name, password, checkPassword){
    console.log('in checkInput', name, password, checkPassword );
    if ( !name || !password || !checkPassword)return false;
    if ( password !== checkPassword )return false;

    return true;
  };// end checkInput()

}]);

myApp.controller('homeController',['$scope', '$http', '$window',
  function($scope, $http, $window) {
  console.log('inside home controller');

}]);// end mainController()
