
myApp.factory('libFactory', function(){
  var myFactory = {};
  myFactory.library = [];
  myFactory.allCodeEntries = [];
  // maybe this below
  // myFactory.currentTechIndex = 0;
  // myFactory.currentSubIndex = 0;


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

  myFactory.createCodeArray = function(){
    console.log('in createCodeArray | lib: ', this.library);
    for (var i = 0; i < this.library.length; i++) {
      var subCategory = this.library[i].subCategory;
      // console.log('sub: ', subCategory);
      for (var ii = 0; ii < subCategory.length; ii++) {
        var entries = subCategory[ii].entries;
        // console.log('code ', entries);
        for (var iii = 0; iii < entries.length; iii++) {
          var codeName = entries[iii];
          this.allCodeEntries.push(codeName);
        } // end nested nested for <-- gross, indeed!
      } // end nested for
    } // end for
    return this.allCodeEntries;
  };// end createCodeArray()


  return myFactory;
}); // end shelf Factory
