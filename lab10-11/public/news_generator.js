class DATA_CONTROLLER {
  async sendData(data) {
    try {
      await fetch('/news/create', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Erro POST: ', error);
    }
  }
}

const newsTitle = document.getElementById('news-title');
const newsText = document.getElementById('news-text');
const newsImage = document.getElementById('news-image');
const newsForm = document.getElementById('news-add-form');
const controller = new DATA_CONTROLLER();

class News {
  constructor(title, text, image) {
      this.title = title;
      this.text = text;
      this.image = image;
  }
}

const magic = async () => {
  event.preventDefault();
  var news = new News(newsTitle.value, newsText.value, newsImage.value);
  
  await controller.sendData({
    title: newsTitle.value,
    text: newsText.value,
    image: newsImage.value
  });

  newsText.value = '';
  newsTitle.value = '';
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#image-container').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
};

$("#news-image").change(function() {
  readURL(this);
});
   
  
  
  

