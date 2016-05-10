var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://???:???@ds021741.mlab.com:21741/travellerdiary');

module.exports = mongoose.connection;
