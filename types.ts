import React from 'react';

export interface Module {
  id: string;
  name: string;
  description: string;
  icon?: React.ReactElement<{ className?: string }>; 
}

export type PromptStatus = 'Draft' | 'Published' | 'Archived';

export interface Prompt {
  id: string;
  name: string;
  description: string;
  version: string;
  lastModified: string; // Could be a Date object or ISO string
  status: PromptStatus;
  tags?: string[];
}

// New Bot Types
export type BotStatus = 'Active' | 'Inactive' | 'Draft' | 'Error' | 'Training';

export interface Bot {
  id: string;
  name: string;
  description: string;
  status: BotStatus;
  version: string;
  lastUpdated: string; // ISO string or formatted date
  avatarUrl?: string; // Optional: for a custom bot image/icon
  tags?: string[];
  platform?: string; // e.g., 'Web', 'Mobile', 'Slack'
}

// DataSourceItem Type for Knowledge Base
export type DataSourceType = 'PDF' | 'Website' | 'Text File' | 'Database' | 'Document' | 'API';
export type DataSourceStatus = 'Indexed' | 'Processing' | 'Failed' | 'Pending' | 'Available' | 'Syncing';

export interface DataSourceItem {
  id: string;
  name: string;
  type: DataSourceType;
  status: DataSourceStatus;
  dateAdded: string; // ISO string or formatted date
  itemCount?: number; // e.g., for a website, number of pages; for a document, pages.
  size?: string; // e.g., for a file "1.2 MB"
}

// New ToolItem Type for Tools Section
export type ToolStatus = 'Connected' | 'Disconnected' | 'Error' | 'Pending Setup' | 'Deprecated';
export type ToolCategory = 'API' | 'Service' | 'Plugin' | 'Custom' | 'Data Store';

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  status: ToolStatus;
  version?: string; // Optional version
  lastConnected?: string; // ISO string or formatted date
  tags?: string[];
  owner?: string; // e.g., 'System', 'User: john.doe'
}