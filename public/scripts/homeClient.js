var myApp = angular.module('myApp', []);

myApp.controller('homeController',['$scope', 'libFactory', '$http', '$window',
  function($scope, libFactory, $http, $window) {
  console.log('inside home controller');

  $scope.techCategory = [];
  $scope.subCategory = [];

  $scope.showSubCat = function(techIndex){
    console.log('in showSubCat | with: ', techIndex );
    // var techId = libFactory.library[techIndex]._id;
    $scope.subCategory = libFactory.getSubCat(techIndex);
  };// end showSubCat()

  $scope.addSubCat = function(){
    console.log('in addSubCat' );
    var index = $scope.subTechIn;
    var techId = libFactory.library[index]._id;
    var toSend = {
      techId: techId,
      sub: $scope.subIn
    };
    // console.log('toSend: ', toSend);
    $http({
      method: 'POST',
      url: '/subCategory',
      data: toSend
    }).then(function successCallback(response) {
      console.log('success', response);
      $scope.getUserLib();
      $scope.subIn = '';
    }, function errorCallback(error) {
      console.log('error occurred!');
    }); // end http post

  };// end addSubCat()



  $scope.getUserInfo = function(){
    console.log('in getUserInfo');

    $http({
      method: 'GET',
      url: '/users'
    }).then(function successCallback(response) {
      console.log('success', response);
      $scope.firstName = response.data.first_name;
      $scope.lastName = response.data.last_name;
      console.log('check this out: ', response.data.libTechnology);
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
      libFactory.library = response.data.libTechnology;
      $scope.techCategory = libFactory.getTechCat();
    }, function errorCallback(error) {
      console.log('error occurred!');
    }); // end http get
  }; // end getUserLib

  $scope.addTechCat = function(){
    console.log(' in addTechCat');

    $http({
      method: 'POST',
      url: '/techCategory',
      data: { tech: $scope.techIn }
    }).then(function successCallback(response) {
      console.log('success', response);
      $scope.getUserLib();
      $scope.techIn = '';
    }, function errorCallback(error) {
      console.log('error occurred!');
    }); // end http post
  };// end addTechCat()

  $scope.init = function(){
    $scope.getUserInfo();
  };// end init()

}]);// end mainController()

myApp.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
}); // end filter capitalize
