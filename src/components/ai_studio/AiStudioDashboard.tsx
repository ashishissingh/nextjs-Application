// AiStudioDashboard.tsx
import React, { useState, useEffect, useRef, SVGProps } from 'react';
import type { AiStudioNavId } from './AiStudioSidebar';
import type {
  Prompt,
  PromptStatus,
  DataSourceItem,
  DataSourceType,
  DataSourceStatus,
  ToolItem,
  ToolStatus,
  ToolCategory,
  BotStatus
} from '../../../types';
import ModuleKitScreen from '../shared/ModuleKitScreen';
import GenericKitLikeContent from '../shared/GenericKitLikeContent';
import BotManagementScreen from './BotManagementScreen';
import AiStudioSectionHeader from './AiStudioSectionHeader';
import CreateBotForm  from './CreateBotForm'; // Already imported

import {
  AdjustmentsHorizontalIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  BellIcon as NotificationBellIcon,
  DocumentPlusIcon,
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  BuildingStorefrontIcon,
  ShieldCheckIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  CubeIcon,
  CommandLineIcon,
  BotIcon as BotSectionIcon,
  PromptIcon as PromptSectionIcon,
  KnowledgeBaseIcon,
  ToolsIcon as ToolsSectionIcon,
  PlusCircleIcon,
  PencilIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  IdentificationIcon,
  CheckIcon,
  RectangleStackIcon,
  FolderOpenIcon,
  GlobeAltIcon,
  DocumentTextIcon
} from '../../../constants';

// --- TYPE DEFINITIONS FOR NAV CONTENT CONFIG ---
type IconElement = React.ReactElement<SVGProps<SVGSVGElement>>;

interface HeaderConfig {
  title: string;
  subtitle?: string;
  decorativeIcon?: IconElement;
  backgroundColorClasses?: string; // will be semantic classes
  showSearchBar?: boolean;
  searchPlaceholder?: string;
}

interface DashboardConfig {
  navType: 'dashboardConfig';
  headerConfig: HeaderConfig;
}

interface PromptsConfig {
  navType: 'promptsConfig';
  Component: React.FC<{ searchTerm: string }>;
  headerConfig: HeaderConfig;
}

interface BotsConfig {
  navType: 'botsConfig';
  Component: React.FC<{ searchTerm: string }>;
  headerConfig: HeaderConfig;
}

// New type for CreateBot screen
interface CreateBotScreenConfig {
  navType: 'createBotConfig'; // New navType
  Component: React.FC; // CreateBotForm doesn't currently take props
  headerConfig: HeaderConfig;
}

interface AiStudioModuleKitPageProps {
  moduleName: "AI Studio";
  kitName: "AI Studio Kit";
  featurePoints: string[];
  primaryAction: { text: string; onClick: () => void };
  secondaryAction?: { text: string; onClick: () => void };
}

interface ModuleKitsAiStudioConfig {
  navType: 'moduleKitsAiStudioConfig';
  Component: React.FC<Omit<AiStudioModuleKitPageProps, 'bannerText' | 'bannerIcon'>>;
  propsForComponent: Omit<AiStudioModuleKitPageProps, 'bannerText' | 'bannerIcon'>;
  headerConfig: HeaderConfig;
}

interface GenericKitSectionConfig<T extends DataSourceItem | ToolItem> {
  navType: 'genericKitSection';
  setupTitle: string;
  setupDescription: string;
  featurePoints: string[];
  primaryActionText: string;
  existingItemsTitle: string;
  emptyStateText: string;
  emptyStateSetupText: string;
  headerConfig: HeaderConfig;

  dataItems?: T[];
  dataItemTableHeaders?: Array<{
    key: keyof T | 'actions';
    label: string;
    className?: string;
    render?: (item: T) => React.ReactNode;
  }>;
  onEditItem?: (item: T) => void;
  onDuplicateItem?: (item: T) => void;
  onDeleteItem?: (item: T) => void;
  itemTypeForIcons: 'datasource' | 'tool';
}

type AiStudioNavConfigEntry =
  | DashboardConfig
  | PromptsConfig
  | BotsConfig
  | ModuleKitsAiStudioConfig
  | GenericKitSectionConfig<DataSourceItem>
  | GenericKitSectionConfig<ToolItem>
  | CreateBotScreenConfig; // Include the new type

interface AiStudioDashboardProps {
  activeNav: AiStudioNavId;
}

// --- SAMPLE DATA for Prompts, DataSources, Tools (same as before) ---
const samplePrompts: Prompt[] = Array.from({ length: 30 }, (_, i) => ({
  id: `p${i + 1}`,
  name: `Prompt Title ${i + 1} - ${i % 2 === 0
    ? 'Customer Service Query Handler'
    : 'Creative Content Generation Helper'}`,
  description: `This is detailed description for prompt ${i + 1}. ...`,
  version: `v1.${i % 4}.${i % 2}`,
  lastModified: new Date(Date.now() - i * 1000 * 60 * 60 * 12).toLocaleDateString(),
  status: i % 3 === 0 ? 'Published' : i % 3 === 1 ? 'Draft' : 'Archived',
  tags:
    i % 2 === 0
      ? ['customer-service', 'greeting', `release-${i % 4}`, 'faq']
      : ['content', 'ideation', 'marketing', `beta-v${i % 3}`, 'blogging'],
}));

const PROMPTS_PER_PAGE = 8;

// Replace getStatusColorClasses to semantic classes:
const getStatusColorClasses = (
  status: PromptStatus | DataSourceStatus | ToolStatus | BotStatus
): string => {
  switch (status) {
    case 'Published':
    case 'Indexed':
    case 'Available':
    case 'Connected':
      return 'bg-info/10 text-info-foreground';      // informational
    case 'Draft':
    case 'Pending Setup':
      return 'bg-success/10 text-success-foreground'; // neutral/starting
    case 'Active':
      return 'bg-success/10 text-success-foreground';
    case 'Archived':
    case 'Pending':
    case 'Inactive':
      return 'bg-muted/10 text-muted-foreground';    // neutral
    case 'Processing':
    case 'Syncing':
    case 'Training':
      return 'bg-warning/10 text-warning-foreground'; // in-progress
    case 'Failed':
    case 'Error':
    case 'Disconnected':
      return 'bg-error/10 text-error-foreground';     // error
    case 'Deprecated':
      return 'bg-warning/10 text-warning-foreground';
    default:
      return 'bg-card/10 text-muted-foreground';
  }
};

// PROMPT LIST HEADER & ITEM with semantic classes
const PromptListHeader: React.FC = () => (
  <div className="
    flex items-center px-4 py-3
    bg-card/80 backdrop-blur-sm rounded-t-lg shadow-sm
    text-xs font-semibold text-muted-foreground uppercase tracking-wider sticky top-0 z-10
  ">
    <div className="flex-auto w-3/12 px-2">Prompt Name</div>
    <div className="flex-auto w-2/12 px-2 text-center">Status</div>
    <div className="flex-auto w-1/12 px-2 text-center">Version</div>
    <div className="flex-auto w-2/12 px-2 text-center">Last Modified</div>
    <div className="flex-auto w-2/12 px-2 text-center">Tags</div>
    <div className="flex-auto w-2/12 px-2 text-right">Actions</div>
  </div>
);

interface PromptListItemProps {
  prompt: Prompt;
}

const PromptListItem: React.FC<PromptListItemProps> = ({ prompt }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleEdit = () => console.log(`Editing ${prompt.name}`);
  const handleDuplicate = () => {
    console.log(`Duplicating ${prompt.name}`);
    setIsMenuOpen(false);
  };
  const handleDelete = () => {
    console.log(`Deleting ${prompt.name}`);
    setIsMenuOpen(false);
  };

  return (
    <li className="
      flex items-center px-4 py-3 border-b border-border/80
      bg-card/70 hover:bg-card/80 transition-colors duration-150 text-sm
    ">
      <div className="flex-auto w-3/12 px-2 truncate">
        <span className="font-medium text-primary hover:text-primary/90" title={prompt.name}>
          {prompt.name}
        </span>
      </div>
      <div className="flex-auto w-2/12 px-2 text-center">
        <span className={`
          px-2.5 py-1 text-xs font-semibold rounded-full
          ${getStatusColorClasses(prompt.status)}
        `}>
          {prompt.status}
        </span>
      </div>
      <div className="flex-auto w-1/12 px-2 text-center text-muted-foreground">{prompt.version}</div>
      <div className="flex-auto w-2/12 px-2 text-center text-muted-foreground">{prompt.lastModified}</div>
      <div className="flex-auto w-2/12 px-2 text-center">
        {prompt.tags && prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-center">
            {prompt.tags.slice(0, 2).map(tag => (
              <span
                key={tag}
                className="px-1.5 py-0.5 text-xs bg-card/80 text-foreground rounded-md truncate"
                title={tag}
              >
                {tag}
              </span>
            ))}
            {prompt.tags.length > 2 && (
              <span
                className="px-1.5 py-0.5 text-xs bg-card/80 text-foreground rounded-md"
                title={prompt.tags.slice(2).join(', ')}
              >
                +{prompt.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="flex-auto w-2/12 px-2 text-right flex justify-end items-center space-x-1">
        <button
          onClick={handleEdit}
          aria-label={`Edit prompt ${prompt.name}`}
          className="
            p-1.5 text-muted-foreground
            hover:text-primary hover:bg-card/20
            rounded-md transition-colors
          "
          title="Edit Prompt"
        >
          <PencilIcon className="w-4 h-4" />
        </button>
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={`More actions for prompt ${prompt.name}`}
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
            className="
              p-1.5 text-muted-foreground
              hover:text-primary hover:bg-card/20
              rounded-md transition-colors
            "
            title="More actions"
          >
            <EllipsisVerticalIcon className="w-4 h-4" />
          </button>
          {isMenuOpen && (
            <div
              className="
                absolute right-0 mt-1 w-48
                bg-card rounded-md shadow-xl z-20
                ring-1 ring-border focus:outline-none
              "
              role="menu"
              aria-orientation="vertical"
              aria-labelledby={`options-menu-${prompt.id}`}
            >
              <div className="py-1" role="none">
                <button
                  onClick={handleDuplicate}
                  className="
                    w-full text-left flex items-center px-4 py-2 text-sm
                    text-foreground
                    hover:bg-card/20 hover:text-primary
                    transition-colors
                  "
                  role="menuitem"
                >
                  <DocumentDuplicateIcon className="w-4 h-4 mr-3 text-primary" />
                  Duplicate
                </button>
                <button
                  onClick={handleDelete}
                  className="
                    w-full text-left flex items-center px-4 py-2 text-sm
                    text-error
                    hover:bg-error/10 hover:text-error-foreground
                    transition-colors
                  "
                  role="menuitem"
                >
                  <TrashIcon className="w-4 h-4 mr-3" />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

const PromptManagementScreen: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPrompts = React.useMemo(() => {
    return samplePrompts.filter(prompt =>
      prompt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (prompt.tags && prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredPrompts.length / PROMPTS_PER_PAGE);
  const indexOfLastItem = currentPage * PROMPTS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - PROMPTS_PER_PAGE;
  const currentPrompts = filteredPrompts.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleCreateNewPrompt = () => {
    console.log('Create new prompt clicked');
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">Your Prompts</h2>
        <button
          onClick={handleCreateNewPrompt}
          className="
            flex-shrink-0 flex items-center justify-center px-6 py-3
            bg-primary text-primary-foreground rounded-lg shadow-md
            hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75
            transition-colors duration-200 font-medium text-base sm:w-auto
          "
          aria-label="Create a new prompt"
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 text-primary-foreground" />
          Create New Prompt
        </button>
      </div>

      {currentPrompts.length > 0 ? (
        <div className="bg-card/60 backdrop-blur-sm shadow-md rounded-lg overflow-hidden">
          <PromptListHeader />
          <ul className="divide-y divide-border/70">
            {currentPrompts.map(prompt => (
              <PromptListItem key={prompt.id} prompt={prompt} />
            ))}
          </ul>
        </div>
      ) : (
        <div className="
          text-center py-10 text-muted-foreground
          bg-card/70 backdrop-blur-md p-6 rounded-xl shadow-lg
          flex flex-col items-center justify-center min-h-[200px]
        ">
          <PromptSectionIcon className="w-16 h-16 text-muted-foreground mb-4" />
          {searchTerm
            ? 'No prompts found matching your search.'
            : 'No prompts available. Click "Create New Prompt" to get started.'}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 md:mt-12 flex items-center justify-center space-x-4 py-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="
              p-2 rounded-md
              bg-card/70 backdrop-blur-md shadow-md
              hover:bg-card/80 disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors
              text-foreground hover:text-primary
            "
            aria-label="Previous page of prompts"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <span className="text-foreground font-medium text-sm" aria-live="polite">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="
              p-2 rounded-md
              bg-card/70 backdrop-blur-md shadow-md
              hover:bg-card/80 disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors
              text-foreground hover:text-primary
            "
            aria-label="Next page of prompts"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
};

// SAMPLE DataSources and Tools (same as before)...

const sampleDataSources: DataSourceItem[] = Array.from({ length: 15 }, (_, i) => ({
  id: `ds${i + 1}`,
  name:
    i % 3 === 0
      ? `Product Manual v${i + 1}.pdf`
      : i % 3 === 1
        ? `Company Wiki - Section ${String.fromCharCode(65 + i)}`
        : `Support Tickets Q${(i % 4) + 1} Export.txt`,
  type: i % 3 === 0 ? 'PDF' : i % 3 === 1 ? 'Website' : 'Text File',
  status:
    ['Indexed', 'Processing', 'Failed', 'Pending', 'Available', 'Syncing'][i % 6] as DataSourceStatus,
  dateAdded: new Date(Date.now() - i * 1000 * 60 * 60 * 36).toLocaleDateString(),
  size: i % 2 === 0 ? `${(Math.random() * 20).toFixed(1)}MB` : undefined,
  itemCount: i % 2 !== 0 ? Math.floor(Math.random() * 200) + 10 : undefined,
}));

const knowledgeBaseTableHeaders: Array<{
  key: keyof DataSourceItem | 'actions';
  label: string;
  className?: string;
  render?: (item: DataSourceItem) => React.ReactNode;
}> = [
  { key: 'name', label: 'Name', className: 'w-4/12' },
  { key: 'type', label: 'Type', className: 'w-2/12 text-center' },
  { key: 'status', label: 'Status', className: 'w-2/12 text-center' },
  { key: 'dateAdded', label: 'Date Added', className: 'w-2/12 text-center' },
  {
    key: 'size',
    label: 'Size/Items',
    className: 'w-1/12 text-center',
    render: item =>
      item.size || (item.itemCount ? `${item.itemCount} items` : '-'),
  },
  { key: 'actions', label: 'Actions', className: 'w-1/12 text-right' },
];

const sampleTools: ToolItem[] = Array.from({ length: 12 }, (_, i) => ({
  id: `tool${i + 1}`,
  name: `API Connector ${String.fromCharCode(65 + i)}`,
  description: `Connects to external service ${String.fromCharCode(
    65 + i
  )}...`,
  category: ['API', 'Service', 'Plugin', 'Custom', 'Data Store'][
    i % 5
  ] as ToolCategory,
  status: ['Connected', 'Disconnected', 'Error', 'Pending Setup', 'Deprecated'][
    i % 5
  ] as ToolStatus,
  version: `v${i % 3 + 1}.${i % 2}.${i % 4}`,
  lastConnected: new Date(
    Date.now() - i * 1000 * 60 * 60 * 48
  ).toLocaleString(),
  tags: [
    `service-${String.fromCharCode(65 + i).toLowerCase()}`,
    ['beta', 'stable', 'alpha'][i % 3],
  ],
  owner: i % 2 === 0 ? 'System' : 'User: jane.doe',
}));

const toolTableHeaders: Array<{
  key: keyof ToolItem | 'actions';
  label: string;
  className?: string;
  render?: (item: ToolItem) => React.ReactNode;
}> = [
  { key: 'name', label: 'Tool Name', className: 'w-3/12' },
  { key: 'category', label: 'Category', className: 'w-2/12 text-center' },
  { key: 'status', label: 'Status', className: 'w-2/12 text-center' },
  { key: 'version', label: 'Version', className: 'w-1/12 text-center' },
  { key: 'lastConnected', label: 'Last Connected', className: 'w-2/12 text-center' },
  { key: 'actions', label: 'Actions', className: 'w-2/12 text-right' },
];

// Semantic header gradients:
const defaultHeaderBg = 'bg-gradient-to-r from-primary to-accent';
const moduleKitsHeaderBg = 'bg-gradient-to-br from-primary/80 via-accent/40 to-background/90';

const navContentConfig: Record<AiStudioNavId, AiStudioNavConfigEntry> = {
  dashboard: {
    navType: 'dashboardConfig',
    headerConfig: {
      title: 'AI Studio Dashboard',
      subtitle: 'Oversee your AI projects, models, and tools.',
      decorativeIcon: <SparklesIcon className="text-primary-foreground" />,
      backgroundColorClasses: defaultHeaderBg,
      showSearchBar: false,
    },
  },
  bots: {
    navType: 'botsConfig',
    Component: BotManagementScreen,
    headerConfig: {
      title: 'Bot Management',
      subtitle: 'Create, configure, and deploy intelligent bots.',
      decorativeIcon: <BotSectionIcon className="text-primary-foreground" />,
      backgroundColorClasses: defaultHeaderBg,
      showSearchBar: true,
      searchPlaceholder: 'Search bots by name, tag, or description...',
    },
  },
  createBot: { // New entry for Create Bot Screen
    navType: 'createBotConfig',
    Component: CreateBotForm,
    headerConfig: {
      title: 'Create New Bot',
      subtitle: 'Define the core properties and capabilities of your AI bot.',
      decorativeIcon: <PlusCircleIcon className="text-primary-foreground" />,
      backgroundColorClasses: defaultHeaderBg,
      showSearchBar: false, // Typically no search bar on a creation form
    },
  },
  prompts: {
    navType: 'promptsConfig',
    Component: PromptManagementScreen,
    headerConfig: {
      title: 'Prompt Library',
      subtitle: 'Curate and version control your AI prompts.',
      decorativeIcon: <PromptSectionIcon className="text-primary-foreground" />,
      backgroundColorClasses: defaultHeaderBg,
      showSearchBar: true,
      searchPlaceholder: 'Search prompts by title, tag, or content...',
    },
  },
  knowledgeBase: {
    navType: 'genericKitSection',
    setupTitle: 'Set up your Knowledge Base',
    setupDescription:
      'Connect documents, websites, and databases to provide relevant context for your AI models and bots.',
    featurePoints: [
      'Upload various file formats (PDF, DOCX, TXT).',
      'Crawl websites for up-to-date information.',
      'Connect to SQL and NoSQL databases.',
      'Automatic data indexing and vectorization.',
    ],
    primaryActionText: 'Add Data Source',
    existingItemsTitle: 'Your Data Sources',
    emptyStateText: 'No data sources found matching your search. Try a different query.',
    emptyStateSetupText: 'No data sources added yet. Start by adding one to fuel your AI.',
    headerConfig: {
      title: 'Knowledge Base',
      subtitle: 'Fuel your AI with comprehensive and up-to-date information.',
      decorativeIcon: <KnowledgeBaseIcon className="text-primary-foreground" />,
      backgroundColorClasses: defaultHeaderBg,
      showSearchBar: true,
      searchPlaceholder: 'Search data sources by name or type...',
    },
    dataItems: sampleDataSources,
    dataItemTableHeaders: knowledgeBaseTableHeaders,
    itemTypeForIcons: 'datasource',
    onEditItem: item => console.log('Edit KB item:', item.name),
    onDeleteItem: item => console.log('Delete KB item:', item.name),
  },
  tools: {
    navType: 'genericKitSection',
    setupTitle: 'Integrate your AI Tools',
    setupDescription:
      'Extend AI Studio capabilities by connecting external services, APIs, and custom tools.',
    featurePoints: [
      'Connect to popular AI/ML services (OpenAI, Hugging Face, etc.).',
      'Integrate with CRM and ERP systems.',
      'Build custom tool connectors.',
      'Manage API keys and authentication securely.',
    ],
    primaryActionText: 'Add New Tool/Integration',
    existingItemsTitle: 'Your Tools & Integrations',
    emptyStateText: 'No tools or integrations found matching your search.',
    emptyStateSetupText: "No tools or integrations added yet. Click 'Add New Tool' to get started.",
    headerConfig: {
      title: 'Tools & Integrations',
      subtitle: 'Connect and manage your ecosystem of AI services.',
      decorativeIcon: <ToolsSectionIcon className="text-primary-foreground" />,
      backgroundColorClasses: defaultHeaderBg,
      showSearchBar: true,
      searchPlaceholder: 'Search tools by name, category, or tag...',
    },
    dataItems: sampleTools,
    dataItemTableHeaders: toolTableHeaders,
    itemTypeForIcons: 'tool',
    onEditItem: item => console.log('Edit Tool:', item.name),
    onDeleteItem: item => console.log('Delete Tool:', item.name),
    onDuplicateItem: item => console.log('Duplicate Tool:', item.name),
  },
  moduleKits: {
    navType: 'moduleKitsAiStudioConfig',
    Component: ModuleKitScreen,
    propsForComponent: {
      moduleName: 'AI Studio',
      kitName: 'AI Studio Kit',
      featurePoints: [
        'Centralize common AI model configurations and pre-trained assets.',
        'Standardize prompt engineering templates for consistent outputs.',
        'Manage API keys and integrations for various AI services.',
        'Share and reuse AI workflows and pipelines across projects.',
      ],
      primaryAction: { text: 'Create AI Studio Kit', onClick: () => console.log('Create AI Studio Kit') },
      secondaryAction: { text: 'Learn more', onClick: () => console.log('Learn more about AI Studio Kits') },
    },
    headerConfig: {
      title: 'Module Kits',
      decorativeIcon: <RectangleStackIcon className="text-primary-foreground" />,
      backgroundColorClasses: moduleKitsHeaderBg,
      showSearchBar: true,
      searchPlaceholder: 'Search Module Kits...',
    },
  },
};

const WidgetCard: React.FC<{
  title?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactElement<{ className?: string }>;
  titleAction?: React.ReactNode;
}> = ({ title, children, className, icon, titleAction }) => (
  <div className={`bg-card/80 backdrop-blur-md p-6 rounded-xl shadow-lg ${className}`}>
    {title && (
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {icon &&
            React.cloneElement(icon, {
              className: 'w-6 h-6 text-primary mr-3',
            })}
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        </div>
        {titleAction}
      </div>
    )}
    {children}
  </div>
);

const ListItemAction: React.FC<{
  icon: React.ReactElement<{ className?: string }>;
  text: string;
  subtext?: string;
  actionIcon?: React.ReactElement<{ className?: string }>;
  tag?: string;
}> = ({ icon, text, subtext, actionIcon, tag }) => (
  <a
    href="#"
    className="
      flex items-center justify-between p-3 -mx-3 rounded-lg
      hover:bg-card/20 transition-colors duration-150 group
    "
  >
    <div className="flex items-center">
      {React.cloneElement(icon, {
        className: 'w-6 h-6 text-muted-foreground mr-4 group-hover:text-primary',
      })}
      <div>
        <span className="text-foreground font-medium group-hover:text-primary/90">
          {text}
        </span>
        {subtext && <p className="text-sm text-muted-foreground text-form-description">{subtext}</p>}
      </div>
    </div>
    <div className="flex items-center">
      {tag && (
        <span
          className={`
            mr-2 px-2 py-0.5 text-xs font-semibold rounded-full
            ${tag === 'New'
              ? 'bg-success/10 text-success-foreground'
              : 'bg-muted/10 text-muted-foreground'}
          `}
        >
          {tag}
        </span>
      )}
      {actionIcon &&
        React.cloneElement(actionIcon, {
          className: 'w-5 h-5 text-muted-foreground group-hover:text-primary',
        })}
    </div>
  </a>
);

const AiStudioDashboardContent: React.FC = () => {
  const userName = 'Tony';

  return (
    <>
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight mt-3">
            Welcome, {userName}!
          </h1>
          <p className="mt-1 text-md text-muted-foreground text-form-description">
            Arrange your workspace as you like.
          </p>
        </div>
        <button className="
          flex items-center px-4 py-2 bg-card border border-border text-foreground
          rounded-lg shadow-sm hover:bg-card/80 text-sm font-medium
        ">
          <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2 text-muted-foreground" />
          Customize Widgets
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WidgetCard className="md:col-span-2" icon={<SparklesIcon />}>
          <p className="text-muted-foreground text-form-description">
            Here's a quick overview of your workspace. You are doing great! Welcome back
            to AI Studio. You can customize this dashboard to fit your needs. Use the
            "Customize" button to add or remove widgets.
          </p>
        </WidgetCard>

        <WidgetCard title="Quick Actions" icon={<CommandLineIcon />}>
          <ul className="space-y-1">
            <li>
              <ListItemAction
                icon={<DocumentPlusIcon />}
                text="Request Module Access"
                actionIcon={<ChevronRightIcon />}
              />
            </li>
            <li>
              <ListItemAction
                icon={<UserCircleIcon />}
                text="View Your Profile"
                actionIcon={<ChevronRightIcon />}
              />
            </li>
            <li>
              <ListItemAction
                icon={<ChatBubbleLeftRightIcon />}
                text="Contact Support"
                actionIcon={<ChevronRightIcon />}
              />
            </li>
          </ul>
        </WidgetCard>

        <WidgetCard title="My Modules" icon={<CubeIcon />}>
          <p className="text-sm text-muted-foreground mb-3 text-form-description">Modules you have direct access to.</p>
          <ul className="space-y-1 max-h-48 overflow-y-auto">
            <li>
              <ListItemAction
                icon={<CommandLineIcon />}
                text="Finance Tools (Legacy)"
                actionIcon={<ChevronRightIcon />}
              />
            </li>
            <li>
              <ListItemAction
                icon={<BuildingStorefrontIcon />}
                text="Inventory Control (Legacy)"
                actionIcon={<ChevronRightIcon />}
              />
            </li>
            <li>
              <ListItemAction
                icon={<ChatBubbleLeftRightIcon />}
                text="CRM Platform (Legacy)"
                actionIcon={<ChevronRightIcon />}
              />
            </li>
            <li>
              <ListItemAction
                icon={<DocumentPlusIcon />}
                text="Request Access"
                actionIcon={<ChevronRightIcon />}
              />
            </li>
          </ul>
        </WidgetCard>

        <WidgetCard
          title="Notifications Preview"
          icon={<NotificationBellIcon />}
          titleAction={
            <a className="text-sm font-medium text-primary hover:text-primary/90 flex items-center">
              View all <ChevronRightIcon className="inline w-4 h-4 ml-1 text-primary" />
            </a>
          }
        >
          <p className="text-sm text-muted-foreground mb-3 text-form-description">
            You have 4 unread notifications.
          </p>
          <ul className="space-y-2">
            <li>
              <ListItemAction
                icon={<ShieldCheckIcon className="text-success" />}
                text="Access Granted"
                subtext="Your request for Finance Tools has been approved."
                tag="New"
                actionIcon={<ChevronRightIcon className="text-success" />}
              />
            </li>
            <li>
              <ListItemAction
                icon={<BotSectionIcon />}
                text="Bot Deployed"
                subtext="'Customer Service Bot v2' is now live."
              />
            </li>
          </ul>
        </WidgetCard>

        <WidgetCard title="Bot Activity" icon={<ArrowTrendingUpIcon />}>
          <p className="text-sm text-muted-foreground mb-2 text-form-description">
            Monthly bot interactions and active counts.
          </p>
          <div className="
            bg-card/80 p-4 rounded-lg min-h-[150px]
            flex items-center justify-center
          ">
            <p className="text-muted-foreground italic">Chart placeholder</p>
          </div>
        </WidgetCard>
      </div>
    </>
  );
};

const AiStudioDashboard: React.FC<AiStudioDashboardProps> = ({ activeNav }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navItemConfig = navContentConfig[activeNav];

  useEffect(() => {
    if (navItemConfig && !navItemConfig.headerConfig.showSearchBar) {
      setSearchTerm('');
    }
  }, [activeNav, navItemConfig]);

  let contentToRender: React.ReactNode;
  let currentHeaderConfig: HeaderConfig | undefined;

  if (!navItemConfig) {
    contentToRender = (
      <p className="text-xl text-error italic">
        Error: Invalid AI Studio navigation section selected.
      </p>
    );
    currentHeaderConfig = {
      title: 'Error',
      backgroundColorClasses: defaultHeaderBg,
      showSearchBar: false,
    };
  } else {
    currentHeaderConfig = navItemConfig.headerConfig;
    switch (navItemConfig.navType) {
      case 'dashboardConfig':
        contentToRender = <AiStudioDashboardContent />;
        break;
      case 'promptsConfig':
      case 'botsConfig':
        contentToRender = <navItemConfig.Component searchTerm={searchTerm} />;
        break;
      case 'createBotConfig': // Handle the new 'createBotConfig'
        contentToRender = <navItemConfig.Component />;
        break;
      case 'moduleKitsAiStudioConfig':
        contentToRender = (
          <navItemConfig.Component {...navItemConfig.propsForComponent} />
        );
        break;
      case 'genericKitSection':
        if (navItemConfig.itemTypeForIcons === 'datasource') {
          const config = navItemConfig as GenericKitSectionConfig<DataSourceItem>;
          contentToRender = (
            <GenericKitLikeContent<DataSourceItem>
              searchTerm={searchTerm}
              setupTitle={config.setupTitle}
              setupDescription={config.setupDescription}
              featurePoints={config.featurePoints}
              primaryActionText={config.primaryActionText}
              onPrimaryActionClick={() =>
                console.log(`Primary action for ${config.headerConfig.title}`)
              }
              existingItemsTitle={config.existingItemsTitle}
              emptyStateText={config.emptyStateText}
              emptyStateSetupText={config.emptyStateSetupText}
              emptyStateIcon={
                config.headerConfig.decorativeIcon || (
                  <KnowledgeBaseIcon className="w-16 h-16 text-muted-foreground mb-4" />
                )
              }
              dataItems={config.dataItems}
              dataItemTableHeaders={config.dataItemTableHeaders}
              itemTypeForIcons={config.itemTypeForIcons}
              onEditItem={config.onEditItem}
              onDuplicateItem={config.onDuplicateItem}
              onDeleteItem={config.onDeleteItem}
            />
          );
        } else if (navItemConfig.itemTypeForIcons === 'tool') {
          const config = navItemConfig as GenericKitSectionConfig<ToolItem>;
          contentToRender = (
            <GenericKitLikeContent<ToolItem>
              searchTerm={searchTerm}
              setupTitle={config.setupTitle}
              setupDescription={config.setupDescription}
              featurePoints={config.featurePoints}
              primaryActionText={config.primaryActionText}
              onPrimaryActionClick={() =>
                console.log(`Primary action for ${config.headerConfig.title}`)
              }
              existingItemsTitle={config.existingItemsTitle}
              emptyStateText={config.emptyStateText}
              emptyStateSetupText={config.emptyStateSetupText}
              emptyStateIcon={
                config.headerConfig.decorativeIcon || (
                  <ToolsSectionIcon className="w-16 h-16 text-muted-foreground mb-4" />
                )
              }
              dataItems={config.dataItems}
              dataItemTableHeaders={config.dataItemTableHeaders}
              itemTypeForIcons={config.itemTypeForIcons}
              onEditItem={config.onEditItem}
              onDuplicateItem={config.onDuplicateItem}
              onDeleteItem={config.onDeleteItem}
            />
          );
        } else {
          contentToRender = (
            <p className="text-xl text-error italic">
              Error: Invalid itemTypeForIcons in configuration.
            </p>
          );
          currentHeaderConfig = {
            title: 'Configuration Error',
            backgroundColorClasses: defaultHeaderBg,
            showSearchBar: false,
          };
        }
        break;
      default:
        // Exhaustive check
        const exhaustiveCheck: never = navItemConfig;
        console.error('AiStudioDashboard: Unhandled navType.', activeNav, exhaustiveCheck);
        contentToRender = (
          <p className="text-xl text-error italic">
            Configuration error for this section.
          </p>
        );
        currentHeaderConfig = {
          title: 'Error',
          backgroundColorClasses: defaultHeaderBg,
          showSearchBar: false,
        };
        break;
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden h-full">
      {currentHeaderConfig && (
        <AiStudioSectionHeader
          title={currentHeaderConfig.title}
          subtitle={currentHeaderConfig.subtitle}
          decorativeIcon={currentHeaderConfig.decorativeIcon}
          backgroundColorClasses={currentHeaderConfig.backgroundColorClasses}
          showSearchBar={currentHeaderConfig.showSearchBar}
          searchPlaceholder={currentHeaderConfig.searchPlaceholder}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      )}
      <main className="flex-1 overflow-y-auto"> {/* This makes the middle part scrollable */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-6 sm:pb-8 md:pb-10 lg:pb-12">
          {contentToRender}
        </div>
      </main>
      <footer className="
        shrink-0 p-2 sm:p-2 border-t border-border
        bg-background/80 backdrop-blur-sm text-center text-sm text-muted-foreground
      ">
        <p>&copy; {new Date().getFullYear()} AI Studio. All features at your fingertips.</p>
      </footer>
    </div>
  );
};

export default AiStudioDashboard;