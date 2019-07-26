const categorySchema = require('../schema/Category');
const mongoose = require('mongoose');
const category = mongoose.model('Category', categorySchema);

function respond(err, result, res){
    if(err){
        return res.status(500).json({error: err});
    }
    return res.json(result);
}

const categoryController = {
    getAll: function(req, res) {
        category.find({}, function (err, categories){
            return respond(err, categories, res);
        });
    },
    create: function(req, res){
        console.log(req.body);
        const newCategory = new category(req.body);
        newCategory.save(function (err, savedCategory){
            return respond(err, savedCategory, res);
        });
    },
    get : function(req, res){
        category.findById(req.params.id, function (err, category){
            return respond(err, category, res);
        });
    },
    update: function(req, res){
        category.findByIdAndUpdate(req.params.id, req.body, function (err, category){
            return respond(err, category, res);
        });
    },
    remove: function(req, res){
        category.findByIdAndRemove(req.params.id, function (err, category){
            return respond(err, category, res);
        });
    }
};

module.exports = categoryController;