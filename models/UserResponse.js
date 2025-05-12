const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for storing user responses
const UserResponseSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  responseText: {
    type: String,
    required: true,
  },
  sentimentScore: {
    type: Number,
    default: 0,
  },
  sentimentComparative: {
    type: Number,
    default: 0,
  },
  feedback: {
    type: String,
    default: '',
  },
  improvementSuggestions: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    enum: ['pending', 'processed', 'reviewed'],
    default: 'pending',
  },
  modelVersion: {
    type: String,
    default: 'v1.0',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  isFlagged: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
    default: '',
  },
  tags: {
    type: [String],
    default: [],
  },
  userAgent: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
  ipAddress: {
    type: String,
    default: '',
  },
  additionalData: {
    type: Map,
    of: String,
    default: {},
  },
});

// Middleware to update the lastUpdated field before saving
UserResponseSchema.pre('save', function (next) {
  this.lastUpdated = Date.now();
  next();
});

// Indexing for faster search
UserResponseSchema.index({ userId: 1, date: -1 });
UserResponseSchema.index({ responseText: 'text' });

// Create a model based on the schema
module.exports = mongoose.model('UserResponse', UserResponseSchema);
