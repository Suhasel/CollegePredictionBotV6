const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ➡️ Generate Response from OpenAI
const generateResponse = async (prompt) => {
  try {
    const response = await openai.createCompletion({
      model: "gpt-4",
      prompt: prompt,
      max_tokens: 150,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response.data.choices[0].text.trim();
  } catch (err) {
    console.error("OpenAI API Error:", err.message);
    throw new Error("Failed to generate response from OpenAI");
  }
};

// ➡️ Fine-Tune Model
const fineTuneModel = async (trainingData) => {
  try {
    const fineTuneResponse = await openai.createFineTune({
      training_file: trainingData,
      model: "gpt-4"
    });

    return fineTuneResponse.data;
  } catch (err) {
    console.error("OpenAI Fine-Tune Error:", err.message);
    throw new Error("Failed to fine-tune model");
  }
};

// ➡️ Retrieve Model Information
const getModelInfo = async (modelId) => {
  try {
    const modelInfo = await openai.retrieveModel(modelId);
    return modelInfo.data;
  } catch (err) {
    console.error("OpenAI Retrieve Model Error:", err.message);
    throw new Error("Failed to retrieve model info");
  }
};

// ➡️ Deploy Model
const deployModel = async (modelId) => {
  try {
    const deployment = await openai.createDeployment({
      model: modelId
    });
    return deployment.data;
  } catch (err) {
    console.error("OpenAI Deployment Error:", err.message);
    throw new Error("Failed to deploy model");
  }
};

module.exports = {
  generateResponse,
  fineTuneModel,
  getModelInfo,
  deployModel
};
