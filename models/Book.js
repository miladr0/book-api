const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
mongoose.Promise = global.Promise;

const bookSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: 'Your book must have name!'
    },
    pageCount: {
        type: Number,
        required: 'Your book must have Page Count'
    }
});

bookSchema.plugin(mongoose_delete, { deletedAt : true, overrideMethods: 'all'});

module.exports = mongoose.model('Book', bookSchema);