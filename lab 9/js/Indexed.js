var path = window.location.pathname;
var page = path.split("/").pop();
var useLocalStorage = false;
var db = null
var productsStore = null;
var requestDB = self.indexedDB.open('LAB_DB', 4);
 //localStorage-------------------------------------------------------------------------------------------
function addItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
 function getAllItems(callback) {
    var arr = [];
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var item = JSON.parse(localStorage[key]);
        arr.push(item);
    }
    callback(arr);
}
 function deleteItem(key) {
    localStorage.removeItem(key);
}
//---------------------------------------------------------------------------------------------------------------
 //IndexedDB----------------------------------------------------------------------------------------------------------------------------
 useIndexedDB(requestDB);
 function useIndexedDB(requestDB){
     requestDB.onsuccess = function (event) {
        // get database from event
        while(db == null) {
            db = event.target.result;
            if(isOnline()){getSavedData();}
        }
    };
     requestDB.onerror = function (event) {
        console.log('[onerror]', requestDB.error);
    };
     requestDB.onupgradeneeded = function (event) {
        var db = event.target.result;
         db.createObjectStore('news', { keyPath: 'id'});
        db.createObjectStore('appeal', { keyPath: 'id'});
    };
 }
 function addNewsData(data) {
    let transaction = null;
    try {
        transaction = db.transaction('news', 'readwrite');
    } catch (e) {
        productsStore = db.createObjectStore('news', { keyPath: 'id'});
        transaction = db.transaction('news', 'readwrite');
    }
     transaction.onsuccess = function (event) {
        console.log('[Transaction] ALL DONE!');
    };
     productsStore = transaction.objectStore('news');
     productsStore.add(data).onsuccess = function (event) {
        console.log("ADDED");
    }
}
 function getNewsData(callback) {
     let transaction = db.transaction('news', 'readwrite');
    let data = [];
     transaction.onsuccess = function (event) {
        console.log('[Transaction] ALL DONE!');
    };
     productsStore = transaction.objectStore('news');
    request = productsStore.getAll();
     request.onsuccess = function (event) {
        data = event.target.result;
        callback(data);
    };
     request.onerror = function(event) {
        console.log("error when get news data")
    };
}
 function addAppealData(data, callback) {
    let transaction = null;
    try {
        transaction = db.transaction('appeal', 'readwrite');
    } catch (e) {
        productsStore = db.createObjectStore('appeal', { keyPath: 'id'});
        transaction = db.transaction('appeal', 'readwrite');
    }
     transaction.onsuccess = function (event) {
        console.log('[Transaction] ALL DONE!');
    };
     productsStore = transaction.objectStore('appeal');
     productsStore.add(data).onsuccess = function (event) {
        console.log("ADDED");
        callback()
    }
}
 function getAppealData(callback) {
     let transaction = db.transaction('appeal', 'readwrite');
    let data = [];
     transaction.onsuccess = function (event) {
        console.log('[Transaction] ALL DONE!');
    };
     productsStore = transaction.objectStore('appeal');
    request = productsStore.getAll();
     request.onsuccess = function (event) {
        data = event.target.result;
        for (item in data) {
            item = JSON.parse(item)
        }
        callback(data);
    };
     request.onerror = function(event) {
        console.log("error when get appeal data")
    };
}
 //---------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------
//returns true if online, false if offline
function isOnline() {
    return window.navigator.onLine;
}
 function reportNetworkStatus() {
	if(page == "fans.html" || page == "admin.html") {
		if (isOnline()) {//if navigator.online == true
            console.log("REPORT NETWORK STATUS: online");
    	} else {
            console.log("REPORT NETWORK STATUS: offline");
    	}
	}
}
 function sendNews(title, article) {
    //create object to store article information
    var box = new News('news', title, article, new Date().getTime().toString());
     storeMessage(box);
     return false;
};
 function sendAppeal(appeal) {
	var box = new Appeal('appeal', appeal, new Date().getTime().toString());
	storeMessage(box);
 	return false;
};

 // store article localy ore remotely
function storeMessage(box) {
    if (isOnline) {
        // send article to server
        storeMessageLocaly(box);
    } else {
        // store article localy
        storeMessageLocaly(box);
    }
}
 function storeMessageLocaly(box) {
    if(useLocalStorage) {
        addItem(box.id, box);
    }
    else {
        if (box.type == 'appeal') {
            aPromise = new Promise((resolve, reject) => {
               addAppealData(box, function() {
                resolve()
               });
            });
            aPromise.then(
                result => {if(isOnline()){
                    getSavedData();
                }
            })
            }
        else if (box.type == 'news') {addNewsData(box)}
    }
    clearUI();
    logEvent('Message saved locally: "' + box.title + '"');
}
 function postData(box, callback) {
    clearUI();
    if (box.type == "appeal") {
        if (page == "fans.html") {
            addAppeal(box.body);
            callback(true);
        }
    } else if (box.type == "news") {
        if (page == "news.html") {
            addNews(box.title, box.body);
            callback(true);
        }
    }
    else {
        callback(false);
    }
     logEvent('Message sent to server: "' + box.title + '"');
}
 function getSavedData() {
    var messages = [];
    var isPosted = false;
    var promise = new Promise((resolve, reject) => {
        if (useLocalStorage) {
            getAllItems(function (result) {
                resolve(result); // get all articles frome local storage
            });
        }
        else {
            if (page == "news.html") {
                getNewsData(function(result) {
                    resolve(result);
                })
            }
            else if (page == "fans.html") {
                getAppealData(function(result) {
                    resolve(result);
                })
            }
        }
    });
     promise.then(
        result => iterate(result),
        reject => console.log("iterating messeges cancelled!")
    );
}
 function iterate(messages) {
    for (var i = 0; i < messages.length; i++) {
        postData(messages[i], function (posted) {isPosted = posted});
        logEvent('Message sent to server: "' + messages[i].title + '"');
        if (useLocalStorage && isPosted) {
            deleteItem(messages[i].id); //delete all articles in local storage
        }
    }
}
 function clearUI () {
	if (page == "fans.html") {
		area = document.getElementById("feedback-text");
        area.value = "";
	} else if (page == "admin.html") {
		title = document.getElementById("news-title");
		article = document.getElementById("news-text");
        title.value = "";
        article.value = "";
	}
 }
 function logEvent (msg) {
    //list with logs
    if (page == "fans.html" || page == "admin.html") {
    	console.log("LOG EVENT: " + msg);
    }
}
 window.addEventListener('online', function (e) {
    reportNetworkStatus();
    getSavedData();
}, true);
 window.addEventListener('offline', function (e) {
    reportNetworkStatus();
}, true);
reportNetworkStatus();

 class News {
    constructor(type, title, body, id){
        this.type = type;
        this.title = title;
        this.body = body;
        this.id = id
    }
}
 class Appeal {
    constructor(type, body, id){
        this.type = type;
        this.body = body;
        this.id = id;
    }
}