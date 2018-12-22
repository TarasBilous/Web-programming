const getById = id => document.getElementById(id);

// global constants
const localStorage = window.localStorage;
const requestTextarea = getById("request-text");
const requestContainer = getById("request-container");


const isOnline = () => {
    return window.navigator.onLine;
}

const requestTemplate = (text, date, time, nickname) => ` 
    <div class="request">
        <p>${text}</p>
        <div class="req-footer">
            <div class="date">${date}, ${time}</div>
            <div class="nickname">${nickname}</div>
        </div>
    </div>
`

const reportNetworkStatus = () => {
    if (isOnline()) {//if navigator.online == true
        console.log("Network status: ONLINE");
    } else {
        console.log("Network status: offline");
    }
}

function sendRequest() {
  var username = "Anonym";

    if (requestTextarea.value.replace(/\s/g, '').length == 0) {
        requestTextarea.classList.add("error-textarea");
        requestTextarea.value = '';
        requestTextarea.placeholder = "Please, add description";
        return;
    } else {
        requestTextarea.classList.remove("error-textarea");
    }
    
    var date = new Date();
    var request = [
        requestTextarea.value, date.toLocaleDateString(), date.toLocaleTimeString(), username
    ];

    storeMessage(request);
}


function storeMessage(elem) {
    if (isOnline()) {
        storeMessageRemotely(elem);
    } else {
        storeMessageLocaly(elem);
    }
}

function storeMessageLocaly(elem) {
    addToLocalStorage(elem, "request")
    clearUI();
    logEvent('Message saved locally: ' + elem[0]);
}

//TODO: Implement after learning Node.js
function storeMessageRemotely(elem) {
    clearUI();
    console.log('Message sent to server:');    
}


function displayFromLocalStorage() {
    var requests = [];
    getAllItems((resultArray) => {
        requests = resultArray;
    }, "request")

    for (var i = 0; i < requests.length; i++) {
        displayrequest(requests[i]);
    }
    deleteAllItems("request");
}

function displayrequest(request) {
    $('#request-container').prepend(
        requestTemplate(request[0], request[1], request[2], request[3])
    );
}

function clearUI() {
    requestTextarea.value = "";
}


 if (window.applicationCache) {
    window.addEventListener('online', function (e) {
        reportNetworkStatus();
        displayFromLocalStorage();
    }, true);

    window.addEventListener('offline', function (e) {
        reportNetworkStatus();
    }, true);

    displayFromLocalStorage();
}