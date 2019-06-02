const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

// User Id and User image urls
const UserUrlSchema = new Schema ({
  userId: {
    type: Schema.Types.String,
    required: true
  },
  imageUrls: [ {
    type: Schema.Types.String,
    required: false
}]});

module.exports = Post = mongoose.model('UserUrl', UserUrlSchema);