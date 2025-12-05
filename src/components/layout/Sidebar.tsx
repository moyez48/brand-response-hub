import { cn } from '@/lib/utils';
import { 
  MessageSquare, 
  BarChart3, 
  AlertTriangle, 
  Settings, 
  Bell,
  Zap,
  Users,
  FileText
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  pendingCount: number;
  escalationCount: number;
}

const navItems = [
  { id: 'queue', label: 'Comment Queue', icon: MessageSquare, badge: 'pending' },
  { id: 'escalations', label: 'Escalations', icon: AlertTriangle, badge: 'escalations' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'agents', label: 'AI Agents', icon: Zap },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'reports', label: 'Reports', icon: FileText },
];

const Sidebar = ({ activeView, onViewChange, pendingCount, escalationCount }: SidebarProps) => {
  return (
    <aside className="w-64 bg-sidebar h-screen flex flex-col border-r border-sidebar-border">
      <div className="p-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Zap className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-sidebar-foreground">SocialOps</h1>
            <p className="text-xs text-sidebar-foreground/60">Response Hub</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          const badgeCount = item.badge === 'pending' ? pendingCount : 
                            item.badge === 'escalations' ? escalationCount : 0;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {badgeCount > 0 && (
                <Badge 
                  variant={item.badge === 'escalations' ? 'destructive' : 'secondary'}
                  className="h-5 min-w-[20px] text-xs"
                >
                  {badgeCount}
                </Badge>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
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
      </div>
    </aside>
  );
};

export default Sidebar;
