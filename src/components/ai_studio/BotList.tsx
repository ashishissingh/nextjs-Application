
'use client';

import * as React from 'react';
import { format, parseISO } from 'date-fns';
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
import { MoreHorizontal, AlertTriangle, Bot as BotIconLucide } from 'lucide-react'; // Renamed Bot to avoid conflict
import { type BotInstance, BOT_STATUSES, BOT_TYPES, BOT_STATUS_ICONS, BOT_TYPE_ICONS, ACTION_ICONS, MOCK_USER } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface BotListProps {
  botsToDisplay: BotInstance[];
}

export function BotList({ botsToDisplay }: BotListProps) {
  const { toast } = useToast();
  const [bots, setBots] = React.useState<BotInstance[]>(botsToDisplay);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [botToDelete, setBotToDelete] = React.useState<BotInstance | null>(null);

  React.useEffect(() => {
    setBots(botsToDisplay);
  }, [botsToDisplay]);


  const handleDeleteBot = () => {
    if (!botToDelete) return;
    // Simulate API call
    setBots(prevBots => prevBots.filter(bot => bot.id !== botToDelete.id));
    // Note: This only updates the local state of this component.
    // For a persistent change, an event should be emitted to the parent page or a global state updated.
    toast({
      title: 'Bot Deleted',
      description: `Bot "${botToDelete.name}" has been deleted.`,
    });
    setShowDeleteDialog(false);
    setBotToDelete(null);
  };

  const handleToggleStatus = (botId: string) => {
    setBots(prevBots =>
      prevBots.map(bot =>
        bot.id === botId
          ? { ...bot, status: bot.status === 'active' ? 'inactive' : 'active' }
          : bot
      )
    );
    const bot = bots.find(b => b.id === botId);
    // Note: This only updates the local state of this component.
    toast({
      title: 'Bot Status Updated',
      description: `Bot "${bot?.name}" is now ${bot?.status === 'active' ? 'inactive' : 'active'}.`,
    });
  };

  const getStatusInfo = (status: BotInstance['status']) => {
    return BOT_STATUSES.find(s => s.value === status) || { label: status, icon: AlertTriangle, color: 'text-muted-foreground' };
  };
  
  const getTypeInfo = (type: BotInstance['type']) => {
    return BOT_TYPES.find(t => t.value === type) || { label: type };
  };


  return (
    <>
    <div className="space-y-4">
      {/* Create New Bot button removed from here, will be on the parent page */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bots.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No bots found in this list.
                </TableCell>
              </TableRow>
            )}
            {bots.map((bot) => {
              const statusInfo = getStatusInfo(bot.status);
              const typeInfo = getTypeInfo(bot.type);
              const TypeIcon = BOT_TYPE_ICONS[bot.type] || BotIconLucide; // Use renamed Bot icon
              const StatusIcon = statusInfo.icon || AlertTriangle;
              const canEditOrDelete = bot.creatorId === MOCK_USER.id || MOCK_USER.role === 'admin';


              return (
                <TableRow key={bot.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <TypeIcon className={cn("h-5 w-5 text-muted-foreground", BOT_TYPE_ICONS[bot.type] && "text-primary")} />
                      {bot.name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate max-w-xs">{bot.description}</div>
                  </TableCell>
                  <TableCell>{typeInfo.label}</TableCell>
                  <TableCell>
                    <Badge
                      variant={bot.status === 'active' ? 'default' : bot.status === 'error' ? 'destructive' : 'secondary'}
                      className={cn(
                        "capitalize",
                        bot.status === 'active' && 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200 border-green-300 dark:border-green-700',
                        bot.status === 'inactive' && 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700',
                        bot.status === 'draft' && 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600',
                        bot.status === 'error' && 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200 border-red-300 dark:border-red-700',
                      )}
                    >
                      <StatusIcon className={cn("mr-1 h-3 w-3", statusInfo.color)} />
                      {statusInfo.label}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(parseISO(bot.lastModified), "MMM d, yyyy 'at' h:mm a")}</TableCell>
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
                        {canEditOrDelete && (
                          <>
                            <DropdownMenuItem onClick={() => console.log(`Edit bot ${bot.id}`)}> {/* Replace with actual navigation or modal */}
                              <ACTION_ICONS.Edit className="mr-2 h-4 w-4" /> Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleStatus(bot.id)}>
                              {bot.status === 'active' ? <ACTION_ICONS.ToggleOff className="mr-2 h-4 w-4" /> : <ACTION_ICONS.ToggleOn className="mr-2 h-4 w-4" />}
                              {bot.status === 'active' ? 'Deactivate' : 'Activate'} Bot
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                                onClick={() => { setBotToDelete(bot); setShowDeleteDialog(true); }} 
                                className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                            >
                              <ACTION_ICONS.Delete className="mr-2 h-4 w-4" /> Delete Bot
                            </DropdownMenuItem>
                          </>
                        )}
                        {!canEditOrDelete && (
                            <DropdownMenuItem disabled>
                                No actions available
                            </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>

    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the bot
              "{botToDelete?.name}" and all its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setBotToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteBot} className="bg-destructive hover:bg-destructive/90">
              Yes, delete bot
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}