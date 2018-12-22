var ObjectID = require('mongodb').ObjectID;
var _dirname = 'D:/webLabs/lab10-11';
module.exports = function(app, db) {
  app.get('/', (req, res) => {
    res.sendFile(_dirname + '/views/index.html');
  });
  app.get('/index.html', (req, res) => {
    res.sendFile(_dirname + '/views/index.html');
  });
  app.get('/views/matches.html', (req, res) => {
    res.sendFile(_dirname + '/views/matches.html');
  });
  app.get('/views/news.html', (req, res) => {
    res.sendFile(_dirname + '/views/news.html');
  });
  app.get('/views/fans.html', (req, res) => {
    res.sendFile(_dirname + '/views/fans.html');
  });

  app.get('/views/contacts.html', (req, res) => {
    res.sendFile(_dirname + '/views/contacts.html');
  });
  app.get('/views/admin.html', (req, res) => {
    res.sendFile(_dirname + '/views/admin.html');
  });
};