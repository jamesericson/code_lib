
myApp.factory('libFactory', function(){
  var myFactory = {};
  myFactory.library = [];

  myFactory.getTechCat = function(){
    console.log('parsing out tech | from: ', this.library);

    return ['this', 'that'];
  };// end getTechCat()

  return myFactory;
}); // end shelf Factory
