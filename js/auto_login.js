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

var firstMatrixCoordinate = $('tbody > tr:nth-child(6) > th').text();
var secondMatrixCoordinate = $('tbody > tr:nth-child(7) > th').text();
var thirdMatrixCoordinate = $('tbody > tr:nth-child(8) > th').text();

var firstMatrixCode = getMatrixKey(firstMatrixCoordinate);
var secondMatrixCode = getMatrixKey(secondMatrixCoordinate);
var thirdMatrixCode = getMatrixKey(thirdMatrixCoordinate);

chrome.storage.sync.get("matrix", function (value) {
  value = value["matrix"];
  if (value[firstMatrixCode] && value[secondMatrixCode] && value[thirdMatrixCode]) {
    $('tbody > tr:nth-child(6) > td > div > div > input').val(value[firstMatrixCode]);
    $('tbody > tr:nth-child(7) > td > div > div > input').val(value[secondMatrixCode]);
    $('tbody > tr:nth-child(8) > td > div > div > input').val(value[thirdMatrixCode]);
    $('form[name=login]').submit();
  }
});

function getMatrixKey(text) {
  var alpha = text.charAt(1).toLowerCase();
  var num = text.charAt(3);
  var key = alpha + num;
  return key;
}
