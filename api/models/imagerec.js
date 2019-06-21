var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var imgSchema = new Schema({
  concepts: Object,
  imgbase64: String
});

module.exports = mongoose.model('Imagerec', imgSchema);