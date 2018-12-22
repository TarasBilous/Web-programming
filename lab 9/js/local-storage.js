// Local storage
function addToLocalStorage(arrayValue, stringTag) {
    var count = parseInt(localStorage.getItem(stringTag + '-size')) || 0;
    localStorage.setItem(stringTag+ '-item-' + (count + 1), arrayValue.toString());
    localStorage.setItem(stringTag + '-size', count + 1);
}

function getAllItems(callback, stringTag) {
    var arr = [];
    for (var i = 0; i < parseInt(localStorage.getItem(stringTag+ '-size')); i++) {
        var key = stringTag+ '-item-' + (i + 1);
        var item = localStorage[key].split(',');
        arr.push(item);
    }
    callback(arr);
}

function deleteAllItems(stringTag) {
    var count = parseInt(localStorage.getItem(stringTag+ '-size')) || 0;
    for (var i = 1; i <= count; i++) {
        localStorage.removeItem(stringTag + '-item-' + i)
    }
    localStorage.removeItem(stringTag + '-size');
}
