var mongoose = require("mongoose");
const dbURI = 'mongodb://admin:A123456@ds357955.mlab.com:57955/public_chat';

mongoose.Promise = global.Promise;
mongoose.connect(dbURI, {
    useNewUrlParser: true
});

mongoose.connection.on('connected', function () {
    console.info("Mongoose connected to " + dbURI);
});

mongoose.connection.on('error', function (req, res, next) {
    console.info("Mongoose error " + dbURI);
});

mongoose.connection.on('disconnected', function () {
    console.info("Mongoose disconnected " + dbURI);
});


module.exports = mongoose;