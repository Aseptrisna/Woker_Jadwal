var glob = require("glob");
var fs = require("fs");

var _inArray = function(needle, haystack) {
  for(var k in haystack) {
    if(haystack[k] === needle) {
      return true;
    }
  }
  return false;
}

glob("file/*.json", function(err, files) { // read the folder or folders if you want: example json/**/*.json
  if(err) {
    console.log("cannot read the folder, something goes wrong with glob", err);
  }
  var matters = [];
  files.forEach(function(file) {
    fs.readFile(file, 'utf8', function (err, data) { // Read each file
      if(err) {
        console.log("cannot read the file, something goes wrong with the file", err);
      }
      var obj = JSON.parse(data);
      obj.action.forEach(function(crud) {
        for(var k in crud) {
          if(_inArray(crud[k].providedAction, matters)) {
            // do your magic HERE
            console.log("duplicate founded!");
            // you want to return here and cut the flow, there is no point in keep reading files.
            break;
          }
          matters.push(crud[k].providedAction);
        }
      })
    });
  });
});