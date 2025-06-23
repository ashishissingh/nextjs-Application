import React, { useState, useMemo, useEffect, useRef } from 'react';
import { CheckIcon, ChevronRightIcon, ChevronLeftIcon, PlusCircleIcon, CubeIcon, FolderOpenIcon, DocumentTextIcon, GlobeAltIcon, PencilIcon, DocumentDuplicateIcon, TrashIcon, EllipsisVerticalIcon } from '../../../constants'; 
import type { DataSourceItem, DataSourceType, DataSourceStatus, ToolItem, ToolStatus, ToolCategory } from '../../../types'; // Import types

// ItemType is either DataSourceItem or ToolItem
type ItemType = DataSourceItem | ToolItem;

const ITEMS_PER_PAGE = 8; // Default items per page for pagination

// Helper function to get an icon based on data source type
const getDataSourceTypeIcon = (type: DataSourceType): React.ReactElement => {
  switch (type) {
    case 'PDF': return <DocumentTextIcon className="w-5 h-5 text-red-500" />;
    case 'Website': return <GlobeAltIcon className="w-5 h-5 text-blue-500" />;
    case 'Document': return <DocumentTextIcon className="w-5 h-5 text-sky-500" />;
    case 'Text File': return <DocumentTextIcon className="w-5 h-5 text-slate-500" />;
    case 'Database': return <CubeIcon className="w-5 h-5 text-green-500" />;  
    case 'API': return <CubeIcon className="w-5 h-5 text-purple-500" />; // Example API icon
    default: return <FolderOpenIcon className="w-5 h-5 text-slate-400" />;
  }
};

const getToolCategoryIcon = (category: ToolCategory): React.ReactElement => {
    switch (category) {
        case 'API': return <CubeIcon className="w-5 h-5 text-blue-500" />;
        case 'Service': return <FolderOpenIcon className="w-5 h-5 text-green-500" />;
        case 'Plugin': return <ChevronRightIcon className="w-5 h-5 text-purple-500" />; // Placeholder
        case 'Custom': return <PencilIcon className="w-5 h-5 text-yellow-500" />;
        case 'Data Store': return <CubeIcon className="w-5 h-5 text-indigo-500" />;
        default: return <FolderOpenIcon className="w-5 h-5 text-slate-400" />;
    }
};

const getStatusColorClasses = (status: DataSourceStatus | ToolStatus): string => {
  switch (status) {
    case 'Indexed':
    case 'Available':
    case 'Connected':
      return 'bg-blue-100 text-blue-700';
    case 'Pending':
    case 'Pending Setup':
      return 'bg-slate-100 text-slate-600';
    case 'Processing':
    case 'Syncing':
      return 'bg-yellow-100 text-yellow-700';
    case 'Failed':
    case 'Error':
    case 'Disconnected':
      return 'bg-red-100 text-red-700';
    case 'Deprecated':
        return 'bg-orange-100 text-orange-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

interface ListItemMenuProps {
  itemId: string;
  itemName: string;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
}

const ListItemMenu: React.FC<ListItemMenuProps> = ({ itemId, itemName, onEdit, onDuplicate, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div ref={menuRef} className="relative">
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={`More actions for ${itemName}`}
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        className="p-1.5 text-slate-500 hover:text-purple-600 hover:bg-slate-200/70 rounded-md transition-colors"
        title="More actions"
      >
        <EllipsisVerticalIcon className="w-4 h-4" />
      </button>
      {isMenuOpen && (
        <div 
          className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-xl z-20 ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu" 
          aria-orientation="vertical" 
          aria-labelledby={`options-menu-${itemId}`}
        >
          <div className="py-1" role="none">
            {onEdit && <button onClick={() => { onEdit(); setIsMenuOpen(false); }} className="w-full text-left flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-purple-600 transition-colors" role="menuitem"><PencilIcon className="w-4 h-4 mr-3" />Edit</button>}
            {onDuplicate && <button onClick={() => { onDuplicate(); setIsMenuOpen(false); }} className="w-full text-left flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-purple-600 transition-colors" role="menuitem"><DocumentDuplicateIcon className="w-4 h-4 mr-3" />Duplicate</button>}
            {onDelete && <button onClick={() => { onDelete(); setIsMenuOpen(false); }} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors" role="menuitem"><TrashIcon className="w-4 h-4 mr-3" />Delete</button>}
          </div>
        </div>
      )}
    </div>
  );
};

interface GenericKitLikeContentProps<T extends ItemType> {
  setupTitle: string;
  setupDescription: string;
  featurePoints: string[];
  primaryActionText: string;
  onPrimaryActionClick: () => void;
  primaryActionIcon?: React.ReactElement<{ className?: string }>;
  secondaryActionText?: string;
  onSecondaryActionClick?: () => void;
  existingItemsTitle: string;
  emptyStateText: string; // Used when filtered items are empty but original dataItems were not
  emptyStateSetupText: string; // Used when no dataItems were initially provided
  emptyStateIcon?: React.ReactElement<{ className?: string }>;
  
  searchTerm?: string; // For filtering dataItems
  itemsPerPage?: number;

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
  itemTypeForIcons?: 'datasource' | 'tool'; 
}

const GenericKitLikeContent = <T extends ItemType>({
  setupTitle,
  setupDescription,
  featurePoints,
  primaryActionText,
  onPrimaryActionClick,
  primaryActionIcon,
  secondaryActionText,
  onSecondaryActionClick,
  existingItemsTitle,
  emptyStateText,
  emptyStateSetupText,
  emptyStateIcon,
  searchTerm = '',
  itemsPerPage = ITEMS_PER_PAGE,
  dataItems,
  dataItemTableHeaders,
  onEditItem,
  onDuplicateItem,
  onDeleteItem,
  itemTypeForIcons,
}: GenericKitLikeContentProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    if (!dataItems) return [];
    return dataItems.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const descMatch = (item as any).description?.toLowerCase().includes(searchTerm.toLowerCase());
      const tagsMatch = (item as any).tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return nameMatch || descMatch || tagsMatch;
    });
  }, [dataItems, searchTerm]);

  useEffect(() => { 
    setCurrentPage(1);
  }, [searchTerm, dataItems]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDisplayItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const showDataList = dataItems && dataItems.length > 0;

  return (
    <div className="p-0">
      {showDataList ? (
        // Data List View
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800">{existingItemsTitle}</h2>
            <button
              onClick={onPrimaryActionClick}
              className="flex-shrink-0 flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-colors duration-200 font-medium text-base sm:w-auto"
              aria-label={primaryActionText}
            >
              {primaryActionIcon ? React.cloneElement(primaryActionIcon, {className: "w-5 h-5 mr-2"}) : <PlusCircleIcon className="w-5 h-5 mr-2" />}
              {primaryActionText}
            </button>
          </div>

          {currentDisplayItems.length > 0 && dataItemTableHeaders ? (
            <div className="bg-white/60 backdrop-blur-sm shadow-md rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="flex items-center px-4 py-3 bg-slate-100/80 backdrop-blur-sm rounded-t-lg text-xs font-semibold text-slate-600 uppercase tracking-wider sticky top-0 z-10 min-w-max">
                {dataItemTableHeaders.map(header => (
                  <div key={String(header.key)} className={`flex-auto px-2 ${header.className || ''}`}>
                    {header.label}
                  </div>
                ))}
              </div>
              {/* Table Body */}
              <ul className="divide-y divide-slate-200/70 min-w-max">
                {currentDisplayItems.map(item => (
                  <li key={item.id} className="flex items-center px-4 py-3 hover:bg-slate-50/70 transition-colors duration-150 text-sm">
                    {dataItemTableHeaders.map(header => (
                      <div key={`${item.id}-${String(header.key)}`} className={`flex-auto px-2 ${header.className || ''} truncate`}>
                        {header.render ? header.render(item) : 
                         header.key === 'actions' ? (
                            <div className="flex justify-end items-center">
                               <ListItemMenu 
                                 itemId={item.id} 
                                 itemName={item.name}
                                 onEdit={onEditItem ? () => onEditItem(item) : undefined}
                                 onDuplicate={onDuplicateItem ? () => onDuplicateItem(item) : undefined}
                                 onDelete={onDeleteItem ? () => onDeleteItem(item) : undefined}
                               />
                            </div>
                         ) :
                         header.key === 'name' ? (
                            <div className="flex items-center">
                                {itemTypeForIcons === 'datasource' && (item as DataSourceItem).type ? getDataSourceTypeIcon((item as DataSourceItem).type) : 
                                 itemTypeForIcons === 'tool' && (item as ToolItem).category ? getToolCategoryIcon((item as ToolItem).category) : 
                                 <FolderOpenIcon className="w-5 h-5 text-slate-400" />}
                                <span className="ml-2 font-medium text-purple-700 hover:text-purple-800 truncate" title={item.name}>{item.name}</span>
                            </div>
                         ) :
                         header.key === 'status' ? (
                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColorClasses((item as DataSourceItem).status || (item as ToolItem).status)}`}>
                                {(item as DataSourceItem).status || (item as ToolItem).status}
                            </span>
                         ) :
                         (item as any)[header.key as keyof T] !== undefined ? String((item as any)[header.key as keyof T]) : '-'}
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-10 text-slate-500 bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg flex flex-col items-center justify-center min-h-[200px]">
              {emptyStateIcon ? React.cloneElement(emptyStateIcon, {className: "w-16 h-16 text-slate-400 mb-4"}) : <CubeIcon className="w-16 h-16 text-slate-400 mb-4" />}
              {searchTerm ? `No items found matching "${searchTerm}".` : emptyStateText}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8 md:mt-12 flex items-center justify-center space-x-4 py-4">
              <button onClick={handlePrevPage} disabled={currentPage === 1} className="p-2 rounded-md bg-white/70 backdrop-blur-md shadow-md hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-700"><ChevronLeftIcon className="w-6 h-6" /></button>
              <span className="text-slate-700 font-medium text-sm">Page {currentPage} of {totalPages}</span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages} className="p-2 rounded-md bg-white/70 backdrop-blur-md shadow-md hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-700"><ChevronRightIcon className="w-6 h-6" /></button>
            </div>
          )}
        </>
      ) : (
        // Setup View (Original layout)
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-2">{setupTitle}</h2>
            <p className="text-slate-600 mb-6">{setupDescription}</p>
            <ul className="space-y-3 mb-8">
              {featurePoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <CheckIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{point}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button onClick={onPrimaryActionClick} className="flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-colors duration-200 font-medium text-base">
                {primaryActionIcon ? React.cloneElement(primaryActionIcon, {className: "w-5 h-5 mr-2"}) : <PlusCircleIcon className="w-5 h-5 mr-2" />}
                {primaryActionText}
              </button>
              {secondaryActionText && onSecondaryActionClick && (
                <button onClick={onSecondaryActionClick} className="flex items-center justify-center px-6 py-3 bg-transparent text-purple-600 rounded-lg hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-colors duration-200 font-medium text-base group">
                  {secondaryActionText}
                  <ChevronRightIcon className="w-5 h-5 ml-1 transform transition-transform group-hover:translate-x-1" />
                </button>
              )}
            </div>
          </div>
          <div className="lg:col-span-1 bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-slate-700 mb-4">{existingItemsTitle}</h3>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center min-h-[200px] flex flex-col items-center justify-center">
              {emptyStateIcon ? React.cloneElement(emptyStateIcon, {className: "w-12 h-12 text-slate-400 mb-3"}) : <CubeIcon className="w-12 h-12 text-slate-400 mb-3" />}
              <p className="text-slate-500">{emptyStateSetupText}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenericKitLikeContent;
