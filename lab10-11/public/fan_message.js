class DATA_CONTROLLER {
    async sendData(data) {
      try {
        await fetch('/comments/create', {
          method: 'post',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data),
        });
      } catch (error) {
        console.error('Error POST: ', error);
      }
    }
  
   async getData() {
      try {
        const data = await fetch('/comments/get-data');
        return data.text();
      } catch (error) {
        console.error('Error GET: ', error);
      }
    }
  }

const commentName = document.getElementById('comment-name');
const commentBody = document.getElementById('comment-body');
const controller = new DATA_CONTROLLER();

class Comment {
    constructor(name, body, time) {
        this.name = name;
        this.body = body;
        this.time = time;
    }
}

const magic = async () => {
    event.preventDefault();
    var comment = new Comment(commentBody.value, commentName.value);

    await controller.sendData({
        name: commentName.value,
        body: commentBody.value
      });

    commentBody.value = '';
    commentName.value = '';
}

const getData = async () => {
  const get_comments = await controller.getData();

  JSON.parse(get_comments).forEach(({ name, body }) => {
    var ready_render_comment = new Comment(name, body);
    $('#ss').prepend(
       render_comments(ready_render_comment),
         );
   });
}

function render_comments(comment) { 
  var name = comment.name
  var body = comment.body
  
  return ` 
      <div class="fan-message-container">
      <div class="fan-message-text"><p class="">${name}</p></div>
      <p class="fan-message-nickname">${body}</p>
      <p class="fan-message-time"></p>
    </div>
      `
}


window.addEventListener('DOMContentLoaded', getData);
