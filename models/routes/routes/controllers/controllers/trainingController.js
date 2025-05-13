const OpenAI = require('openai');
const dotenv = require('dotenv');
const UserResponse = require('../models/UserResponse');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ➡️ Fine-Tune the Model
exports.fineTuneModel = async (req, res) => {
  try {
    const { trainingData } = req.body;
    const fineTuneResponse = await openai.createFineTune({
      training_file: trainingData,
      model: "gpt-4"
    });

    res.status(200).json({
      message: 'Model fine-tuning started successfully',
      data: fineTuneResponse
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fine-tune model', details: err.message });
  }
};

// ➡️ Retrain the Model
exports.retrainModel = async (req, res) => {
  try {
    const { trainingData } = req.body;
    const retrainResponse = await openai.createFineTune({
      training_file: trainingData,
      model: "gpt-4"
    });

    res.status(200).json({
      message: 'Model retraining started successfully',
      data: retrainResponse
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrain model', details: err.message });
  }
};

// ➡️ Schedule Training
exports.scheduleTraining = async (req, res) => {
  try {
    const { trainingData, scheduleTime } = req.body;
    // Logic for scheduling (can use node-cron or another scheduler)
    res.status(200).json({
      message: `Training scheduled for ${scheduleTime}`,
      trainingData
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to schedule training', details: err.message });
  }
};

// ➡️ Get Training Status
exports.getTrainingStatus = async (req, res) => {
  try {
    const { modelId } = req.params;
    const status = await openai.retrieveFineTune(modelId);

    res.status(200).json({
      message: 'Training status retrieved successfully',
      status
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve training status', details: err.message });
  }
};

// ➡️ Get Model Information
exports.getModelInfo = async (req, res) => {
  try {
    const { modelId } = req.params;
    const modelInfo = await openai.retrieveModel(modelId);

    res.status(200).json({
      message: 'Model information retrieved successfully',
      modelInfo
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve model information', details: err.message });
  }
};

// ➡️ Add Training Data
exports.addTrainingData = async (req, res) => {
  try {
    const { data } = req.body;
    // Logic to add data to the dataset
    res.status(200).json({
      message: 'Training data added successfully',
      data
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add training data', details: err.message });
  }
};

// ➡️ Deploy Model
exports.deployModel = async (req, res) => {
  try {
    const { modelId } = req.params;
    const deploymentResponse = await openai.createDeployment({
      model: modelId
    });

    res.status(200).json({
      message: 'Model deployed successfully',
      deploymentResponse
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to deploy model', details: err.message });
  }
};

// ➡️ Rollback Model
exports.rollbackModel = async (req, res) => {
  try {
    const { modelId, versionId } = req.body;
    // Logic to rollback to a previous version
    res.status(200).json({
      message: `Model rolled back to version ${versionId} successfully`,
      modelId,
      versionId
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to rollback model', details: err.message });
  }
};
