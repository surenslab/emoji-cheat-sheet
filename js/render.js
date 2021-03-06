// render.js
function renderEmoji() {
  $.getJSON("data/emoji-v13.json", function (json) {
    var bodyTemplate = document.getElementById('body-template').innerHTML;

    //look for unique categories
    var catLookup = {};
    var catList = [];
    for (var item, i = 0; item = json.emojis[i++];) {
      var category = item.category;
      if (!(category in catLookup)) {
        catLookup[category] = 1;
        catList.push(category);
      }
    }

    //Return an array of emojis sorted into categories
    var returnedData = [];
    for (i = 0; i < catList.length; i++) {
      var categoryData = $.grep(json.emojis, function (element, index) {
        return element.category == catList[i];
      });
      returnedData.push(categoryData)
    }


    //Render the data into the page
    for (i = 0; i < returnedData.length; i++) {
      var rendered = Mustache.render(bodyTemplate, returnedData[i]);
      var titleID = catList[i].replace(/\s+/g, "-").toLowerCase();
      document.getElementById('target').innerHTML += "<h2 id=\""+ titleID  + "\" class=\"my-4\">" + catList[i] + "</h2>";
      document.getElementById('target').innerHTML += rendered;
    }
  });
}