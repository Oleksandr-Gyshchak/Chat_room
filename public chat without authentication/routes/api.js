const express = require('express');
const router = express.Router();

var postController = require("../controllers/post");

let saveImg = require('../middleware/saveImg').saveImg;
let setUserProfile = require('../middleware/checkUser').setUser;

/**
 * @api {get} api/messages/list/:page Get messages list
 * @apiGroup messages
 * @apiSuccessExample Response JSON {docs: [{…}, {…}, {…}]
        hasNextPage: true
        hasPrevPage: false
        limit: 3
        nextPage: 2
        page: 1
        prevPage: null
        totalDocs: 7
        totalPages: 3
  } 
 * @apiDescription Get messages list
 */
router.get('/messages/list/:page', postController.getPostlist);

/**
 * @api {POST} api/messages/single Add a new message
 * @apiGroup messages
 * @apiSchema (Body) 
	 * {
			"email": String,
      "username": String
      "text": String   // length < 100
      "picture" - if need to load picture
	 * }
 * @apiDescription Add a new message
 */
router.post('/messages/single', setUserProfile, saveImg, postController.createPost);

/**
 * @api {get} api/messages/single/:messageId Get one message
 * @apiGroup messages
 * @apiSuccessExample Response JSON {
  "_id": "5c7c1f269a15a9049c2ebd5a",
  "text": "cacacsca",
  "picture": "/images/1551638310167.jpeg",
  "publicationDate": "2019-03-03T18:38:30.180Z",
  "author": {
      "_id": "5c7c1f269a15a9049c2ebd59",
      "username": "Alex",
      "email": "sasha991@ukr.net",
      "createdDate": "2019-03-03T18:38:30.062Z",
      "last_updated": "2019-03-03T18:38:30.092Z",
      "__v": 0
  },
  "last_updated": "2019-03-03T18:38:30.188Z",
  "__v": 0
} 
 * @apiDescription Get one message
 */
router.get('/messages/single/:messageId', postController.findOnePost);

module.exports = router;