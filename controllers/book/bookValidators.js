const { check, param, validationResult } = require('express-validator/check');

// Finds the validation errors in this request and wraps them in an object
exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    next();
};

exports.validationAddBook = [
    // name of book
    check('name').exists(),
    check('pageCount').exists().isInt(),
];

exports.validationEditBook = [
    check('_id').isMongoId(),
    check('name').exists(),
    check('pageCount').exists().isInt(),
];

exports.validationAllBooks = [
    param('page').exists().isInt(),
    param('sortType').isInt({ min: 1, max: 2 })
];

exports.validationGetBook = [
    param('bookId').isMongoId()
];

exports.validationDeleteBook = [
    param('bookId').isMongoId()
];