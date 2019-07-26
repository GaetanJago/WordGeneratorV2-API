const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
        name: {type: String, required: true},
        words: [{type: Schema.Types.ObjectId, ref: 'Word'}]
    },
    {timestamps: true}
);

module.exports = categorySchema;