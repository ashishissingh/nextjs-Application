import React, { useState, useRef, useEffect } from 'react';
import type { Bot, BotStatus } from '../../../types';
import { BotIcon, PencilIcon, EllipsisVerticalIcon, DocumentDuplicateIcon, TrashIcon } from '../../../constants';

interface BotCardProps {
  bot: Bot;
}

const getStatusColorClasses = (status: BotStatus): string => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-700';
    case 'Inactive':
      return 'bg-slate-100 text-slate-600';
    case 'Draft':
      return 'bg-blue-100 text-blue-700';
    case 'Error':
      return 'bg-red-100 text-red-700';
    case 'Training':
      return 'bg-yellow-100 text-yellow-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const BotCard: React.FC<BotCardProps> = ({ bot }) => {
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

  const handleEdit = () => console.log(`Editing bot: ${bot.name}`);
  const handleDuplicate = () => {
    console.log(`Duplicating bot: ${bot.name}`);
    setIsMenuOpen(false);
  };
  const handleDelete = () => {
    console.log(`Deleting bot: ${bot.name}`);
    setIsMenuOpen(false);
  };

  return (
    <div 
      className="bg-white/80 backdrop-blur-md p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col h-full"
      role="listitem"
      aria-labelledby={`bot-title-${bot.id}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg mr-4 shadow-sm">
            {bot.avatarUrl ? (
              <img src={bot.avatarUrl} alt={`${bot.name} avatar`} className="w-8 h-8 rounded-md object-cover" />
            ) : (
              <BotIcon className="w-8 h-8 text-purple-600" />
            )}
          </div>
          <div>
            <h3 id={`bot-title-${bot.id}`} className="text-lg font-semibold text-purple-700 leading-tight">
              {bot.name}
            </h3>
            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusColorClasses(bot.status)}`}>
              {bot.status}
            </span>
          </div>
        </div>
        <div className="relative flex-shrink-0" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="More actions"
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
            className="p-2 text-slate-500 hover:text-purple-600 hover:bg-slate-100 rounded-md transition-colors"
          >
            <EllipsisVerticalIcon className="w-5 h-5" />
          </button>
          {isMenuOpen && (
            <div
              className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-xl z-20 ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby={`options-menu-bot-${bot.id}`}
            >
              <div className="py-1" role="none">
                <button
                  onClick={handleEdit}
                  className="w-full text-left flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-purple-600 transition-colors"
                  role="menuitem"
                >
                  <PencilIcon className="w-4 h-4 mr-3" />
                  Edit
                </button>
                <button
                  onClick={handleDuplicate}
                  className="w-full text-left flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-purple-600 transition-colors"
                  role="menuitem"
                >
                  <DocumentDuplicateIcon className="w-4 h-4 mr-3" />
                  Duplicate
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
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
      
      <p className="text-sm text-slate-600 leading-relaxed mb-3 flex-grow" title={bot.description}>
        {bot.description.length > 100 ? `${bot.description.substring(0, 97)}...` : bot.description}
      </p>

      <div className="text-xs text-slate-500 border-t border-slate-200 pt-3 mt-auto">
        <div className="flex justify-between items-center">
            <span>Version: {bot.version}</span>
            <span>Last Updated: {bot.lastUpdated}</span>
        </div>
        {bot.platform && <div className="mt-1">Platform: <span className="font-medium text-slate-600">{bot.platform}</span></div>}
        {bot.tags && bot.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {bot.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-1.5 py-0.5 text-xs bg-slate-200 text-slate-700 rounded-md">{tag}</span>
            ))}
            {bot.tags.length > 3 && <span className="px-1.5 py-0.5 text-xs bg-slate-200 text-slate-700 rounded-md">+{bot.tags.length - 3}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default BotCard;
