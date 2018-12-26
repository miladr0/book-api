const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book/bookController');
const bookValidators = require('../controllers/book/bookValidators');


router.post('/add',bookValidators.validationAddBook, bookValidators.handleValidationErrors, bookController.addBook);
router.post('/edit',bookValidators.validationEditBook, bookValidators.handleValidationErrors, bookController.editBook);
router.get('/get_book/:bookId',bookValidators.validationGetBook, bookValidators.handleValidationErrors, bookController.getBookById);
router.get('/delete/:bookId',bookValidators.validationDeleteBook, bookValidators.handleValidationErrors, bookController.deleteBookById);
router.get('/all_books/:page/:sortType',bookValidators.validationAllBooks, bookValidators.handleValidationErrors, bookController.getAllBooks);

module.exports = router;