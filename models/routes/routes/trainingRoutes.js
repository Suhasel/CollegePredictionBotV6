const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/trainingController');

// ➡️ Routes for Model Training and Fine-Tuning
router.post('/fine-tune', trainingController.fineTuneModel);
router.post('/retrain-model', trainingController.retrainModel);
router.post('/schedule-training', trainingController.scheduleTraining);
router.get('/training-status/:modelId', trainingController.getTrainingStatus);
router.get('/model-info/:modelId', trainingController.getModelInfo);

// ➡️ Routes for Managing Training Data
router.post('/add-training-data', trainingController.addTrainingData);
router.put('/update-training-data/:dataId', trainingController.updateTrainingData);
router.delete('/delete-training-data/:dataId', trainingController.deleteTrainingData);
router.get('/get-training-data/:modelId', trainingController.getTrainingData);

// ➡️ Routes for Dataset Management
router.post('/create-dataset', trainingController.createDataset);
router.put('/update-dataset/:datasetId', trainingController.updateDataset);
router.delete('/delete-dataset/:datasetId', trainingController.deleteDataset);
router.get('/get-dataset/:datasetId', trainingController.getDataset);
router.get('/list-datasets', trainingController.listDatasets);

// ➡️ Routes for Evaluation and Metrics
router.get('/evaluate-model/:modelId', trainingController.evaluateModel);
router.get('/training-metrics/:modelId', trainingController.getTrainingMetrics);
router.get('/list-models', trainingController.listModels);

// ➡️ Routes for Model Versioning and Rollback
router.post('/create-version', trainingController.createModelVersion);
router.post('/rollback-version/:modelId', trainingController.rollbackModelVersion);
router.get('/list-versions/:modelId', trainingController.listModelVersions);

// ➡️ Routes for Model Deployment and Rollback
router.post('/deploy-model/:modelId', trainingController.deployModel);
router.post('/rollback-deployment/:modelId', trainingController.rollbackDeployment);
router.get('/deployment-status/:modelId', trainingController.getDeploymentStatus);

// ➡️ Routes for Active Learning
router.post('/active-learning', trainingController.activeLearningIteration);
router.get('/active-learning-status/:iterationId', trainingController.getActiveLearningStatus);

// ➡️ Routes for Fine-Tune Scheduling
router.post('/schedule-fine-tune', trainingController.scheduleFineTune);
router.get('/fine-tune-schedule', trainingController.getFineTuneSchedule);

// ➡️ Routes for Log and Metrics Tracking
router.get('/training-logs/:modelId', trainingController.getTrainingLogs);
router.get('/fine-tune-metrics/:modelId', trainingController.getFineTuneMetrics);

module.exports = router;
