const mongoose = require('mongoose');
// Schema - structure of data stored in the database
const dataSchema = new mongoose.Schema({
    // each instance of the data type has the properties below:
    name: {required: true, type: String},
    age: {required: true, type: Number}
})

module.exports = mongoose.model('Data', dataSchema)