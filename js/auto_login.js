var button = $('<button/>',
{
  text: 'Register Matrix Codes'
}).wrap('<tr><td style="text-align: center;"></td></tr>').closest('tr');

$("tbody").first().before(button);

button.click(openRegisterMatrixPage);

function openRegisterMatrixPage() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('../register_matrix.html'));
  }
}

var firstMatrixCoordinate = $('tbody > tr:nth-last-child(5) > th').text();
var secondMatrixCoordinate = $('tbody > tr:nth-last-child(4) > th').text();
var thirdMatrixCoordinate = $('tbody > tr:nth-last-child(3) > th').text();

var firstMatrixCode = getMatrixKey(firstMatrixCoordinate);
var secondMatrixCode = getMatrixKey(secondMatrixCoordinate);
var thirdMatrixCode = getMatrixKey(thirdMatrixCoordinate);

chrome.storage.sync.get("matrix", function (value) {
  value = value["matrix"];
  if (value[firstMatrixCode] && value[secondMatrixCode] && value[thirdMatrixCode]) {
    $('tbody > tr:nth-last-child(5) > td > input').val(value[firstMatrixCode]);
    $('tbody > tr:nth-last-child(4) > td > input').val(value[secondMatrixCode]);
    $('tbody > tr:nth-last-child(3) > td > input').val(value[thirdMatrixCode]);
    $('form[name=login]').submit();
  }
});

function getMatrixKey(text) {
  var alpha = text.charAt(1).toLowerCase();
  var num = text.charAt(3);
  var key = alpha + num;
  return key;
}
