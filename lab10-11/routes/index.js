var express = require('express');
var router = express.Router();
var view_routing = require('./views_routing')

module.exports = (app, db) => {
  view_routing(app, db);
  comment(app, db)
  news(app, db)
}
