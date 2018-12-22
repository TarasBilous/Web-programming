const commentName = document.getElementById('comment-name');
const commentBody = document.getElementById('comment-body');

class Comment {
    constructor(name, body, time) {
        this.name = name;
        this.body = body;
        this.time = time;
    }
}

const push_in_DB = () => {
    var comment = new Comment(commentBody.value, commentName.value)
}