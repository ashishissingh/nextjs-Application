import React, { useState, useRef, useEffect } from 'react';
import type { Bot, BotStatus } from '../../../types';
import { BotIcon, PencilIcon, EllipsisVerticalIcon, DocumentDuplicateIcon, TrashIcon } from '../../../constants';
import { BOT_ACTIONS, BOT_LABELS } from '@/lib/config/bot.config';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface BotCardProps {
  bot: Bot;
}

const getStatusColorClasses = (status: BotStatus): string => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-700';
    case 'Inactive':
      return 'bg-muted text-muted-foreground';
    case 'Draft':
      return 'bg-accent text-accent-foreground';
    case 'Error':
      return 'bg-destructive text-destructive-foreground';
    case 'Training':
      return 'bg-yellow-100 text-yellow-700';
    default:
      return 'bg-muted text-muted-foreground';
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

  const handleStartConversation = () => {
    console.log(`Starting conversation with bot: ${bot.name}`);
    // TODO: Navigate to chat interface
  };
  
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
      className="bg-card/80 backdrop-blur-md p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col h-full"
      role="listitem"
      aria-labelledby={`bot-title-${bot.id}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className="p-3 bg-accent/10 rounded-lg mr-4 shadow-sm">
            {bot.avatarUrl ? (
              <img src={bot.avatarUrl} alt={`${bot.name} avatar`} className="w-8 h-8 rounded-md object-cover" />
            ) : (
              <BotIcon className="w-8 h-8 text-primary" />
            )}
          </div>
          <div>
            <h3 id={`bot-title-${bot.id}`} className="text-lg font-semibold text-primary leading-tight">
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
            aria-label={BOT_LABELS.MORE_ACTIONS}
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
            className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
          >
            <EllipsisVerticalIcon className="w-5 h-5" />
          </button>
          {isMenuOpen && (
            <div
              className="absolute right-0 mt-1 w-48 bg-card rounded-md shadow-xl z-20 ring-1 ring-border focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby={`options-menu-bot-${bot.id}`}
            >
              <div className="py-1" role="none">
                <button
                  onClick={handleEdit}
                  className="w-full text-left flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                  role="menuitem"
                >
                  <PencilIcon className="w-4 h-4 mr-3" />
                  {BOT_ACTIONS.EDIT}
                </button>
                <button
                  onClick={handleDuplicate}
                  className="w-full text-left flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                  role="menuitem"
                >
                  <DocumentDuplicateIcon className="w-4 h-4 mr-3" />
                  {BOT_ACTIONS.DUPLICATE}
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full text-left flex items-center px-4 py-2 text-sm text-destructive hover:bg-red-50 hover:text-destructive-foreground transition-colors"
                  role="menuitem"
                >
                  <TrashIcon className="w-4 h-4 mr-3" />
                  {BOT_ACTIONS.DELETE}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-grow" title={bot.description}>
        {bot.description.length > 100 ? `${bot.description.substring(0, 97)}...` : bot.description}
      </p>

      <div className="text-xs text-muted-foreground border-t border-border pt-3 mt-auto">
        <div className="flex justify-between items-center">
          <span>{BOT_LABELS.VERSION} {bot.version}</span>
          <span>{BOT_LABELS.LAST_UPDATED} {bot.lastUpdated}</span>
        </div>
        {bot.platform && (
          <div className="mt-1">
            {BOT_LABELS.PLATFORM} <span className="font-medium text-foreground">{bot.platform}</span>
          </div>
        )}
        {bot.tags && bot.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {bot.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-1.5 py-0.5 text-xs bg-muted text-muted-foreground rounded-md">
                {tag}
              </span>
            ))}
            {bot.tags.length > 3 && (
              <span className="px-1.5 py-0.5 text-xs bg-muted text-muted-foreground rounded-md">
                +{bot.tags.length - 3}
              </span>
            )}
          </div>
        )}
        
        <div className="mt-3 pt-3 border-t border-border">
          <Button 
            onClick={handleStartConversation}
            variant="outline"
            className="w-full text-primary hover:bg-sidebar-primary"
            size="sm"
          >
            <MessageSquare className="w-4 h-4 mr-2 text-primary" />
            {BOT_ACTIONS.START_CONVERSATION}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BotCard;
