var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var postSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: {
        type: String,
        trim: true,
        validate: {
            validator: function (postText) {
                return /\S+/.test(postText);
            },
            message: `Message can not be empty`,
            validator: function (postText) {
                return /^.{1,100}$/.test(postText);
            },
            message: `The message must contain up to 100 characters.`
        }
    },
    picture: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    publicationDate: Date,
    last_updated: Date

});

postSchema.pre('findOne', function (next) {
    this.populate('author')
    next();
});

/*
postSchema.statics.getPosts = async function (paginationConfig, callback) {
    return this.find({})
        .populate('author', ["firstName", "lastName", "avatar"])
        .limit(paginationConfig.itemPerPage)
        .sort({
            publicationDate: -1
        })
        .lean()
        .exec(callback);
}
*/

var isPostEmpty = function (postText) {
    return /\S+/.test(postText);
};

postSchema.pre('save', function (next) {
    this.last_updated = Date.now();
    next();
});

postSchema.index({
    '$**': 'text'
});

postSchema.plugin(mongoosePaginate);

var UserPost = mongoose.model('UserPost', postSchema, 'post_list');

module.exports = UserPost;