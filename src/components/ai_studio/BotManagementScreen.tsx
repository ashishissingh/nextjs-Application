import React, { useState, useMemo, useEffect } from 'react';
import type { Bot } from '../../../types';
import BotCard from './BotCard';
import { PlusCircleIcon, ChevronLeftIcon, ChevronRightIcon, BotIcon as DefaultBannerIcon } from '../../../constants';
import { useRouter } from 'next/navigation';
// ScreenSearchBarHeader removed as search is now global
// SectionBanner can be used if a local banner is still desired, but header is global

const sampleBots: Bot[] = Array.from({ length: 25 }, (_, i) => ({
  id: `bot${i + 1}`,
  name: `ChatBot Assistant ${i + 1}`,
  description: `This is bot number ${i + 1}, designed to assist with customer queries and provide automated support. It can handle various tasks including FAQ, scheduling, and basic troubleshooting. Its capabilities are expanding with ongoing training.`,
  status: i % 5 === 0 ? 'Active' : i % 5 === 1 ? 'Inactive' : i % 5 === 2 ? 'Draft' : i % 5 === 3 ? 'Training' : 'Error',
  version: `v1.${i % 3}.${i % 5}`,
  lastUpdated: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toLocaleDateString(),
  avatarUrl: i % 4 === 0 ? `https://i.pravatar.cc/150?u=bot${i+1}` : undefined,
  platform: i % 3 === 0 ? 'Web & Mobile' : i % 3 === 1 ? 'Slack' : 'Internal API',
  tags: ['customer-support', `tier-${(i % 3) + 1}`, i % 2 === 0 ? 'experimental' : 'stable', 'AI-powered', 'NLP'],
}));

const ITEMS_PER_PAGE = 6; 

interface BotManagementScreenProps {
  searchTerm: string; // Receives searchTerm from parent
}

export default function BotManagementScreen({ searchTerm }: BotManagementScreenProps): JSX.Element {

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  // Local searchTerm state is removed

  const handleCreateNewBot = () => {
    console.log("Create new bot clicked");
    router.push('/ai-studio/create-bot');
  };

  const filteredBots = useMemo(() => {
    return sampleBots.filter(bot =>
      bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bot.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bot.tags && bot.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  }, [searchTerm]);

  useEffect(() => { 
    setCurrentPage(1);
  }, [searchTerm]); // Re-paginate when global search term changes

  const totalPages = Math.ceil(filteredBots.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentBots = filteredBots.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  
  return (
    <>
      {/* Local ScreenSearchBarHeader removed */}
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <button
          onClick={handleCreateNewBot}
          className="order-1 sm:order-2 flex-shrink-0 flex items-center justify-center 
                    px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base
                    bg-primary hover:bg-primary/90 text-primary-foreground 
                    rounded-lg shadow-md focus:outline-none focus:ring-2 
                    focus:ring-accent focus:ring-opacity-75 
                    transition-colors duration-200 font-medium sm:w-auto mt-3"
          aria-label="Create a new bot"
        >
          <PlusCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Create New Bot
        </button>

        <h2 className="order-2 sm:order-1 text-2xl sm:text-3xl mt-3 font-semibold text-slate-800">
          Your Bots
        </h2>
      </div>

      
      {currentBots.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentBots.map(bot => (
            <BotCard key={bot.id} bot={bot} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-slate-500 bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg flex flex-col items-center justify-center min-h-[200px]">
          <DefaultBannerIcon className="w-16 h-16 text-slate-400 mb-4" />
          {searchTerm ? 'No bots found matching your search.' : 'No bots created yet. Click "Create New Bot" to get started!'}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 md:mt-12 flex items-center justify-center space-x-4 py-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="p-2 rounded-md bg-white/70 backdrop-blur-md shadow-md hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-700"
            aria-label="Previous page of bots"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <span className="text-slate-700 font-medium text-sm" aria-live="polite">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md bg-white/70 backdrop-blur-md shadow-md hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-700"
            aria-label="Next page of bots"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
}