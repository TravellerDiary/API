var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://sos987987:sos789789@ds021741.mlab.com:21741/travellerdiary');

module.exports = mongoose.connection;
