'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import AiStudioSidebar from '@/components/ai_studio/AiStudioSidebar';
import AiStudioSectionHeader from '@/components/ai_studio/AiStudioSectionHeader';
import { Footer } from '@/components/shared/Footer';
import { PromptIcon } from '../../../../constants';

import * as React from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, AlertTriangle, FileText, Edit, Trash, ToggleLeft, ToggleRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample prompt data
const samplePrompts = Array.from({ length: 8 }, (_, i) => ({
  id: `p${i + 1}`,
  name: `Prompt ${i + 1} - ${i % 2 === 0 ? 'Customer Service' : 'Content Generation'}`,
  description: `This is a description for prompt ${i + 1}`,
  version: `v1.${i % 3}`,
  status: i % 3 === 0 ? 'Published' : i % 3 === 1 ? 'Draft' : 'Archived',
  tags: i % 2 === 0 ? ['customer', 'service'] : ['content', 'marketing'],
  lastModified: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
  creatorId: '1',
}));

interface Prompt {
  id: string;
  name: string;
  description: string;
  version: string;
  status: string;
  tags: string[];
  lastModified: string;
  creatorId: string;
}

interface PromptListProps {
  promptsToDisplay: Prompt[];
}

const ACTION_ICONS = {
  Edit: Edit,
  Delete: Trash,
  ToggleOn: ToggleRight,
  ToggleOff: ToggleLeft,
};

const PromptList: React.FC<PromptListProps> = ({ promptsToDisplay }) => {
  const [prompts, setPrompts] = React.useState<Prompt[]>(promptsToDisplay);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  React.useEffect(() => {
    setPrompts(promptsToDisplay);
    setCurrentPage(1);
  }, [promptsToDisplay]);

  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200';
      case 'Draft':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200';
      case 'Archived':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200';
    }
  };
  
  // Calculate pagination
  const totalPages = Math.ceil(prompts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPrompts = prompts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prompts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No prompts found in this list.
                </TableCell>
              </TableRow>
            )}
            {currentPrompts.map((prompt) => (
              <TableRow key={prompt.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    {prompt.name}
                  </div>
                  <div className="text-xs text-muted-foreground truncate max-w-xs text-form-description">{prompt.description}</div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "capitalize",
                      getStatusBadgeStyles(prompt.status)
                    )}
                  >
                    {prompt.status === 'Published' ? (
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-1" />
                    ) : prompt.status === 'Draft' ? (
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-1" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-gray-500 mr-1" />
                    )}
                    {prompt.status}
                  </Badge>
                </TableCell>
                <TableCell>{prompt.version}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {prompt.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 text-xs bg-card/80 border border-border rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{format(new Date(prompt.lastModified), "MMM d, yyyy")}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => console.log(`Edit prompt ${prompt.id}`)}>
                        <ACTION_ICONS.Edit className="mr-2 h-4 w-4" /> Edit Prompt
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log(`Toggle status for ${prompt.id}`)}>
                        {prompt.status === 'Published' ? (
                          <ACTION_ICONS.ToggleOff className="mr-2 h-4 w-4" />
                        ) : (
                          <ACTION_ICONS.ToggleOn className="mr-2 h-4 w-4" />
                        )}
                        {prompt.status === 'Published' ? 'Unpublish' : 'Publish'} Prompt
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => console.log(`Delete prompt ${prompt.id}`)}
                        className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                      >
                        <ACTION_ICONS.Delete className="mr-2 h-4 w-4" /> Delete Prompt
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <div className="mt-8 md:mt-12 flex items-center justify-center space-x-4 py-4">
          <Button
            variant="outline"
            size="icon"
            className="p-2 rounded-md bg-card/70 backdrop-blur-md shadow-md hover:bg-card/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-foreground hover:text-primary"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Previous page of prompts"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </Button>
          <span className="text-foreground font-medium text-sm" aria-live="polite">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="p-2 rounded-md bg-card/70 backdrop-blur-md shadow-md hover:bg-card/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-foreground hover:text-primary"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            aria-label="Next page of prompts"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
};

const SECTION_CONFIG = {
  title: 'Prompt Management',
  subtitle: 'Create and manage AI prompts and templates.',
  searchPlaceholder: 'Search prompts by name, tag, or category...'
} as const;

export default function PromptsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleNavigateHome = () => router.push('/dashboard');
  const handleSearchChange = (value: string) => setSearchTerm(value);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-background dark:from-primary/20 dark:via-accent/15 dark:to-background/90">
      <Sidebar onNavigateHome={handleNavigateHome} />
      <div className="flex flex-1 bg-background text-foreground overflow-hidden">
        <AiStudioSidebar activeNav="prompts" setActiveNav={() => {}} />
        <div className="flex-1 flex flex-col bg-background overflow-hidden h-full">
          <AiStudioSectionHeader
            title={SECTION_CONFIG.title}
            subtitle={SECTION_CONFIG.subtitle}
            decorativeIcon={<PromptIcon className="text-primary-foreground" />}
            backgroundColorClasses="bg-gradient-to-r from-primary to-accent"
            showSearchBar
            searchPlaceholder={SECTION_CONFIG.searchPlaceholder}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            showCreateButton={true}
            createButtonText="Create New Prompt"
            onCreateClick={() => console.log('Create new prompt')}
          />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 sm:pb-8 md:pb-10 lg:pb-12">
              <div className="bg-card/80 backdrop-blur-md p-6 rounded-xl shadow-lg mb-6 mt-4">
                <PromptList promptsToDisplay={samplePrompts} />
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}