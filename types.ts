import React from 'react';

// Module Definitions
export interface Module {
  id: string;
  name: string;
  description: string;
  descriptionClassName?: string;
  icon?: React.ReactElement<{ className?: string }>;
}

// Prompt Definitions
export type PromptStatus = 'Draft' | 'Published' | 'Archived';

export interface Prompt {
  /** Unique identifier */
  id: string;
  /** Title (legacy) or name (preferred) */
  title?: string;
  name?: string;
  /** Optional longer description */
  description?: string;
  /** Semantic version */
  version: string;
  /** Legacy date field (format: DD/MM/YYYY) */
  date?: string;
  /** ISO string or formatted last modified date */
  lastModified?: string;
  /** Current status of the prompt */
  status: PromptStatus;
  /** Optional tags */
  tags?: string[];
}

// Bot Definitions
export type BotStatus = 'Active' | 'Inactive' | 'Draft' | 'Error' | 'Training';

export interface Bot {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Description of the bot */
  description: string;
  /** Optional React icon component (legacy) */
  icon?: React.ElementType;
  /** Optional avatar URL for custom image */
  avatarUrl?: string;
  /** Category or platform (legacy vs new) */
  category?: string;
  platform?: string;
  /** Status of the bot (new) */
  status?: BotStatus;
  /** Semantic version (new) */
  version?: string;
  /** ISO string or formatted date of last update */
  lastUpdated?: string;
  /** Optional tags */
  tags?: string[];
}

// Chat Message Definitions
export type MessageSender = 'user' | 'bot';

export interface ChatMessage {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: Date;
  /** Associate with a bot if needed */
  botId?: string;
}

// Knowledge Base Data Source Types
export type DataSourceType = 'PDF' | 'Website' | 'Text File' | 'Database' | 'Document' | 'API';
export type DataSourceStatus = 'Indexed' | 'Processing' | 'Failed' | 'Pending' | 'Available' | 'Syncing';

export interface DataSourceItem {
  id: string;
  name: string;
  type: DataSourceType;
  status: DataSourceStatus;
  /** ISO string or formatted date */
  dateAdded: string;
  /** Optional: number of items/pages */
  itemCount?: number;
  /** Optional: human-readable size */
  size?: string;
}

// Tool Section Definitions
export type ToolCategory = 'API' | 'Service' | 'Plugin' | 'Custom' | 'Data Store';
export type ToolStatus = 'Connected' | 'Disconnected' | 'Error' | 'Pending Setup' | 'Deprecated';

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  status: ToolStatus;
  /** Optional version */
  version?: string;
  /** ISO string or formatted date of last connection */
  lastConnected?: string;
  /** Optional tags */
  tags?: string[];
  /** Owner identifier */
  owner?: string;
}
