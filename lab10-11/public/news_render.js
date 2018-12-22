class DATA_CONTROLLER {
   async getData() {
      try {
        const data = await fetch('/news/get-data');
        return data.text();
      } catch (error) {
        console.error('Error GET: ', error);
      }
    }
  }

  const controller = new DATA_CONTROLLER();

  class News {
    constructor(title, text, image) {
        this.title = title;
        this.text = text;
        this.image = image;
    }
  }

  const getData = async () => {
    const get_news = await controller.getData();

    JSON.parse(get_news).forEach(({ title, text, image}) => {
      var ready_render_news = new News(title, text, image);
      $('#aa').prepend(
         render_comments(ready_render_news),
           );
     });
  }

  function render_comments(news) {
    var title = news.title
    var text = news.text
    var image = news.image

    return `
        <div class='news-container'>
        <div class="news-photo"><img src="${image}"></div>
        <div class="news-description-text"><p>${title}</p></div>
        <div class="news-description-low"><p>${text}</p></div>
    </div>
    `
  }


  window.addEventListener('DOMContentLoaded', getData);
