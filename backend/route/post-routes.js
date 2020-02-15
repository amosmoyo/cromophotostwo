
const express = require('express');

const router = express.Router();

const auth = require('../middlewares/middleware');

const imageMiddleware = require('../middlewares/imageFile')

const postController = require('../controllers/post-control');

// create operation
router.route('').post(auth, imageMiddleware, postController.postCreate)

// read operation
router.route('').get(postController.getPosts)

// read operation
router.route('/:id').get(postController.getPost)

// update operation
router.route('/update/:id').post(auth, imageMiddleware, postController.updatePost)

// delete operations
router.route('/delete/:id').get(auth, postController.deletePost)


module.exports = router;



