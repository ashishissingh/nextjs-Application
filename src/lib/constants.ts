
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, UserCircle, Settings, Bell, LifeBuoy, FilePlus2, ShieldCheck, Palette, Languages, MessageSquare, Bot, Users, Building, PlusSquare, Briefcase, CalendarDays, Power, PowerOff, Send, Pencil, Trash2, Eye, Info, ClipboardList, Archive, Sparkles, ServerCog, CalendarClock, ScanSearch, Network, Container } from 'lucide-react';

// Route Paths
export const LOGIN_PATH = "/login";
export const SIGNUP_PATH = "/signup";
export const CHOOSE_ORGANIZATION_PATH = "/choose-organization";
export const DASHBOARD_PATH = "/dashboard";
export const ACCESS_REQUEST_PATH = "/dashboard/request-access";
export const PROFILE_PATH = "/dashboard/profile";
export const SETTINGS_PATH = "/dashboard/settings";
export const NOTIFICATIONS_PATH = "/dashboard/notifications";
export const CONTACT_SUPPORT_PATH = "/dashboard/contact-support";
export const FORGOT_PASSWORD_PATH = "/forgot-password";
export const TERMS_PATH = "/terms-of-service";
export const PRIVACY_POLICY_PATH = "/privacy-policy";


// New Admin Feature Paths
export const BOT_MANAGEMENT_PATH = "/dashboard/bot-management";
export const BOTS_PATH = "/bots";
export const AI_STUDIO_PATH = "/ai-studio";
export const CREATE_BOT_PATH = "/dashboard/create-bot"; // Also used for editing a bot via /dashboard/bot-management/edit/[botId]
export const MANAGE_ORGANIZATION_PATH = "/dashboard/manage-organization";
export const MANAGE_USERS_PATH = "/dashboard/manage-users";


// Organization
export interface Organization {
  id: string;
  name: string;
  CPO: string; // Chief Point of Contact
  address: string;
}
export const ORGANIZATIONS: Organization[] = [
  { id: "org1", name: "Axcess Tech Systems", CPO: "Pepper Potts", address: "1 Avengers Tower, New York, NY" },
  { id: "org2", name: "Amazon Web Services (AWS)", CPO: "Lucius Fox", address: "1007 Mountain Drive, Gotham City" },
  { id: "org3", name: "Amazon", CPO: "Norman Osborn", address: "Oscorp Tower, New York, NY" },
];

// Modules
export interface AppModule {
  id: string;
  name: string;
  description: string;
  icon?: LucideIcon;
  path: string;
  adminOnly?: boolean;
}

export const BOT_MANAGEMENT_MODULE_ID = "bot_management";
export const GENAI_MODULE_ID = "genai_module";
export const ASSET_MODULE_ID = "asset_module";
export const ASSESSMENT_MODULE_ID = "assessment_module";
export const K8S_MANAGEMENT_MODULE_ID = "k8s_management_module";
export const MEETING_MODULE_ID = "meeting_module";
export const RESUMESCANNER_MODULE_ID = "resumescanner_module";
export const URLMONITORING_MODULE_ID = "urlmonitoring_module";


export const AVAILABLE_MODULES: AppModule[] = [
  { id: ASSESSMENT_MODULE_ID, name: "Assessment", description: "Conduct and manage assessments and evaluations.", icon: ClipboardList, path: "/dashboard/assessment" },
  { id: ASSET_MODULE_ID, name: "Asset", description: "Track and manage organizational assets and resources.", icon: Archive, path: "/dashboard/asset" },
  { id: GENAI_MODULE_ID, name: "GenAI", description: "Leverage generative AI capabilities and tools.", icon: Sparkles, path: "/dashboard/genai" },
  { id: K8S_MANAGEMENT_MODULE_ID, name: "K8s Management", description: "Manage and monitor Kubernetes clusters.", icon: ServerCog, path: "/dashboard/k8s-management" },
  { id: MEETING_MODULE_ID, name: "Meeting", description: "Schedule and manage meetings and calendars.", icon: CalendarClock, path: "/dashboard/meeting" },
  { id: RESUMESCANNER_MODULE_ID, name: "ResumeScanner", description: "Scan and analyze resumes efficiently.", icon: ScanSearch, path: "/dashboard/resume-scanner" },
  { id: URLMONITORING_MODULE_ID, name: "UrlMonitoring", description: "Monitor website and URL availability and performance.", icon: Network, path: "/dashboard/url-monitoring" },
  { id: BOT_MANAGEMENT_MODULE_ID, name: "Bot Management", description: "Oversee and configure your automated agents.", icon: Bot, path: BOT_MANAGEMENT_PATH, adminOnly: true },
  { id: "hr", name: "HR Management (Legacy)", description: "Manage employee data, payroll, and recruitment processes.", icon: Briefcase, path: "/dashboard/hr" },
  { id: "finance", name: "Finance Tools (Legacy)", description: "Access financial reports, budgeting, and forecasting tools.", icon: LayoutDashboard, path: "/dashboard/finance" },
  { id: "inventory", name: "Inventory Control (Legacy)", description: "Track and manage product inventory levels and stock movements.", icon: Container, path: "/dashboard/inventory" },
  { id: "crm", name: "CRM Platform (Legacy)", description: "Customer relationship management, sales tracking, and support.", icon: MessageSquare, path: "/dashboard/crm" },
];

// Sidebar Navigation
export interface NavItem {
  title: string;
  path: string;
  icon: LucideIcon;
  children?: NavItem[];
  adminOnly?: boolean;
}

export const DASHBOARD_NAV_ITEMS: NavItem[] = [
  { title: "Dashboard", path: DASHBOARD_PATH, icon: LayoutDashboard },
  { title: "Notifications", path: NOTIFICATIONS_PATH, icon: Bell },
  { title: "Request Access", path: ACCESS_REQUEST_PATH, icon: FilePlus2 },
  // Admin Specific Routes
  { title: "Bot Management", path: BOT_MANAGEMENT_PATH, icon: Bot, adminOnly: true },
  { title: "Manage Organization", path: MANAGE_ORGANIZATION_PATH, icon: Building, adminOnly: true },
  { title: "Manage Users", path: MANAGE_USERS_PATH, icon: Users, adminOnly: true },
  // General Routes
  { title: "Contact Support", path: CONTACT_SUPPORT_PATH, icon: LifeBuoy },
];

// User Data
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  organization: string;
  organizationId: string;
  avatarUrl?: string;
  accessibleModules: string[];
  role: 'admin' | 'user';
  jobTitle?: string;
  department?: string;
}

export const MOCK_USER: UserProfile = {
  id: "user123",
  name: "Tony Stark",
  email: "tony@stark.com",
  organization: "Axcess Tech Systems",
  organizationId: "org1",
  avatarUrl: "https://placehold.co/100x100.png",
  accessibleModules: AVAILABLE_MODULES.map(m => m.id),
  role: "admin",
  jobTitle: "CEO",
  department: "Research and Development",
};

export type UserStatus = 'active' | 'invited' | 'inactive';
export interface OrganizationUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  jobTitle?: string;
  status: UserStatus;
  lastLogin: string;
  accessibleModules: string[];
}

export const MOCK_ORGANIZATION_USERS: OrganizationUser[] = [
  { ...MOCK_USER, status: 'active', lastLogin: "2024-07-29T08:00:00Z", accessibleModules: AVAILABLE_MODULES.map(m => m.id) },
  { id: "user002", name: "Pepper Potts", email: "pepper@stark.com", role: "admin", jobTitle: "CPO", status: "active", lastLogin: "2024-07-28T10:00:00Z", accessibleModules: AVAILABLE_MODULES.map(m => m.id) },
  { id: "user003", name: "James Rhodes", email: "rhodey@stark.com", role: "user", jobTitle: "Pilot", status: "active", lastLogin: "2024-07-27T14:30:00Z", accessibleModules: [AVAILABLE_MODULES.find(m => m.name === 'Inventory Control (Legacy)')!.id, ASSET_MODULE_ID] },
  { id: "user004", name: "Happy Hogan", email: "happy@stark.com", role: "user", jobTitle: "Head of Security", status: "invited", lastLogin: "", accessibleModules: [] },
  { id: "user005", name: "Natasha Romanoff", email: "natasha@stark.com", role: "user", jobTitle: "Special Ops", status: "inactive", lastLogin: "2024-07-01T12:00:00Z", accessibleModules: [AVAILABLE_MODULES.find(m => m.name === 'CRM Platform (Legacy)')!.id, GENAI_MODULE_ID] },
];


// Mock Notifications
export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  status: "read" | "unread";
  type: "System" | "Access" | "Alert" | "Bot";
  icon?: LucideIcon;
}

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  { id: "1", title: "Access Granted", message: "Your request for Finance Tools has been approved.", date: "2024-07-28T10:00:00Z", status: "unread", type: "Access", icon: ShieldCheck },
  { id: "2", title: "System Update", message: "Scheduled maintenance on July 30th, 2 AM.", date: "2024-07-27T15:30:00Z", status: "unread", type: "System", icon: Settings },
  { id: "3", title: "Password Changed", message: "Your password was successfully changed.", date: "2024-07-26T09:15:00Z", status: "read", type: "Alert", icon: UserCircle },
  { id: "4", title: "New Feature: Dark Mode", message: "Explore the new Dark Mode in settings.", date: "2024-07-25T11:00:00Z", status: "read", type: "System", icon: Palette },
  { id: "5", title: "New Bot Deployed", message: "Bot 'AutoResponder-001' is now active.", date: "2024-07-29T11:00:00Z", status: "unread", type: "Bot", icon: Bot },
  { id: "6", title: "GenAI Module Access", message: "You now have access to the GenAI module.", date: "2024-07-30T10:00:00Z", status: "unread", type: "Access", icon: Sparkles },
];

// Settings
export const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "es", label: "Español (Spanish)" },
  { value: "fr", label: "Français (French)" },
  { value: "kn", label: "ಕನ್ನಡ (Kannada)" },
  { value: "hi", label: "हिन्दी (Hindi)" },
  { value: "ml", label: "മലയാളം (Malayalam)" },
  { value: "ta", label: "தமிழ் (Tamil)" },
];

// Contact Support
export const SUPPORT_EMAIL = "support@axcess.io";
export const SUPPORT_PHONE = "+1 (800) 555-0199";
export const FAQ_URL = "/faq";
export const DOCUMENTATION_URL = "/docs";

const modulesToDisplayOnDashboard = [
  BOT_MANAGEMENT_MODULE_ID,
  GENAI_MODULE_ID,
  ASSET_MODULE_ID,
];

export const MOCK_MODULES_ACCESSIBLE_BY_USER: AppModule[] = AVAILABLE_MODULES.filter(
  (module) =>
    MOCK_USER.accessibleModules.includes(module.id) &&
    modulesToDisplayOnDashboard.includes(module.id)
);


// Bot Management
export type BotType = 'Chatbot' | 'Automation' | 'DataCollector';
export type BotStatus = 'active' | 'inactive' | 'draft' | 'error';

export const BOT_TYPES: { value: BotType, label: string }[] = [
    { value: "Chatbot", label: "Chatbot (Conversational AI)" },
    { value: "Automation", label: "Automation (Task-based)" },
    { value: "DataCollector", label: "Data Collector (Information Gathering)" },
];

export const BOT_STATUSES: { value: BotStatus, label: string, icon?: LucideIcon, color?: string }[] = [
    { value: "active", label: "Active", icon: Power, color: "text-green-500" },
    { value: "inactive", label: "Inactive", icon: PowerOff, color: "text-red-500" },
    { value: "draft", label: "Draft", icon: Pencil, color: "text-yellow-500" },
    { value: "error", label: "Error", icon: ShieldCheck, color: "text-destructive" },
];


export interface BotInstance {
  id: string;
  name: string;
  description: string;
  type: BotType;
  status: BotStatus;
  creationDate: string;
  lastModified: string;
  creatorId: string;
  model?: string;
  instructions?: string;
  operatingMode?: 'rag' | 'agentic';
  agentRole?: 'standalone' | 'supervisor' | 'subAgent';
  isAgent?: boolean;
  isSubAgent?: boolean;
  selectedTools?: string[];
  selectedSubAgents?: string[];
  inputGuardrail?: string;
  outputGuardrail?: string;
  enableReRanking?: boolean;
  retrievedContextCitation?: boolean;
  enableAdvancedConfigurations?: boolean;
  generationConfigTemperature?: number;
  maxOutputTokens?: number;
  topK?: number;
  topP?: number;
  endSequence?: string;
  embeddingModel?: string;
  chunkSize?: number;
  chunkOverlap?: number;
  enableDetailedPdfAnalysis?: boolean;
  searchStrategy?: string;
  maxResults?: number;
  consolidateSearchResultsBySource?: boolean;
}

export const MOCK_BOT_INSTANCES: BotInstance[] = [
  { id: "bot001", name: "Customer Service Bot Mk II", description: "Handles tier 1 customer inquiries via chat.", type: "Chatbot", status: "active", creationDate: "2024-06-15T00:00:00Z", lastModified: "2024-07-20T00:00:00Z", creatorId: "user002" },
  { id: "bot002", name: "Inventory Sync Bot", description: "Syncs inventory data with external warehouses hourly.", type: "Automation", status: "active", creationDate: "2024-05-10T00:00:00Z", lastModified: "2024-07-25T00:00:00Z", creatorId: MOCK_USER.id },
  { id: "bot003", name: "Lead Capture Bot (Website)", description: "Collects leads from the main website contact form.", type: "DataCollector", status: "inactive", creationDate: "2024-07-01T00:00:00Z", lastModified: "2024-07-10T00:00:00Z", creatorId: "user003" },
  { id: "bot004", name: "AxcessBot", description: "Internal platform assistance chatbot.", type: "Chatbot", status: "active", creationDate: "2024-07-28T00:00:00Z", lastModified: "2024-07-29T00:00:00Z", creatorId: MOCK_USER.id },
  { id: "bot005", name: "HR Onboarding Helper (Draft)", description: "Guides new employees through onboarding tasks.", type: "Chatbot", status: "draft", creationDate: "2024-07-29T00:00:00Z", lastModified: "2024-07-29T00:00:00Z", creatorId: MOCK_USER.id },
];

// Icons mapping for dynamic use in tables etc.
export const USER_STATUS_ICONS: Record<UserStatus, LucideIcon> = {
    active: Power,
    inactive: PowerOff,
    invited: Send,
};

export const BOT_STATUS_ICONS: Record<BotStatus, LucideIcon> = {
    active: Power,
    inactive: PowerOff,
    draft: Pencil,
    error: ShieldCheck,
};

export const BOT_TYPE_ICONS: Record<BotType, LucideIcon> = {
    Chatbot: Bot,
    Automation: Settings,
    DataCollector: FilePlus2,
};

export const USER_ROLE_ICONS: Record<'admin' | 'user', LucideIcon> = {
    admin: UserCircle,
    user: UserCircle,
};

export const ACTION_ICONS = {
    Edit: Pencil,
    Delete: Trash2,
    View: Eye,
    Settings: Settings,
    Activate: Power,
    Deactivate: PowerOff,
    ResendInvite: Send,
    ToggleOn: Power,
    ToggleOff: PowerOff,
};

export const SUPERHERO_ADMINS = [
  { id: "admin_cap", name: "Captain America" },
  { id: "admin_ironman", name: "Iron Man (Tony Stark)" },
  { id: "admin_widow", name: "Black Widow (Natasha Romanoff)" },
  { id: "admin_thor", name: "Thor Odinson" },
  { id: "admin_hulk", name: "Hulk (Bruce Banner)" },
];

// New constants for CreateBotForm
export const AVAILABLE_LLM_MODELS = [
    { value: "gemini-1.5-flash-latest", label: "Gemini 1.5 Flash (Latest)" },
    { value: "gemini-1.5-pro-latest", label: "Gemini 1.5 Pro (Latest)" },
    { value: "gemini-1.0-pro", label: "Gemini 1.0 Pro" },
    { value: "gemini-pro", label: "Gemini Pro (General)" },
    { value: "text-bison-001", label: "Text Bison (PaLM 2)" },
    { value: "chat-bison-001", label: "Chat Bison (PaLM 2)" },
];

export const GUARDRAIL_OPTIONS = [
  { value: "none", label: "None" },
  { value: "axcess-basic", label: "Axcess Basic Content Filter" },
  { value: "harm-block-only", label: "Harm Block Only (Gemini)" },
  { value: "custom-strict", label: "Custom Strict Policy" },
];

export const AVAILABLE_BOT_TOOLS = [
  { id: 'query_knowledge_base', label: 'Query Knowledge Base' },
  { id: 'get_object_from_storage', label: 'Get Object From Storage' },
  { id: 'list_stored_objects', label: 'List Stored Objects' },
  { id: 'send_email', label: 'Send Email' },
  { id: 'query_database', label: 'Query Database' },
  { id: 'generate_text_to_sql', label: 'Generate Text To SQL' },
];

export const AVAILABLE_SUB_AGENTS = [
  { id: 'data_retrieval_agent', label: 'Data Retrieval Sub-Agent' },
  { id: 'user_auth_agent', label: 'User Authentication Sub-Agent' },
  { id: 'notification_agent', label: 'Notification Sub-Agent' },
  { id: 'content_moderation_agent', label: 'Content Moderation Sub-Agent' },
];
