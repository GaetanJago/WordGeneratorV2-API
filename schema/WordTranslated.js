const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordTranslatedSchema = new Schema({
        label: {type: String, required: true},
        language: {type: Schema.Types.ObjectId, ref: 'Language', required: true},
        wordRef: {type: Schema.Types.ObjectId, ref: 'Word', required: true}
    },
    {timestamps: true}
);

module.exports = wordTranslatedSchema;