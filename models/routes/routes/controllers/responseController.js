const UserResponse = require('../models/UserResponse');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ➡️ Save User Response
exports.saveResponse = async (req, res) => {
  const { userId, responseText } = req.body;
  try {
    const analysis = sentiment.analyze(responseText);

    const newResponse = new UserResponse({
      userId,
      responseText,
      sentimentScore: analysis.score,
      sentimentComparative: analysis.comparative,
    });

    await newResponse.save();
    res.status(201).json({ message: 'Response saved successfully', data: newResponse });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save response', details: err.message });
  }
};

// ➡️ Get All Responses
exports.getAllResponses = async (req, res) => {
  try {
    const responses = await UserResponse.find().sort({ date: -1 });
    res.status(200).json(responses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve responses', details: err.message });
  }
};

// ➡️ Get Response by ID
exports.getResponseById = async (req, res) => {
  try {
    const response = await UserResponse.findById(req.params.id);
    if (!response) return res.status(404).json({ error: 'Response not found' });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve response', details: err.message });
  }
};

// ➡️ Delete Response
exports.deleteResponse = async (req, res) => {
  try {
    await UserResponse.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Response deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete response', details: err.message });
  }
};

// ➡️ Update Response
exports.updateResponse = async (req, res) => {
  try {
    const updatedResponse = await UserResponse.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: 'Response updated successfully', data: updatedResponse });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update response', details: err.message });
  }
};

// ➡️ Get Responses by User ID
exports.getResponsesByUser = async (req, res) => {
  try {
    const responses = await UserResponse.find({ userId: req.params.userId });
    res.status(200).json(responses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve user responses', details: err.message });
  }
};

// ➡️ Analyze Sentiment of a Single Response
exports.analyzeSentiment = async (req, res) => {
  try {
    const response = await UserResponse.findById(req.params.id);
    if (!response) return res.status(404).json({ error: 'Response not found' });

    const analysis = sentiment.analyze(response.responseText);
    res.status(200).json({ message: 'Sentiment Analysis Complete', analysis });
  } catch (err) {
    res.status(500).json({ error: 'Failed to analyze sentiment', details: err.message });
  }
};

// ➡️ Analyze Sentiment of All Responses
exports.analyzeAllSentiments = async (req, res) => {
  try {
    const responses = await UserResponse.find();
    const analysis = responses.map(response => ({
      responseId: response._id,
      analysis: sentiment.analyze(response.responseText),
    }));
    res.status(200).json(analysis);
  } catch (err) {
    res.status(500).json({ error: 'Failed to analyze all sentiments', details: err.message });
  }
};

// ➡️ Get Sentiment Summary
exports.getSentimentSummary = async (req, res) => {
  try {
    const responses = await UserResponse.find();
    const summary = {
      positive: responses.filter(r => r.sentimentScore > 0).length,
      negative: responses.filter(r => r.sentimentScore < 0).length,
      neutral: responses.filter(r => r.sentimentScore === 0).length,
    };
    res.status(200).json(summary);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get sentiment summary', details: err.message });
  }
};
