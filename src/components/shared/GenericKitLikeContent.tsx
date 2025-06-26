// GenericKitLikeContent.tsx

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  CheckIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  PlusCircleIcon,
  CubeIcon,
  FolderOpenIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  PencilIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  EllipsisVerticalIcon
} from '../../../constants'; 
import type {
  DataSourceItem,
  DataSourceType,
  DataSourceStatus,
  ToolItem,
  ToolStatus,
  ToolCategory
} from '../../../types'; // Import types

// ItemType is either DataSourceItem or ToolItem
type ItemType = DataSourceItem | ToolItem;

// Default items per page for pagination
const ITEMS_PER_PAGE = 8;

/**
 * Helper function to get an icon based on data source type.
 * Uses semantic color class `text-primary` by default.
 * You can customize per type if desired, once you define additional semantic colors.
 */
const getDataSourceTypeIcon = (type: DataSourceType): React.ReactElement => {
  const baseClass = "w-5 h-5 text-primary"; // semantic primary color
  switch (type) {
    case 'PDF':
      return <DocumentTextIcon className={baseClass} />;
    case 'Website':
      return <GlobeAltIcon className={baseClass} />;
    case 'Document':
      return <DocumentTextIcon className={baseClass} />;
    case 'Text File':
      return <DocumentTextIcon className={baseClass} />;
    case 'Database':
      return <CubeIcon className={baseClass} />;
    case 'API':
      return <CubeIcon className={baseClass} />;
    default:
      return <FolderOpenIcon className={baseClass} />;
  }
};

/**
 * Helper function to get an icon based on tool category.
 * Uses `text-primary` by default.
 */
const getToolCategoryIcon = (category: ToolCategory): React.ReactElement => {
  const baseClass = "w-5 h-5 text-primary";
  switch (category) {
    case 'API':
      return <CubeIcon className={baseClass} />;
    case 'Service':
      return <FolderOpenIcon className={baseClass} />;
    case 'Plugin':
      return <ChevronRightIcon className={baseClass} />;
    case 'Custom':
      return <PencilIcon className={baseClass} />;
    case 'Data Store':
      return <CubeIcon className={baseClass} />;
    default:
      return <FolderOpenIcon className={baseClass} />;
  }
};

/**
 * Semantic status badge classes.
 * Requires that you extend your palette in globals.css and tailwind.config.js:
 *   --color-success, --color-warning, --color-error, --color-info, etc.
 * and map in tailwind.config.js:
 *   success: 'var(--color-success)', 'success-foreground', etc.
 *
 * Example mapping:
 *   DataSourceStatus 'Available' → info style: 'bg-info/10 text-info-foreground'
 *   'Pending' → warning: 'bg-warning/10 text-warning-foreground'
 *   'Failed' → error: 'bg-error/10 text-error-foreground'
 */
const getStatusColorClasses = (status: DataSourceStatus | ToolStatus): string => {
  switch (status) {
    case 'Indexed':
    case 'Available':
    case 'Connected':
      return 'bg-info/10 text-info-foreground';      // informational/online
    case 'Pending':
    case 'Pending Setup':
      return 'bg-warning/10 text-warning-foreground'; // pending setup
    case 'Processing':
    case 'Syncing':
      return 'bg-warning/10 text-warning-foreground'; // processing
    case 'Failed':
    case 'Error':
    case 'Disconnected':
      return 'bg-error/10 text-error-foreground';     // error state
    case 'Deprecated':
      return 'bg-warning/10 text-warning-foreground'; // deprecated treated as warning
    default:
      return 'bg-card/10 text-muted-foreground';      // fallback neutral badge
  }
};

interface ListItemMenuProps {
  itemId: string;
  itemName: string;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
}

/**
 * ListItemMenu: three-dots menu for each item.
 * Semantic color changes:
 * - Trigger button: text-muted-foreground, hover:text-primary, hover:bg-card/20
 * - Menu panel: bg-card, ring-border
 * - Menu items:
 *     Edit/Duplicate: text-foreground, icon text-primary, hover:bg-card/20, hover:text-primary
 *     Delete: text-error, hover:bg-error/10, hover:text-error-foreground
 */
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
        className="
          p-1.5
          text-muted-foreground
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
            bg-card
            rounded-md shadow-xl z-20
            ring-1 ring-border
            focus:outline-none
          "
          role="menu" 
          aria-orientation="vertical" 
          aria-labelledby={`options-menu-${itemId}`}
        >
          <div className="py-1" role="none">
            {onEdit && (
              <button
                onClick={() => { onEdit(); setIsMenuOpen(false); }}
                className="
                  w-full text-left flex items-center px-4 py-2 text-sm
                  text-foreground
                  hover:bg-card/20 hover:text-primary
                  transition-colors
                "
                role="menuitem"
              >
                <PencilIcon className="w-4 h-4 mr-3 text-primary" />
                Edit
              </button>
            )}
            {onDuplicate && (
              <button
                onClick={() => { onDuplicate(); setIsMenuOpen(false); }}
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
            )}
            {onDelete && (
              <button
                onClick={() => { onDelete(); setIsMenuOpen(false); }}
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
            )}
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
  emptyStateText: string;       // when filtered items are empty but there were items initially
  emptyStateSetupText: string;  // when no dataItems at all
  emptyStateIcon?: React.ReactElement<{ className?: string }>;
  
  searchTerm?: string;          // For filtering dataItems externally
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
          {/* Header: Title + Primary Action */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
              {existingItemsTitle}
            </h2>
            <button
              onClick={onPrimaryActionClick}
              className="
                flex-shrink-0 flex items-center justify-center px-6 py-3
                bg-primary text-primary-foreground rounded-lg shadow-md
                hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75
                transition-colors duration-200 font-medium text-base sm:w-auto
              "
              aria-label={primaryActionText}
            >
              {primaryActionIcon
                ? React.cloneElement(primaryActionIcon, { className: "w-5 h-5 mr-2 text-primary-foreground" })
                : <PlusCircleIcon className="w-5 h-5 mr-2 text-primary-foreground" />
              }
              {primaryActionText}
            </button>
          </div>

          {currentDisplayItems.length > 0 && dataItemTableHeaders ? (
            <div className="bg-card/60 backdrop-blur-sm shadow-md rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="
                  flex items-center px-4 py-3
                  bg-card/80 backdrop-blur-sm rounded-t-lg
                  text-xs font-semibold text-muted-foreground uppercase tracking-wider
                  sticky top-0 z-10 min-w-max
                ">
                {dataItemTableHeaders.map(header => (
                  <div key={String(header.key)} className={`flex-auto px-2 ${header.className || ''}`}>
                    {header.label}
                  </div>
                ))}
              </div>
              {/* Table Body */}
              <ul className="divide-y divide-border/70 min-w-max">
                {currentDisplayItems.map(item => (
                  <li key={item.id} className="flex items-center px-4 py-3 hover:bg-card/20 transition-colors duration-150 text-sm">
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
                                {itemTypeForIcons === 'datasource' && (item as DataSourceItem).type
                                   ? getDataSourceTypeIcon((item as DataSourceItem).type)
                                   : itemTypeForIcons === 'tool' && (item as ToolItem).category
                                     ? getToolCategoryIcon((item as ToolItem).category)
                                     : <FolderOpenIcon className="w-5 h-5 text-muted-foreground" />
                                }
                                <span className="ml-2 font-medium text-primary hover:text-primary/90 truncate" title={item.name}>
                                  {item.name}
                                </span>
                            </div>
                         ) :
                         header.key === 'status' ? (
                            <span className={`
                              px-2.5 py-1 text-xs font-semibold rounded-full 
                              ${getStatusColorClasses((item as DataSourceItem).status || (item as ToolItem).status)}
                            `}>
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
            // Empty state when filtering yields no results or no initial items
            <div className="
                text-center py-10
                text-muted-foreground
                bg-card/70 backdrop-blur-md p-6 rounded-xl shadow-lg
                flex flex-col items-center justify-center min-h-[200px]
              ">
              {emptyStateIcon
                ? React.cloneElement(emptyStateIcon, { className: "w-16 h-16 text-muted-foreground mb-4" })
                : <CubeIcon className="w-16 h-16 text-muted-foreground mb-4" />
              }
              <p>
                {searchTerm
                  ? `No items found matching "${searchTerm}".`
                  : emptyStateText
                }
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8 md:mt-12 flex items-center justify-center space-x-4 py-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`
                  p-2 rounded-md
                  bg-card/70 backdrop-blur-md shadow-md
                  hover:bg-card/80 disabled:opacity-50 disabled:cursor-not-allowed
                  transition-colors
                  text-foreground hover:text-primary
                `}
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <span className="text-foreground font-medium text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`
                  p-2 rounded-md
                  bg-card/70 backdrop-blur-md shadow-md
                  hover:bg-card/80 disabled:opacity-50 disabled:cursor-not-allowed
                  transition-colors
                  text-foreground hover:text-primary
                `}
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </div>
          )}
        </>
      ) : (
        // Setup View when no dataItems initially
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-card/80 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2">
              {setupTitle}
            </h2>
            <p className="text-muted-foreground mb-6">{setupDescription}</p>
            <ul className="space-y-3 mb-8">
              {featurePoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <CheckIcon className="w-6 h-6 text-success mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{point}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onPrimaryActionClick}
                className="
                  flex items-center justify-center px-6 py-3
                  bg-primary text-primary-foreground rounded-lg shadow-md
                  hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75
                  transition-colors duration-200 font-medium text-base
                "
              >
                {primaryActionIcon
                  ? React.cloneElement(primaryActionIcon, { className: "w-5 h-5 mr-2 text-primary-foreground" })
                  : <PlusCircleIcon className="w-5 h-5 mr-2 text-primary-foreground" />
                }
                {primaryActionText}
              </button>
              {secondaryActionText && onSecondaryActionClick && (
                <button
                  onClick={onSecondaryActionClick}
                  className="
                    flex items-center justify-center px-6 py-3
                    bg-transparent text-primary rounded-lg
                    hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50
                    transition-colors duration-200 font-medium text-base group
                  "
                >
                  {secondaryActionText}
                  <ChevronRightIcon className="w-5 h-5 ml-1 transform transition-transform group-hover:translate-x-1 text-primary" />
                </button>
              )}
            </div>
          </div>
          <div className="lg:col-span-1 bg-card/80 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              {existingItemsTitle}
            </h3>
            <div className="
                border-2 border-border rounded-lg p-8 text-center min-h-[200px]
                flex flex-col items-center justify-center bg-card/70 backdrop-blur-sm
              ">
              {emptyStateIcon
                ? React.cloneElement(emptyStateIcon, { className: "w-12 h-12 text-muted-foreground mb-3" })
                : <CubeIcon className="w-12 h-12 text-muted-foreground mb-3" />
              }
              <p className="text-muted-foreground">{emptyStateSetupText}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenericKitLikeContent;
