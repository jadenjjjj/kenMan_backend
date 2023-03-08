const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed'],
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 10
  },
  description: {
    type: String,
    required: true
  },
  coverImage: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Manga = mongoose.model('Manga', mangaSchema);

module.exports = Manga;
