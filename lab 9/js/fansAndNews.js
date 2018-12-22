//CHECK APPEAL FUNCTIONS----------------------------------------------------

function checkAppeal() {
    var feedbackContainer = document.getElementById('feedback-container');
    var feedbackTextarea = document.getElementById("feedback-text");

    if (feedbackTextarea.value.replace(/\s/g, '').length == 0) {
      feedbackTextarea.classList.add("error-textarea");
      feedbackTextarea.value = '';
      feedbackTextarea.placeholder = "Please, add description";
    return;
    } else {
        feedbackContainer.style.borderColor = 'black';
        var appeal = feedbackContainer.value;
        feedbackContainer.value = "Write an appeal...";
        sendAppeal(appeal);
        alert("Yoour appeal added successfully!");
    }
}

const feedbackTemplateAppeal = (text, date, nickname) => `
    <div class="request">
        <p>${text}</p>
        <div class="req-footer">
            <div class="date">${date}</div>
            <div class="nickname">${nickname}</div>
        </div>
    </div>
`

function addAppeal(appeal) {
  if (page == "fans.html") {
    var aText = appeal;
    var dateTime = new Date();
    var aDate = dateTime.toLocaleDateString()+ ", " + dateTime.toLocaleTimeString()
    var aSignature = "Anonym";
    var node = feedbackTemplateAppeal(aText, aDate, aSignature);
    document.getElementById("feedback-container").innerHTML += node;
  }
}

//CHECK NEWS FUNCTIONS------------------------------------------------------

function checkNews() {
  if (checkNewsTitle() && checkNewsText()) {
    var title = document.getElementById("news-title").value;
    var article = document.getElementById("news-text").value;
    document.getElementById("news-title").value = "News title";
    document.getElementById("news-text").value = "New article";
    sendNews(title, article);
    alert("Your neews has added successfully!")
  }
}

function checkNewsTitle() {
  var newsTitle = document.getElementById('news-title');
  if (newsTitle.value === "" || newsTitle.value === "News title" || newsTitle.value.length > 256) {
    newsTitle.style.borderColor = "red";
    return false;
  }
  else {
    newsTitle.style.borderColor = "black";
    return true;
  }
}

function checkNewsText() {
  var newsText = document.getElementById('news-text');
  if (newsText.value === "" || newsText.value.length < 10) {
    newsText.style.borderColor = "red";
    return false;
  }
  else {
    newsText.style.borderColor = "black";
    return true;
  }
}


const feedbackTemplateNews = (title, text) => `
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

function addNews(title, text) {
  if (page == "news.html") {
    var aText = text;
    var aTitle = title;
    var node = feedbackTemplateNews(aTitle, aText);
    document.getElementById("news-container").innerHTML += node;
  }
}