const mongoose = require('mongoose');
const formatDate = require('../utils/formatDate');

const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => formatDate(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;
