const getById = (id) => document.getElementById(id);
localStorage = window.localStorage;

function isOnline() {
	return window.navigator.onLine;
}

const imageButton = getById("upload-image-button");
const imageDiv = getById("news-image");
const titleArea = getById("news-title");
const textArea = getById("news-text");

function addImage() {
	var fr = new FileReader();

	fr.onload = function(e) { imageDiv.src = this.result; };

	imageButton.addEventListener("change", function() {
		fr.readAsDataURL(imageButton.files[0]);
	});
}


function addNews() {
	if (titleArea.value.replace(/\s/g, '').length == 0) {
		titleArea.classList.add("error-textarea");
		titleArea.value = '';
		titleArea.placeholder = "Please, add news title";
		return;
	} else {
		titleArea.classList.remove("error-textarea");
	}

	if (textArea.value.replace(/\s/g, '').length == 0) {
		textArea.classList.add("error-textarea");
		textArea.placeholder = "Please, add news text";
		return;
	} else {
		textArea.classList.remove("error-textarea");
	}
	
	var news = [
        titleArea.value, textArea.value
    ];

    storeMessage(news);

	alert("News was successfully added!");
}


function storeMessage(elem) {
    if (isOnline()) {
        storeMessageRemotely(elem);
    } else {
        storeMessageLocaly(elem);
    }
}

function storeMessageLocaly(elem) {
    addToLocalStorage(elem, "news")
    clearUI();
    logEvent('Message saved locally: ' + elem[0]);
}

//TODO: Implement after learning Node.js
function storeMessageRemotely(elem) {
    clearUI();
    console.log('Message sent to server:');
}

function clearUI() {
    titleArea.value = '';
	textArea.value = '';
}


addImage();