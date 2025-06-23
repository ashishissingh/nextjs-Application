
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Sparkles, FileText, BookOpenText, Wrench } from 'lucide-react'; // Updated Cpu to Sparkles

const subNavItems = [
  { href: '/studio-agents', label: 'Agents', icon: Sparkles }, // Changed icon
  { href: '/studio-agents/prompts', label: 'Prompt Library', icon: FileText },
  { href: '/studio-agents/knowledge-base', label: 'Knowledge Base', icon: BookOpenText },
  { href: '/studio-agents/tools', label: 'Tools Library', icon: Wrench },
];

export function StudioSubNav() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-background border-r border-border flex-shrink-0 h-full flex flex-col">
      {/* Removed the static "AI Studio" heading div */}
      <nav className="flex-1 px-4 py-2 space-y-1 mt-4"> {/* Added mt-4 for spacing after removing header */}
        {subNavItems.map((item) => {
          const isActive = item.href === '/studio-agents' 
            ? pathname === item.href 
            : pathname.startsWith(item.href);
          
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-3 p-2 rounded-md text-sm transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'text-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
