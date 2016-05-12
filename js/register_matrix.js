$(function() {
  $('.submit-matrix').click(saveMatrix);
  function saveMatrix() {
    var matrix = {};
    var matrixDOM = $('.matrix');
    var num = matrixDOM.length;
    for(var i = 0; i < num; i++) {
      var name = matrixDOM[i].name;
      var val = matrixDOM[i].value;
      matrix[name] = val;
    }
    chrome.storage.sync.set(matrix, function() {
      console.log(matrix);
      window.close();
    });
  }
});
