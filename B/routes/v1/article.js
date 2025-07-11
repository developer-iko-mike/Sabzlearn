const express = require('express');
const multer = require('multer');

const articleController = require('../../controllers/v1/articleController');
const multerStorage = require('../../util/multerStorage');
const authenticatedMiddleware = require('../../middlewares/authenticated');
const isAdminMiddleware = require('../../middlewares/isAdmin');

const router = express.Router();

// We remove the global authenticatedMiddleware and apply it only where needed.

router
  .route('/')
  .get(articleController.getAll) // Public access
  .post(
    authenticatedMiddleware, // Now we add authenticatedMiddleware and isAdminMiddleware only to the POST route
    isAdminMiddleware,
    // multer({ storage: multerStorage }).single('cover'),
    articleController.create
  );

router.route('/:shortName').get(articleController.getOne); // This remains public? Or should it be authenticated?

// Note: If we want the getOne route to be public too, we leave it as is. Otherwise, we can add authentication.

module.exports = router;
