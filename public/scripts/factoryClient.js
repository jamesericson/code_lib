
myApp.factory('libFactory', function(){
  var myFactory = {};
  myFactory.library = [];

  myFactory.getTechCat = function(){
    console.log('parsing out tech | from: ', this.library);
    var techList = [];
    for (var i = 0; i < this.library.length; i++) {
      techList.push(this.library[i].name);
    }; // end for
    return techList;
  };// end getTechCat()

  return myFactory;
}); // end shelf Factory
