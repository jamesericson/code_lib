var myApp = angular.module('myApp', []);

myApp.controller('homeController',['$scope', 'libFactory', '$http', '$window',
  function($scope, libFactory, $http, $window) {
  console.log('inside home controller');

  $scope.techCategory = [];
  $scope.subCategory = [];

  $scope.showCodeEntry = function(){
    console.log('hi!!');
  };// end showCodeEntry()

  $scope.addCodeEntry = function(){
    console.log('in addCodeEntry');

    var newEntry = {
      techCategory: $scope.selectedTech._id,
      subCategory: $scope.selectedSub._id,
      name: $scope.codeNameIn,
      syntax: $scope.syntaxIn,
      gitHub: $scope.gitHubIn,
      resourceOne: $scope.resourceOneIn,
      resourceTwo: $scope.resourceTwoIn,
      resourceThree: $scope.resourceThreeIn,
      notes: $scope.notesIn
    };

    $http({
      method: 'POST',
      url: '/codeEntry',
      data: newEntry
    }).then( function(response){
      console.log('back from the server, with:', response);
      $scope.getUserLib(function () {
        console.log('after a getUserLib');
        $scope.codeList = libFactory.getCodeList($scope.selectedTech.index, $scope.selectedSub.index);
      });
      //TODO clear some stuff
    }); // end http

  };// end addCodeEntry()

  $scope.showCodeOpt = function(subIndex){
    console.log('in showCodeOpt');
    $scope.selectedSub = $scope.selectedTech.subCategory[subIndex];
    $scope.selectedSub.index = subIndex;
    $scope.codeList = libFactory.getCodeList($scope.selectedTech.index, subIndex);
  }; // end showCodeOpt()

  $scope.showSubCat = function(techIndex){
    console.log('in showSubCat | with: ', techIndex);
    $scope.selectedTech = libFactory.library[techIndex];
    $scope.selectedTech.index = techIndex;
    $scope.subCategory = libFactory.getSubCat(techIndex);
  };// end showSubCat()

  $scope.addSubCat = function(){
    console.log('in addSubCat' );
    // var index = $scope.selectedTech.index;
    // var techId = libFactory.library[index]._id;
    var toSend = {
      techId: $scope.selectedTech._id,
      sub: $scope.subIn
    };
    // console.log('toSend: ', toSend);
    $http({
      method: 'POST',
      url: '/subCategory',
      data: toSend
    }).then(function successCallback(response) {
      console.log('success', response);
      $scope.getUserLib(function(){
        $scope.subCategory = libFactory.getSubCat($scope.selectedTech.index);
      });
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

  $scope.getUserLib = function(callback){
    console.log('in getUseLib');

    $http({
      method: 'GET',
      url: '/library'
    }).then(function successCallback(response) {
      console.log('success', response);
      libFactory.library = response.data.libTechnology;
      $scope.techCategory = libFactory.getTechCat();
      callback();
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
