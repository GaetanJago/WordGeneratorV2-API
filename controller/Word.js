const wordSchema = require('../schema/Word');
const categorySchema = require('../schema/Category')
const mongoose = require('mongoose');
const word = mongoose.model('Word', wordSchema);
const category = mongoose.model('Category', categorySchema);

function respond(err, result, res) {
    if (err) {
        return res.status(500).json({ error: err });
    }
    return res.json(result);
}


const wordController = {
    getAll: function (req, res) {
        word.find({}, function (err, words) {
            return respond(err, words, res);
        });
    },
    create: function (req, res) {
        const newWord = new word(req.body);
        newWord.save(function (err, savedWord) {
            req.body.categories.forEach(categoryId => {
                category.findById(categoryId).exec(function(err, categoryFound) {
                    categoryFound.words.push(savedWord._id);
                    categoryFound.save();
                    
                });
            });

            return respond(err, savedWord, res)

        });
    },
    get: function (req, res) {
        word.findById(req.params.id, function (err, word) {
            return respond(err, word, res);
        });
    },
    update: function (req, res) {
        word.findByIdAndUpdate(req.params.id, req.body, function (err, word) {
            return respond(err, word, res);
        });
    },
    remove: function (req, res) {
        word.findByIdAndRemove(req.params.id, function (err, word) {
            return respond(err, word, res);
        });
    },
    addTranslation: function(wordId, translationId) {
        return new Promise(function(resolve, reject) {
            word.findById(wordId).exec(function(err, wordFound) {
                if(err) reject(err);
                wordFound.translations.push(translationId);
                wordFound.save(function(err, savedWord) {
                    resolve();
                })
            })
        })
    },
    removeTranslation: function(wordId, translationId) {
        return new Promise(function(resolve, reject) {
            word.findById(wordId).exec(function(err, wordFound) {
                if(err) reject(err);
                const index = wordFound.translations.indexOf(translationId);
                wordFound.translations.splice(index, 1);
                wordFound.save(function(err, savedWord) {
                    resolve();
                })
            })
        })
    }
};

module.exports = wordController;