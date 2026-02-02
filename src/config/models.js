/**
 * Load model config for workshop use (Best-of-N, security demos, etc.).
 * @returns {{ models: Array<{ id: string, provider: string, name: string, description?: string, useCase?: string, knownVulnerabilities?: string[] }> }}
 */
function loadModels() {
  const path = require('path');
  const fs = require('fs');
  const file = path.join(__dirname, 'models.json');
  const raw = fs.readFileSync(file, 'utf8');
  return JSON.parse(raw);
}

module.exports = { loadModels };
