var myApp = angular.module('myApp', ['ngAnimate']);

myApp.controller('homeController',['$scope', 'libFactory', '$http', '$window',
  function($scope, libFactory, $http, $window) {
  console.log('inside home controller');



  $scope.toggleShow = function(){
    return true;
  }

  $scope.showCodeEntry = function(codeIndex){
    console.log('in showCodeEntry | with index: ', codeIndex);
    $scope.hideCodeEntry = false;
    $scope.codeEntry = libFactory.library[$scope.selectedTech.index].subCategory[$scope.selectedSub.index].entries[codeIndex];
    console.log('code: ', $scope.codeEntry);
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
      $scope.codeNameIn = '';
      $scope.syntaxIn = '';
      $scope.gitHubIn = '';
      $scope.resourceOneIn = '';
      $scope.resourceTwoIn = '';
      $scope.resourceThreeIn = '';
      $scope.notesIn = '';
    }); // end http

  };// end addCodeEntry()

  $scope.showCodeOpt = function(subIndex){
    console.log('in showCodeOpt');
    $scope.hideCodeEntry = true;
    $scope.hideCodeOpt = false;
    $scope.selectedSub = $scope.selectedTech.subCategory[subIndex];
    $scope.selectedSub.index = subIndex;
    $scope.codeList = libFactory.getCodeList($scope.selectedTech.index, subIndex);
  }; // end showCodeOpt()

  $scope.showSubCat = function(techIndex){
    console.log('in showSubCat | with: ', techIndex);
    setInterval(function(){ $scope.initHideCode = false; }, 35);
    $scope.hideCodeEntry = true;
    $scope.hideSubCat = false;
    $scope.hideCodeOpt = true;
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
    $scope.initHideCode = true;
    $scope.hideCodeEntry = true;
    $scope.hideSubCat = true;
    $scope.hideCodeOpt = true;
    $scope.getUserInfo();
  };// end init()

}]);// end mainController()

myApp.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
}); // end filter capitalize

myApp.filter('onlyProjectName', function() {
    return function(input) {
      if (!input)return;
      var slashCounter = 0;
      for (var i = 0; i < input.length; i++){
        if ( input[i]=='/' ){
          slashCounter ++;
          if (slashCounter == 4)var beginning = i + 1 ;
          if (slashCounter == 5)var end = i;
        } // end if
      } // end for

      return input.slice(beginning, end);
    };
}); // end filter onlyProjectName

myApp.filter('onlyWebSiteName', function() {
    return function(input) {
      if (!input)return;
      var slashCounter = 0;
      for (var i = 0; i < input.length; i++){
        if ( input[i]=='/' ){
          slashCounter ++;
          if (slashCounter == 2)var beginning = i + 1 ;
          if (slashCounter == 3)var end = i;
        } // end if
      } // end for

      return input.slice(beginning, end);
    };
}); // end filter onlyProjectName

//
// //Since removed from HTML
// slide-toggle="#sub-categories"
// class="slidable"
// //from http://jsfiddle.net/3sVz8/19/
// myApp.directive('slideable', function () {
//     return {
//         restrict:'C',
//         compile: function (element, attr) {
//             // wrap tag
//             var contents = element.html();
//             element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');
//
//             return function postLink(scope, element, attrs) {
//                 element.css({
//                     'border': 'none',
//                     'overflow': 'hidden',
//                     'width': '0px',
//                     'transitionProperty': 'width',
//                     'transitionDuration': '.3s' ,
//                     'transitionTimingFunction': 'ease-in-out'
//                 });
//             };
//         }
//     };
// })
// myApp.directive('slideToggle', function() {
//     return {
//         restrict: 'A',
//         link: function(scope, element, attrs) {
//             var target = document.querySelector(attrs.slideToggle);
//             attrs.expanded = false;
//             element.bind('click', function() {
//                 var content = target.querySelector('.slideable_content');
//                 if(!attrs.expanded) {
//                     content.style.borderRight = '2px solid #4e4e4e';
//                     target.style.width = '10rem';
//                 } else {
//                     content.style.borderRight = 'none';
//                     target.style.width = '0px';
//                 }
//                 attrs.expanded = !attrs.expanded;
//             });
//         }
//     }
// });
