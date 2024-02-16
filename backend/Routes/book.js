const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const bookCtrl = require('../Controllers/book');

router.get('/', bookCtrl.getAllBook);
router.get('/bestrating', bookCtrl.getBestRating);
router.get('/:id', bookCtrl.getOneBook);

router.post('/',auth, multer, bookCtrl.createBook);
router.post('/:id/rating', auth, bookCtrl.addNote);

router.put('/:id', auth, multer, bookCtrl.modifyBook);

router.delete('/:id', auth, bookCtrl.deleteBook);

module.exports = router;