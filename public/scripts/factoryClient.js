
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

  myFactory.getSubCat = function(techIndex){
    console.log('parsing out Subcategories | from: ', this.library);
    var subCategories = this.library[techIndex].subCategory;
    var subList = [];
    for (var i = 0; i < subCategories.length; i++) {
      subList.push(subCategories[i].name);
    }; // end for
    return subList;
  };// end getSubCat()

  myFactory.getCodeList = function(techIndex, subIndex){
    var entries = this.library[techIndex].subCategory[subIndex].entries;
    console.log('in getCodeList | entries:', entries);
    var codeList = [];
    for (var i = 0; i < entries.length; i++) {
      codeList.push(entries[i].name);
    }// end for
    console.log(codeList);
    return codeList;
  };//  end getCodeList()

  return myFactory;
}); // end shelf Factory
