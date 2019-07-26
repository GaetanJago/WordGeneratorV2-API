const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
        label: {type: String, required: true},
        categories : [{type: Schema.Types.ObjectId, ref: 'Category', required: false}],
        translations: [{type: Schema.Types.ObjectId, ref: 'WordTranslated', required: false}]
    },
    {timestamps: true}
);

module.exports = wordSchema;