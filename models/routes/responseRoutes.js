const express = require('express');
const router = express.Router();
const responseController = require('../controllers/responseController');

// ➡️ Routes for User Responses
router.post('/save-response', responseController.saveResponse);
router.get('/get-responses', responseController.getAllResponses);
router.get('/get-response/:id', responseController.getResponseById);
router.delete('/delete-response/:id', responseController.deleteResponse);
router.put('/update-response/:id', responseController.updateResponse);
router.get('/get-user-responses/:userId', responseController.getResponsesByUser);

// ➡️ Routes for Sentiment Analysis
router.get('/analyze-sentiment/:id', responseController.analyzeSentiment);
router.get('/analyze-all-sentiments', responseController.analyzeAllSentiments);

// ➡️ Routes for Data Aggregation
router.get('/sentiment-summary', responseController.getSentimentSummary);
router.get('/top-positive-responses', responseController.getTopPositiveResponses);
router.get('/top-negative-responses', responseController.getTopNegativeResponses);

// ➡️ Routes for Fine-Tuning and Training
router.post('/train-model', responseController.trainModel);
router.post('/retrain-model', responseController.retrainModel);
router.get('/training-status', responseController.getTrainingStatus);
router.get('/model-info', responseController.getModelInfo);

// ➡️ Routes for Flagging and Reporting
router.put('/flag-response/:id', responseController.flagResponse);
router.put('/unflag-response/:id', responseController.unflagResponse);
router.get('/flagged-responses', responseController.getFlaggedResponses);

// ➡️ Routes for Tagging and Notes
router.put('/add-tag/:id', responseController.addTagToResponse);
router.put('/remove-tag/:id', responseController.removeTagFromResponse);
router.put('/add-note/:id', responseController.addNoteToResponse);

// ➡️ Advanced Search and Filtering
router.get('/search-responses', responseController.searchResponses);
router.get('/filter-responses', responseController.filterResponses);

module.exports = router;
