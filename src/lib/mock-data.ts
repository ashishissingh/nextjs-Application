
import { Sparkles } from 'lucide-react';

export interface Agent {
  id: string;
  icon: React.ElementType;
  name: string;
  status: 'Active' | 'Draft' | 'Training' | 'Inactive';
  statusColor: 'green' | 'yellow' | 'blue' | 'gray';
  description: string;
  version: string;
  lastUpdated: string;
  platform: string;
  tags: string[];
  avatar?: string; // for user avatar if 'Training'

  // New fields for edit form
  role: string;
  model: string;
  instructions: string;
  isAgent: 'Yes' | 'No';
  isSubAgent: 'Yes' | 'No';
  tools: {
    queryKnowledgeBase: boolean;
    getObjectFromStorage: boolean;
    listStoredObjects: boolean;
    sendEmail: boolean;
  };
  inputGuardrail: string;
  outputGuardrail: string;
  reRanking: 'Yes' | 'No';
  contextCitation: boolean;
  showAdvanced: 'Yes' | 'No';
  temperature: number;
  embeddingModel: string;
  searchStrategy: string;
}

export const mockAgents: Agent[] = [
  {
    id: '1',
    icon: Sparkles,
    name: 'Content Generation Agent',
    status: 'Active',
    statusColor: 'green',
    description: 'Generates high-quality marketing copy and blog posts based on provided keywords and topics.',
    version: 'v1.2.1',
    lastUpdated: '2024-07-28',
    platform: 'Web & API',
    tags: ['content-creation', 'tier-2', 'stable'],
    role: 'Marketing Content Creator',
    model: 'gemini-1.5-pro',
    instructions: 'You are an expert copywriter. Generate compelling and SEO-friendly content. The tone should be engaging and professional.',
    isAgent: 'Yes',
    isSubAgent: 'No',
    tools: {
      queryKnowledgeBase: true,
      getObjectFromStorage: false,
      listStoredObjects: false,
      sendEmail: false,
    },
    inputGuardrail: 'None',
    outputGuardrail: 'Factuality Check',
    reRanking: 'Yes',
    contextCitation: true,
    showAdvanced: 'No',
    temperature: 0.7,
    embeddingModel: 'text-embedding-004',
    searchStrategy: 'Vector Cosine Similarity',
  },
  {
    id: '2',
    icon: Sparkles,
    name: 'Customer Support Agent',
    status: 'Draft',
    statusColor: 'yellow',
    description: 'Automated assistant for handling common customer inquiries and providing initial support.',
    version: 'v0.8.5',
    lastUpdated: '2024-07-25',
    platform: 'Chat Widget',
    tags: ['support', 'tier-1', 'experimental'],
    role: 'Agent',
    model: 'gemini-1.5-flash',
    instructions: 'You are a customer service agent. Be polite and helpful.',
    isAgent: 'Yes',
    isSubAgent: 'No',
    tools: {
      queryKnowledgeBase: true,
      getObjectFromStorage: true,
      listStoredObjects: true,
      sendEmail: true,
    },
    inputGuardrail: 'Harmful Content',
    outputGuardrail: 'None',
    reRanking: 'Yes',
    contextCitation: true,
    showAdvanced: 'No',
    temperature: 0.8,
    embeddingModel: 'text-embedding-004',
    searchStrategy: 'Vector Cosine Similarity',
  },
  {
    id: '3',
    icon: Sparkles,
    name: 'Data Analysis Agent',
    status: 'Training',
    statusColor: 'blue',
    description: 'Processes and analyzes large datasets to extract insights and generate reports.',
    version: 'v1.0.0',
    lastUpdated: '2024-07-29',
    platform: 'Internal API',
    tags: ['analytics', 'tier-3', 'beta'],
    avatar: 'https://placehold.co/40x40.png?text=TA',
    role: 'Data Analyst',
    model: 'claude-3-opus',
    instructions: 'Analyze the provided data and generate a summary report with key findings. Focus on trends and anomalies.',
    isAgent: 'Yes',
    isSubAgent: 'Yes',
    tools: {
      queryKnowledgeBase: true,
      getObjectFromStorage: true,
      listStoredObjects: true,
      sendEmail: false,
    },
    inputGuardrail: 'None',
    outputGuardrail: 'None',
    reRanking: 'No',
    contextCitation: false,
    showAdvanced: 'Yes',
    temperature: 0.2,
    embeddingModel: 'text-embedding-large',
    searchStrategy: 'Euclidean Distance',
  },
   {
    id: '4',
    icon: Sparkles,
    name: 'Code Generation Assistant',
    status: 'Inactive',
    statusColor: 'gray',
    description: 'Helps developers by generating boilerplate code snippets and assisting with debugging.',
    version: 'v0.5.0',
    lastUpdated: '2024-06-15',
    platform: 'IDE Plugin',
    tags: ['development', 'tier-1', 'alpha'],
    role: 'Developer Assistant',
    model: 'gpt-4o',
    instructions: 'Generate clean, efficient, and well-documented code based on the user\'s request. Explain the code if asked.',
    isAgent: 'No',
    isSubAgent: 'No',
    tools: {
      queryKnowledgeBase: false,
      getObjectFromStorage: false,
      listStoredObjects: false,
      sendEmail: false,
    },
    inputGuardrail: 'None',
    outputGuardrail: 'None',
    reRanking: 'Yes',
    contextCitation: false,
    showAdvanced: 'No',
    temperature: 0.5,
    embeddingModel: 'text-embedding-004',
    searchStrategy: 'Vector Cosine Similarity',
  },
  {
    id: '5',
    icon: Sparkles,
    name: 'Image Moderation Agent',
    status: 'Active',
    statusColor: 'green',
    description: 'Automatically reviews and flags inappropriate images based on defined policies.',
    version: 'v2.1.0',
    lastUpdated: '2024-07-22',
    platform: 'API',
    tags: ['moderation', 'tier-2', 'stable', 'vision'],
    role: 'Content Moderator',
    model: 'gemini-1.5-pro',
    instructions: 'Analyze the image and determine if it violates the community guidelines. Provide a clear reason for any flags.',
    isAgent: 'Yes',
    isSubAgent: 'No',
    tools: {
      queryKnowledgeBase: false,
      getObjectFromStorage: false,
      listStoredObjects: false,
      sendEmail: false,
    },
    inputGuardrail: 'None',
    outputGuardrail: 'None',
    reRanking: 'Yes',
    contextCitation: false,
    showAdvanced: 'No',
    temperature: 0.4,
    embeddingModel: 'text-embedding-004',
    searchStrategy: 'Vector Cosine Similarity',
  },
  {
    id: '6',
    icon: Sparkles,
    name: 'Personalized Tutor Agent',
    status: 'Training',
    statusColor: 'blue',
    description: 'Provides adaptive learning experiences and personalized tutoring for various subjects.',
    version: 'v0.3.0',
    lastUpdated: '2024-07-30',
    platform: 'Mobile App',
    tags: ['education', 'tier-1', 'experimental'],
    avatar: 'https://placehold.co/40x40.png?text=PT',
    role: 'Tutor',
    model: 'gemini-1.5-flash',
    instructions: 'You are a friendly and encouraging tutor. Explain concepts clearly and provide examples. Adapt your teaching style to the user\'s progress.',
    isAgent: 'Yes',
    isSubAgent: 'Yes',
    tools: {
      queryKnowledgeBase: true,
      getObjectFromStorage: false,
      listStoredObjects: false,
      sendEmail: true,
    },
    inputGuardrail: 'None',
    outputGuardrail: 'None',
    reRanking: 'Yes',
    contextCitation: true,
    showAdvanced: 'Yes',
    temperature: 0.9,
    embeddingModel: 'text-embedding-004',
    searchStrategy: 'Vector Cosine Similarity',
  },
];
