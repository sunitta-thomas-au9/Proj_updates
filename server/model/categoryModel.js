const mongoose = require('mongoose');
const CategorySchema = mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Category name should be present']
    },
    products: {
        type: Object,
        required: [true, 'Products should be present']
    }
    
})
mongoose.model('category', CategorySchema);
module.exports = mongoose.model('category');