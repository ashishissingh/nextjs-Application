
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Users,
  Settings,
  PanelLeftClose,
  KeyRound,
  LogOut,
  LayoutDashboard,
  LifeBuoy,
  UserCircle,
  Building2,
} from 'lucide-react';
import Image from 'next/image'; 
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';

// Navigation items for the main content area
const mainNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/request-access', label: 'Request Access', icon: KeyRound },
];

// Navigation items for the footer area
const footerNavItems = [
  { href: '/settings/profile', label: 'Profile', icon: UserCircle },
  { href: '/settings/application', label: 'Settings', icon: Settings },
  { href: '/settings/organization', label: 'Manage Organization', icon: Building2 },
  { href: '/users', label: 'Manage Users', icon: Users },
  { href: '/support', label: 'Contact Support', icon: LifeBuoy },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state, toggleSidebar, isMobile } = useSidebar();
  const router = useRouter();

  // Placeholder for user data
  const user = {
    name: "User Name",
    email: "user@example.com",
    avatarUrl: "https://placehold.co/100x100.png?text=U",
    avatarFallback: "UN", // Fallback initials
  };

  const handleLogout = () => {
    // TODO: Implement actual logout logic
    router.push('/login');
  };

  const mobileSidebarContent = (
    <>
      <SidebarHeader className="p-4 flex items-center justify-center">
        <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold font-headline text-sidebar-primary-foreground">
          <Image
            src="https://raw.githubusercontent.com/hrudu-shibu-axcess/fluffy-fishstick/main/utlis-logo.png"
            alt="Platform Logo"
            width={50}
            height={50}
            priority
            data-ai-hint="platform logo"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {mainNavItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                className="justify-start gap-3 h-12 text-base"
                size="lg"
              >
                <Link href={item.href}>
                  <item.icon className="h-6 w-6" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 mt-auto border-t-0">
        <SidebarMenu>
            {footerNavItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  className="justify-center h-12"
                  size="lg"
                >
                  <Link href={item.href}>
                    <item.icon className="h-6 w-6" />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
        <div className="p-2">
          <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full h-12 border-sidebar-primary text-destructive hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
          >
              <LogOut className="h-6 w-6" />
          </Button>
        </div>
      </SidebarFooter>
    </>
  );

  const desktopSidebarContent = (
    <>
      <SidebarHeader className={`p-4 flex items-center ${state === 'expanded' ? 'justify-between' : 'justify-center'}`}>
        <Link href="/dashboard" className={`flex items-center gap-2 text-lg font-semibold font-headline text-sidebar-primary-foreground ${state === 'collapsed' ? 'justify-center w-full' : ''}`}>
          <Image
            src="https://raw.githubusercontent.com/hrudu-shibu-axcess/fluffy-fishstick/main/utlis-logo.png"
            alt="Platform Logo"
            width={50}
            height={50}
            priority
            data-ai-hint="platform logo"
          />
        </Link>
        {state === 'expanded' && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            <PanelLeftClose className="h-6 w-6" />
            <span className="sr-only">Collapse Sidebar</span>
          </Button>
        )}
      </SidebarHeader>
      <ScrollArea className="flex-1">
        <SidebarContent>
          <SidebarMenu className="px-2">
            {mainNavItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.label}
                  isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                  className="justify-start group-data-[state=collapsed]:justify-center gap-2"
                  size="lg"
                >
                  <Link href={item.href}>
                    <item.icon className="h-6 w-6" />
                    {state === 'expanded' && <span>{item.label}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </ScrollArea>
      <SidebarFooter className="p-2 mt-auto border-t border-sidebar-border">
        {state === 'expanded' ? (
          <div className="p-2">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="user avatar"/>
                <AvatarFallback>{user.avatarFallback}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">{user.name}</p>
                <p className="text-xs text-sidebar-foreground/70">{user.email}</p>
              </div>
            </div>
            <nav className="flex flex-col gap-1">
              {footerNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" +
                    (pathname.startsWith(item.href) ? " bg-sidebar-accent text-sidebar-accent-foreground" : "")
                  }
                >
                  <item.icon className="h-6 w-6" />
                  {item.label}
                </Link>
              ))}
              <Button onClick={handleLogout} variant="ghost" className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10 hover:text-destructive justify-start">
                <LogOut className="h-6 w-6" />
                Log out
              </Button>
            </nav>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 w-full">
            
            <SidebarMenu className="w-full px-2">
              {footerNavItems.map((item) => (
                <SidebarMenuItem key={item.label} className="w-full">
                  <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                    isActive={pathname.startsWith(item.href)}
                    className="justify-center w-full"
                    size="lg"
                  >
                    <Link href={item.href}>
                      <item.icon className="h-6 w-6" />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <div className="px-2 w-full">
              <SidebarMenuButton
                  onClick={handleLogout}
                  tooltip="Log out"
                  className="justify-center w-full mt-1 text-destructive hover:bg-destructive/10"
                  size="lg"
                  variant="ghost"
              >
                  <LogOut className="h-6 w-6" />
              </SidebarMenuButton>
            </div>
          </div>
        )}
      </SidebarFooter>
    </>
  );

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      {isMobile ? mobileSidebarContent : desktopSidebarContent}
    </Sidebar>
  );
}
