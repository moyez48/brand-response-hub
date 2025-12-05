import { Bell, Search, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

const Header = ({ title, subtitle, onRefresh, isRefreshing }: HeaderProps) => {
  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search comments..." 
            className="pl-9 h-9 bg-background"
          />
        </div>

        {onRefresh && (
          <Button 
            variant="ghost-muted" 
            size="icon-sm"
            onClick={onRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        )}

        <Button variant="ghost-muted" size="icon-sm" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-destructive rounded-full" />
        </Button>

        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=coordinator" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-medium text-foreground">Sarah C.</p>
            <p className="text-xs text-muted-foreground">Coordinator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
