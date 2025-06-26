export const SEARCH_STRATEGIES = [
  { value: 'vector-cosine', label: 'Vector Cosine Similarity' },
  { value: 'keyword', label: 'Keyword Match' },
  { value: 'hybrid', label: 'Hybrid (Vector + Keyword)' },
] as const;

export const FORM_PLACEHOLDERS = {
  BOT_NAME: 'e.g., Support Assistant Bot',
  BOT_DESCRIPTION: 'e.g., Answers common customer questions and escalates complex issues.',
  BOT_INSTRUCTIONS: 'e.g., You are a friendly and helpful assistant. Always be polite.',
  EMBEDDING_MODEL: 'e.g., text-embedding-004',
  SELECT_MODEL: 'Select a model',
  SELECT_STRATEGY: 'Select search strategy',
  GUARDRAIL_NONE: 'None',
} as const;

export const FORM_MESSAGES = {
  GENERATION_SETTINGS: 'More generation settings can be added here.',
  EMBEDDING_SETTINGS: 'Further embedding configurations can be added.',
  SEARCH_SETTINGS: 'Additional search parameters will appear here.',
  CITATION_DESCRIPTION: 'If enabled, the bot will attempt to cite sources for information it provides.',
} as const;