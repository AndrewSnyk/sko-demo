/**
 * AI asset registry - aggregates models and datasets for workshop and Snyk EVO discovery.
 * Used by the app to expose AI assets without runtime API calls.
 * @module src/ai/registry
 */

const path = require('path');
const fs = require('fs');

const { loadModels } = require('../config/models');

/**
 * Load dataset manifest from config.
 * @returns {{ datasets: Array<{ id: string, name: string, description?: string, classification?: string, usedBy?: string[] }> }}
 */
function loadDatasets() {
  const file = path.join(__dirname, '..', 'config', 'datasets.json');
  const raw = fs.readFileSync(file, 'utf8');
  return JSON.parse(raw);
}

/**
 * Get all AI assets (models + datasets) for EVO and workshop use.
 * @returns {{ models: Array, datasets: Array, aibomPath: string }}
 */
function getAIAssets() {
  const { models } = loadModels();
  const { datasets } = loadDatasets();
  const aibomPath = path.join(__dirname, '..', '..', 'aibom.json');
  return {
    models,
    datasets,
    aibomPath
  };
}

/**
 * Get model IDs referenced by this project.
 * @returns {string[]}
 */
function getModelIds() {
  const { models } = loadModels();
  return models.map((m) => m.id);
}

module.exports = {
  loadModels,
  loadDatasets,
  getAIAssets,
  getModelIds
};
