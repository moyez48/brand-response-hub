import { Platform, Sentiment, CommentStatus } from '@/types/social';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Filter, 
  Instagram, 
  Twitter, 
  Youtube, 
  Facebook, 
  MessageSquare,
  X
} from 'lucide-react';

interface FilterBarProps {
  selectedPlatform: Platform | 'all';
  selectedSentiment: Sentiment | 'all';
  selectedStatus: CommentStatus | 'all';
  onPlatformChange: (platform: Platform | 'all') => void;
  onSentimentChange: (sentiment: Sentiment | 'all') => void;
  onStatusChange: (status: CommentStatus | 'all') => void;
  commentCounts: {
    total: number;
    pending: number;
    escalated: number;
    responded: number;
  };
}

const platforms: { id: Platform | 'all'; icon: React.ReactNode; label: string }[] = [
  { id: 'all', icon: <Filter className="h-3.5 w-3.5" />, label: 'All' },
  { id: 'instagram', icon: <Instagram className="h-3.5 w-3.5" />, label: 'IG' },
  { id: 'twitter', icon: <Twitter className="h-3.5 w-3.5" />, label: 'X' },
  { id: 'tiktok', icon: <MessageSquare className="h-3.5 w-3.5" />, label: 'TikTok' },
  { id: 'youtube', icon: <Youtube className="h-3.5 w-3.5" />, label: 'YT' },
  { id: 'facebook', icon: <Facebook className="h-3.5 w-3.5" />, label: 'FB' },
];

const sentiments: { id: Sentiment | 'all'; label: string; color: string }[] = [
  { id: 'all', label: 'All', color: 'bg-secondary' },
  { id: 'positive', label: 'Positive', color: 'bg-success/20 text-success' },
  { id: 'neutral', label: 'Neutral', color: 'bg-warning/20 text-warning' },
  { id: 'negative', label: 'Negative', color: 'bg-destructive/20 text-destructive' },
];

const statuses: { id: CommentStatus | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'escalated', label: 'Escalated' },
  { id: 'responded', label: 'Responded' },
];

const FilterBar = ({
  selectedPlatform,
  selectedSentiment,
  selectedStatus,
  onPlatformChange,
  onSentimentChange,
  onStatusChange,
  commentCounts,
}: FilterBarProps) => {
  const hasFilters = selectedPlatform !== 'all' || selectedSentiment !== 'all' || selectedStatus !== 'all';

  const clearFilters = () => {
    onPlatformChange('all');
    onSentimentChange('all');
    onStatusChange('all');
  };

  return (
    <div className="bg-card rounded-lg border border-border/50 p-4 shadow-card">
      <div className="flex flex-wrap items-center gap-6">
        {/* Platform Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Platform</label>
          <div className="flex items-center gap-1">
            {platforms.map((platform) => (
              <Button
                key={platform.id}
                variant={selectedPlatform === platform.id ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => onPlatformChange(platform.id)}
                className={cn(
                  "h-8 px-2.5 gap-1.5",
                  selectedPlatform === platform.id && "bg-accent/10 text-accent hover:bg-accent/20"
                )}
              >
                {platform.icon}
                <span className="text-xs">{platform.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="h-8 w-px bg-border" />

        {/* Sentiment Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Sentiment</label>
          <div className="flex items-center gap-1">
            {sentiments.map((sentiment) => (
              <Button
                key={sentiment.id}
                variant={selectedSentiment === sentiment.id ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => onSentimentChange(sentiment.id)}
                className={cn(
                  "h-8 px-3 text-xs",
                  selectedSentiment === sentiment.id && sentiment.color
                )}
              >
                {sentiment.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="h-8 w-px bg-border" />

        {/* Status Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Status</label>
          <div className="flex items-center gap-1">
            {statuses.map((status) => (
              <Button
                key={status.id}
                variant={selectedStatus === status.id ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => onStatusChange(status.id)}
                className={cn(
                  "h-8 px-3 text-xs",
                  selectedStatus === status.id && "bg-accent/10 text-accent hover:bg-accent/20"
                )}
              >
                {status.label}
                {status.id === 'pending' && (
                  <Badge variant="secondary" className="ml-1.5 h-4 text-[10px]">
                    {commentCounts.pending}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {hasFilters && (
          <>
            <div className="h-8 w-px bg-border" />
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-8 text-xs text-muted-foreground hover:text-destructive"
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Clear filters
            </Button>
          </>
        )}

        <div className="ml-auto text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{commentCounts.total}</span> comments
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
