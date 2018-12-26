const mongoose = require('mongoose');
const Book = mongoose.model('Book');



/**
 * add a new book to collection of Books
 * @param name String Name of the book
 * @param pageCount Int Page Number of Book
 */
exports.addBook = async (req, res) => {
    const book = await (new Book(req.body)).save();
    res.json({book});
};

//update a Book
/**
 *
 * @param _id UUID of Book
 * @param name String Name of book
 * @param pageCount Int Page Number of Book
 * @returns {Object}
 */
exports.editBook = async (req, res) => {
    // find and update the store
    const bookId = req.body._id;
    const updatedBook = await Book.findOneAndUpdate({ _id: bookId}, req.body, {
        new: true, // return the new Book instead of the old one
        runValidators: true
    }).exec();

    if(updatedBook) {
        res.json({updatedBook});
    }else  {
        res.status(422).json({errors: `Error in updating the Book with id: ${bookId}`});
    }
};

//get a Book using Book UUID
/**
 *
 * @param _id UUID of Book
 * @returns {Object}
 */
exports.getBookById = async (req, res) => {
    const bookId = req.params.bookId;
    const book = await Book.findOne({_id: bookId});

    if (book) {
        res.json({book});
    }else {
        res.status(422).json({errors: `book with id: ${bookId} Not Found!`});
    }
};

/**
 * soft Delete a Book
 *Note: Soft delete Plugin is Enabled on Book Schema
 * @param _id UUID of Book
 * @returns {Object}
 */
exports.deleteBookById = async (req, res) => {
    const bookId = req.params.bookId;
    const book = await Book.deleteById(bookId);

    if (book) {
        res.json({book});
    }else {
        res.status(422).json({errors: `book with id: ${bookId} Not Deleted!`});
    }

};


//show list of books with pagination
// @{page} current page of pagination
//@{sortType} if equal '1' sort by created Date if equal '2' sort by pageCount of Every Book
exports.getAllBooks = async (req, res) => {
    const page = req.params.page || 1;
    const sortType = parseInt(req.params.sortType);
    let sortCondition;

    if (sortType === 1) {
        sortCondition = {created: 'desc'};
    }else if (sortType === 2) {
        sortCondition = {pageCount: -1};
    }
        const limit = 5;
        const skip = (page * limit) - limit;
        // 1. Query the database for a list of all books
        const booksPromise = Book
            .find()
            .skip(skip)
            .limit(limit)
            .sort(sortCondition);

        const countPromise = Book.count();

        const [books, count] = await Promise.all([booksPromise, countPromise]);
        const pages = Math.ceil(count / limit);
        if (!books.length && skip) {
            res.status(422).json({errors: `the Page (${page}) you requested Not Found!`});
            return;
        }

        res.json({ books, page, pages, count });

};