const getById = id => document.getElementById(id);

// global constants
const localStorage = window.localStorage;
const feedbackTextarea = getById("feedback-text");
const feedbackContainer = getById("feedback-container");
const useLocalStorage = true;

const isOnline = () => window.navigator.onLine;

const feedbackTemplate = (feedback) => {
  var name = feedback.[1];
  var text = feedback.[2];
  var date = feedback.[3];
  var time = feedback.[4];

  return `
  <div class="request">
  <p>${text}</p>
  <div class="req-footer">
  <div class="date">${date}, ${time}</div>
  <div class="nickname">${nickname}</div>
  </div>
  </div>
  `

class Feedback {
  constructor(name, text, date, time){
    this.name = name;
    this.text = text;
    this.date = date;
    this.time = time;
  }
}

const reportNetworkStatus = () => {
  if (isOnline()) {//if navigator.online == true
    console.log("Network status: ONLINE");
  } else {
    console.log("Network status: offline");
  }
}


function sendFeedback() {
  var username = "Anonym";

  if (feedbackTextarea.value.replace(/\s/g, '').length == 0) {
    feedbackTextarea.classList.add("error-textarea");
    feedbackTextarea.value = '';
    feedbackTextarea.placeholder = "Please, add description";
    return;
  } else {
    feedbackTextarea.classList.remove("error-textarea");
  }

  var date = new Date();
  var feedback = [feedbackTextarea.value, date.toLocaleDateString(), date.toLocaleTimeString(), username]

  storeMessage(feedback);
}


function storeMessage(elem) {
  if (isOnline()) {
    storeMessageRemotely(elem);
  } else {
    storeMessageLocaly(elem);
  }
}

function storeMessageLocaly(elem) {
  clearUI();
  if (useLocalStorage) {
    addToLocalStorage(elem, "feedback")
    console.log('Message saved locally: ' + elem[0]);
  } else {
    var openDB = indexedDB.open("feedback_data", 1);

    openDB.onerror = function(event) {
      alert("Error occurred when loading feedbacks");
    };

    openDB.onupgradeneeded = function() {
        var db = openDB.result;
        var store = db.createObjectStore("news", {keyPath: "title"});
        store.createIndex("name", "name", { unique: false });
        store.createIndex("text", "text", { unique: false });
        store.createIndex("date", "date", { unique: false });
        store.createIndex("time", "time", { unique: false });
    };

    openDB.onsuccess = function(event) {
      var db = openDB.result;
      var tx = db.transaction(["fe"], "readwrite");
      var store = tx.objectStore("feedbacks");
      store.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;

        if (cursor) {
          var tempFeed = new Feedback(cursor.value.name, cursor.value.text, cursor.value.date, cursor.value.time);
          $('#container').prepend(feedbackTemplate(tempFeed));
          cursor.continue();
        }
      };
  };
}

//TODO: Implement after learning Node.js
function storeMessageRemotely(elem) {
  clearUI();
  console.log('Message sent to server:');
}


function displayFromLocalStorage() {
  var feedbacks = [];
  getAllItems((resultArray) => {
    feedbacks = resultArray;
  }, "feedback")

  for (var i = 0; i < feedbacks.length; i++) {
    displayFeedback(feedbacks[i]);
  }
  deleteAllItems("feedback");
}

function displayFeedback(feedback) {
  $('#feedback-container').prepend(
    feedbackTemplate(feedback)
  );
}

function clearUI() {
  feedbackTextarea.value = "";
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