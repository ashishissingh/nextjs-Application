import React, { useState } from 'react';
import type { K8sNavId } from './K8sSidebar';
import ModuleKitScreen from '../shared/ModuleKitScreen'; 
import SectionBanner from '../shared/SectionBanner';
import ScreenSearchBarHeader from '../shared/ScreenSearchBarHeader';

import { 
  AdjustmentsHorizontalIcon, 
  CommandLineIcon, 
  ArrowTrendingUpIcon,
  BellIcon as NotificationBellIcon,
  DocumentPlusIcon,
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  ServerStackIcon, 
  CpuChipIcon,     
  ChevronRightIcon,
  HomeIcon,
  RocketLaunchIcon, 
  WrenchScrewdriverIcon,
  IdentificationIcon,
} from '../../../constants';

interface K8sDashboardProps {
  activeNav: K8sNavId;
}

const WidgetCard: React.FC<{title?: string, children: React.ReactNode, className?: string, icon?: React.ReactElement<{ className?: string }>, titleAction?: React.ReactNode}> = ({ title, children, className, icon, titleAction }) => (
  <div className={`bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg ${className}`}>
    {title && (
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {icon && React.cloneElement(icon, { className: "w-6 h-6 text-blue-600 mr-3" })}
          <h2 className="text-xl font-semibold text-slate-700">{title}</h2>
        </div>
        {titleAction}
      </div>
    )}
    {children}
  </div>
);

const ListItemAction: React.FC<{icon: React.ReactElement<{ className?: string }>, text: string, subtext?: string, actionIcon?: React.ReactElement<{ className?: string }>, tag?: string }> = ({ icon, text, subtext, actionIcon, tag }) => (
  <a href="#" className="flex items-center justify-between p-3 -mx-3 rounded-lg hover:bg-slate-100 transition-colors duration-150 group">
    <div className="flex items-center">
      {React.cloneElement(icon, { className: "w-6 h-6 text-slate-500 mr-4 group-hover:text-blue-600" })}
      <div>
        <span className="text-slate-700 font-medium group-hover:text-blue-700">{text}</span>
        {subtext && <p className="text-sm text-slate-500">{subtext}</p>}
      </div>
    </div>
    <div className="flex items-center">
      {tag && <span className={`mr-2 px-2 py-0.5 text-xs font-semibold rounded-full ${tag === 'Healthy' ? 'bg-green-100 text-green-700' : tag === 'Warning' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-600'}`}>{tag}</span>}
      {actionIcon && React.cloneElement(actionIcon, { className: "w-5 h-5 text-slate-400 group-hover:text-blue-600"})}
    </div>
  </a>
);

const K8sDashboardMainContent: React.FC = () => {
  const userName = "Operator"; 
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 sm:p-8 md:p-10 lg:p-12">
      <ScreenSearchBarHeader 
        placeholderText="Search K8s dashboard resources..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex justify-between items-center mb-6 md:mb-8 mt-6"> {/* Added mt-6 for spacing after search bar */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
            Kubernetes Dashboard
          </h1>
          <p className="mt-1 text-lg text-slate-600">
            Welcome, {userName}! Overview of your Kubernetes clusters.
          </p>
        </div>
        <button className="flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 text-sm font-medium">
          <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2 text-slate-500" />
          Customize View
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WidgetCard className="md:col-span-2" icon={<HomeIcon />} title={`Cluster Overview`}>
          <p className="text-slate-600">
            Summary of your cluster health and resources. All systems nominal.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div><strong className="text-slate-700">Total Clusters:</strong> 3</div>
            <div><strong className="text-slate-700">Healthy Clusters:</strong> 3</div>
            <div><strong className="text-slate-700">Total Nodes:</strong> 12</div>
            <div><strong className="text-slate-700">Active Deployments:</strong> 25</div>
          </div>
        </WidgetCard>

        <WidgetCard title="Quick Links" icon={<CommandLineIcon />}>
          <ul className="space-y-1">
            <li><ListItemAction icon={<ServerStackIcon />} text="Manage Clusters" actionIcon={<ChevronRightIcon />} /></li>
            <li><ListItemAction icon={<CpuChipIcon />} text="View Node Status" actionIcon={<ChevronRightIcon />} /></li>
            <li><ListItemAction icon={<RocketLaunchIcon />} text="Inspect Deployments" actionIcon={<ChevronRightIcon />} /></li>
            <li><ListItemAction icon={<DocumentPlusIcon />} text="Add New Cluster" actionIcon={<ChevronRightIcon />} /></li>
          </ul>
        </WidgetCard>

        <WidgetCard title="Active Clusters" icon={<ServerStackIcon />}>
         <p className="text-sm text-slate-500 mb-3">Directly accessible clusters.</p>
          <ul className="space-y-1 max-h-48 overflow-y-auto">
            <li><ListItemAction icon={<ServerStackIcon />} text="Production Cluster A" subtext="Region: us-east-1" tag="Healthy" actionIcon={<ChevronRightIcon />} /></li>
            <li><ListItemAction icon={<ServerStackIcon />} text="Staging Cluster B" subtext="Region: eu-west-1" tag="Healthy" actionIcon={<ChevronRightIcon />} /></li>
            <li><ListItemAction icon={<ServerStackIcon />} text="Dev Cluster C" subtext="Region: us-west-2" tag="Warning" actionIcon={<ChevronRightIcon />} /></li>
          </ul>
        </WidgetCard>
        
        <WidgetCard 
          title="Recent Alerts" 
          icon={<NotificationBellIcon />}
          titleAction={<a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800">View all <ChevronRightIcon className="inline w-4 h-4" /></a>}
        >
          <p className="text-sm text-slate-500 mb-3">You have 2 active alerts.</p>
          <ul className="space-y-2">
            <li>
              <ListItemAction 
                icon={<CpuChipIcon className="text-yellow-500" />} 
                text="High CPU Usage" 
                subtext="Node 'worker-3' in Prod Cluster A at 90%"
                tag="Warning"
                actionIcon={<ChevronRightIcon className="text-yellow-500" />}
              />
            </li>
             <li>
              <ListItemAction 
                icon={<RocketLaunchIcon />} 
                text="Deployment Scaled" 
                subtext="'WebApp v3' scaled to 5 pods."
              />
            </li>
          </ul>
        </WidgetCard>

        <WidgetCard title="Resource Utilization" icon={<ArrowTrendingUpIcon />}>
          <p className="text-sm text-slate-500 mb-2">CPU, Memory, and Disk usage across clusters.</p>
          <div className="bg-slate-100 p-4 rounded-lg min-h-[150px] flex items-center justify-center">
            <p className="text-slate-400 italic">Resource charts placeholder</p>
          </div>
        </WidgetCard>
      </div>
    </div>
  );
};

interface K8sMainDashboardViewConfig {
  navType: 'k8sMainDashboardViewConfig';
  Component: React.FC;
}

interface K8sGenericPlaceholderViewConfig {
  navType: 'k8sGenericPlaceholderViewConfig';
  title: string;
  description: string;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
}

interface K8sModuleKitsViewConfig {
  navType: 'k8sModuleKitsViewConfig';
  Component: React.FC<any>; 
  props: any; 
}

type K8sNavConfigEntry = 
  | K8sMainDashboardViewConfig 
  | K8sGenericPlaceholderViewConfig 
  | K8sModuleKitsViewConfig;

const navContentConfig: Record<K8sNavId, K8sNavConfigEntry> = {
  k8sDashboard: { 
    navType: 'k8sMainDashboardViewConfig', 
    Component: K8sDashboardMainContent 
  },
  clusters: { 
    navType: 'k8sGenericPlaceholderViewConfig', 
    title: "Cluster Management", 
    description: "View and manage your Kubernetes clusters.",
    icon: <ServerStackIcon />
  },
  nodes: { 
    navType: 'k8sGenericPlaceholderViewConfig', 
    title: "Node Management", 
    description: "Inspect and manage nodes within your clusters.",
    icon: <CpuChipIcon /> 
  },
  deployments: { 
    navType: 'k8sGenericPlaceholderViewConfig', 
    title: "Deployment Overview", 
    description: "Track and manage your application deployments.",
    icon: <RocketLaunchIcon />
  },
  services: { 
    navType: 'k8sGenericPlaceholderViewConfig', 
    title: "Service Catalog", 
    description: "Discover and manage services running in your clusters.",
    icon: <WrenchScrewdriverIcon />
  },
  monitoring: { 
    navType: 'k8sGenericPlaceholderViewConfig', 
    title: "Cluster Monitoring", 
    description: "Monitor health and performance metrics of your clusters.",
    icon: <ArrowTrendingUpIcon />
  },
  moduleKits: { 
    navType: 'k8sModuleKitsViewConfig',
    Component: ModuleKitScreen,
    props: {
        moduleName: "K8s Management",
        kitName: "K8s Config Kit",
        bannerText: "K8s Config Kits",
        bannerIcon: <CommandLineIcon />,
        featurePoints: [
            "Define standardized cluster configurations for different environments (dev, staging, prod).",
            "Store and manage common YAML manifests and Helm charts.",
            "Version control your infrastructure-as-code templates.",
            "Quickly bootstrap new clusters with pre-defined settings."
        ],
        primaryAction: { text: "Create K8s Config Kit", onClick: () => console.log("Create K8s Kit") },
        secondaryAction: { text: "Learn more", onClick: () => console.log("Learn more about K8s Kits") },
    },
  },
};


const K8sDashboard: React.FC<K8sDashboardProps> = ({ activeNav }) => {
  const navItemConfig = navContentConfig[activeNav];

  let contentToRender: React.ReactNode;

  if (!navItemConfig) {
    contentToRender = <p className="text-xl text-red-500 italic p-6 sm:p-8 md:p-10 lg:p-12">Error: Invalid K8s navigation section selected.</p>;
  } else {
    switch (navItemConfig.navType) {
      case 'k8sMainDashboardViewConfig':
        contentToRender = <navItemConfig.Component />;
        break;
      case 'k8sModuleKitsViewConfig':
        contentToRender = <navItemConfig.Component {...navItemConfig.props} />;
        break;
      case 'k8sGenericPlaceholderViewConfig':
        contentToRender = (
          <div className="p-6 sm:p-8 md:p-10 lg:p-12">
            <SectionBanner 
                title={navItemConfig.title} 
                subtitle={navItemConfig.description} 
                iconElement={navItemConfig.icon ? React.cloneElement(navItemConfig.icon, {className: "w-16 h-16 sm:w-20 sm:h-20 text-white/50 opacity-75 hidden md:block"}) : <CommandLineIcon className="w-16 h-16 sm:w-20 sm:h-20 text-white/50 opacity-75 hidden md:block" />}
            />
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl min-h-[300px] flex items-center justify-center mt-8">
              <p className="text-xl text-slate-500 italic">
                Content for {navItemConfig.title.toLowerCase()} will appear here.
              </p>
            </div>
          </div>
        );
        break;
      default:
        console.error("K8sDashboard: Unhandled navType or configuration structure.", activeNav, navItemConfig);
        contentToRender = <p className="text-xl text-red-500 italic p-6">Configuration error for this section.</p>;
        break;
    }
  }
  
  return (
    <div className="flex-1 bg-slate-100/70 flex flex-col overflow-hidden h-full">
      <main className="flex-1 overflow-y-auto">
        {contentToRender}
      </main>
      <footer className="p-2 sm:p-2 border-t border-slate-200 bg-slate-50/50 text-center text-sm text-slate-600">
        <p>&copy; {new Date().getFullYear()} K8s Management. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default K8sDashboard;
