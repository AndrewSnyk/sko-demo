# AI Assets for Snyk EVO Testing

This document lists the AI-related assets in this project so you can adequately test [Snyk EVO](https://evo.ai.snyk.io/) (agentic security orchestration for AI-native applications).

## Inventory

| Asset | Location | Description |
|-------|----------|-------------|
| **CycloneDX AI-BOM** | `aibom.json` (repo root) | CycloneDX 1.6 AI ModelCards: models (GPT-4.1, GPT-5, Claude 2.1 legacy) and dataset components for EVO Discovery. |
| **Model config** | `src/config/models.json` | Model IDs, providers, use cases, and known vulnerabilities (legacy Claude). |
| **Model loader** | `src/config/models.js` | Loads model config; used by `src/ai/registry.js`. |
| **Dataset manifest** | `src/config/datasets.json` | Dataset references (workshop demo, SWE-bench ref) and which models use them. |
| **AI registry** | `src/ai/registry.js` | First-party code that aggregates models + datasets; exposes `getAIAssets()`, `getModelIds()`. |
| **AI tools config** | `config/ai-tools.json` | Model IDs and workshop tools (Best-of-N, Security Demo) for EVO discovery. |

## Models Referenced

- **GPT-4.1** (OpenAI) – production, Best-of-N
- **GPT-5** (OpenAI) – production, Best-of-N
- **Claude 2.1 legacy** (Anthropic) – workshop demos, vulnerability testing; has known issues (prompt injection, etc.)

## Datasets Referenced

- **Workshop Demo Dataset** – synthetic/public benchmark refs for EVO testing
- **SWE-bench Reference** – coding benchmark reference for model evaluation

## How EVO Uses These

- **Discovery Agent**: Finds `aibom.json`, model/dataset configs, and `src/ai/registry.js`.
- **Assess**: Can evaluate model metadata, dataset refs, and first-party code that touches AI assets.
- **Govern**: Policy and findings can reference this inventory.

Ensure EVO is pointed at this repo (or at the CycloneDX BOM) so it can discover and review these assets.
