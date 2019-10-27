var express = require('express');
const actions = require('./actions');

var routes = express.Router();
routes.get('/', actions.getAllPosts);
routes.get('/:id', actions.getSpecificPost);
routes.post('/', actions.createPost);



module.exports = routes;