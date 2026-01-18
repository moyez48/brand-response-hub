import { cn } from '@/lib/utils';
import { 
  MessageSquare, 
  BarChart3, 
  AlertTriangle, 
  Settings, 
  Bell,
  Zap,
  Users,
  FileText,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  pendingCount: number;
  escalationCount: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const navItems = [
  { id: 'queue', label: 'Comment Queue', icon: MessageSquare, badge: 'pending' },
  { id: 'escalations', label: 'Escalations', icon: AlertTriangle, badge: 'escalations' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'agents', label: 'AI Agents', icon: Zap },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'reports', label: 'Reports', icon: FileText },
];

const Sidebar = ({ activeView, onViewChange, pendingCount, escalationCount, isCollapsed, onToggleCollapse }: SidebarProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <aside 
        className={cn(
          "bg-sidebar h-screen flex flex-col border-r border-sidebar-border transition-all duration-300",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="p-3 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            <div className={cn("flex items-center gap-3", isCollapsed && "justify-center w-full")}>
              <div className="h-9 w-9 rounded-lg bg-sidebar-primary flex items-center justify-center flex-shrink-0">
                <Zap className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="font-semibold text-sidebar-foreground">SocialOps</h1>
                  <p className="text-xs text-sidebar-foreground/60">Response Hub</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            const badgeCount = item.badge === 'pending' ? pendingCount : 
                              item.badge === 'escalations' ? escalationCount : 0;

            const button = (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isCollapsed && "justify-center px-2",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && <span className="flex-1 text-left">{item.label}</span>}
                {!isCollapsed && badgeCount > 0 && (
                  <Badge 
                    variant={item.badge === 'escalations' ? 'destructive' : 'secondary'}
                    className="h-5 min-w-[20px] text-xs"
                  >
                    {badgeCount}
                  </Badge>
                )}
                {isCollapsed && badgeCount > 0 && (
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive" />
                )}
              </button>
            );

            if (isCollapsed) {
              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      {button}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="flex items-center gap-2">
                    {item.label}
                    {badgeCount > 0 && (
                      <Badge 
                        variant={item.badge === 'escalations' ? 'destructive' : 'secondary'}
                        className="h-5 min-w-[20px] text-xs"
                      >
                        {badgeCount}
                      </Badge>
                    )}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return button;
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border space-y-1">
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onViewChange('settings')}
                  className={cn(
                    "w-full flex items-center justify-center px-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    activeView === 'settings'
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  <Settings className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          ) : (
            <button
              onClick={() => onViewChange('settings')}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                activeView === 'settings'
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleCollapse}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                  isCollapsed && "justify-center px-2"
                )}
              >
                {isCollapsed ? (
                  <PanelLeft className="h-4 w-4" />
                ) : (
                  <>
                    <PanelLeftClose className="h-4 w-4" />
                    <span className="text-sm font-medium">Collapse</span>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            </TooltipContent>
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  );
};

export default Sidebar;
