$(function() {

  var matrixDOM = $('.matrix');
  matrixDOM.autotab({ maxlength: 1 });

  $('.submit-matrix').click(saveMatrix);
  function saveMatrix() {
    var matrix = {"matrix": {}};
    var num = matrixDOM.length;
    for(var i = 0; i < num; i++) {
      var name = matrixDOM[i].name;
      var val = matrixDOM[i].value;
      matrix["matrix"][name] = val;
    }
    chrome.storage.sync.set(matrix, function() {
      console.log(matrix);
    });
  }

  $('.reset-matrix').click(resetMatrix);
  function resetMatrix() {
    var r = window.confirm("Are you sure you want to completely remove all Matrix Codes");
    if(r == true){
      chrome.storage.sync.clear();
    }
  }

  $('.close-matrix').click(closeMatrix);
  function closeMatrix() {
    window.close();
  }

  setMatrixCode();

  function setMatrixCode() {
    chrome.storage.sync.get("matrix", function(value) {
      value = value["matrix"];
      var keys = Object.keys(value);
      var length = keys.length;
      for(var i = 0; i < length; i++) {
        $('input[name=' + keys[i] + ']').val(value[keys[i]]);
      }
    });
  }
});
