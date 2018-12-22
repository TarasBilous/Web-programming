const getById = (id) => document.getElementById(id);

const newsTemplate = (title, text) => ` 
    <div class="col-lg-3 col-md-4 col-sm-6">
		<div class="news-block">
			<img src="images/dotaImg.jpeg" alt="news image" class="news-img">
			<div class="news-content">
				<h3>${title}</h3>
				<p>${text}</p>
			</div>
		</div>
	</div>
`

const isOnline = () => {
    return window.navigator.onLine;
}


function reportNetworkStatus() {
	if (isOnline()) {
        console.log("Network status: ONLINE");
    } else {
        console.log("Network status: offline");
    }
}

function displayFromLocalStorage() {
	var newsArray = [];
    getAllItems((resultArray) => {
        newsArray = resultArray;
    }, "news")

    for (var i = 0; i < newsArray.length; i++) {
        displayNews(newsArray[i]);
    }

    deleteAllItems("news");
}

function displayNews(news) {
	$('#news-container').prepend(
        newsTemplate(news[0], news[1])
    );
}

 if (window.applicationCache) {
	window.addEventListener('online', function (e) {
	    reportNetworkStatus();
	    displayFromLocalStorage();
	}, true);

	window.addEventListener('offline', function (e) {
	    reportNetworkStatus();
	}, true);

}