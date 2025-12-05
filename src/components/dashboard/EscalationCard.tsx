import { EscalationAlert, Platform } from '@/types/social';
import { platformColors } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle,
  ExternalLink,
  MessageSquare,
  Instagram,
  Twitter,
  Youtube,
  Facebook
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface EscalationCardProps {
  escalation: EscalationAlert;
  onResolve: (id: string) => void;
  onViewComments: (id: string) => void;
}

const PlatformIcon = ({ platform }: { platform: Platform }) => {
  const iconClass = "h-3 w-3 text-white";
  switch (platform) {
    case 'instagram': return <Instagram className={iconClass} />;
    case 'twitter': return <Twitter className={iconClass} />;
    case 'youtube': return <Youtube className={iconClass} />;
    case 'facebook': return <Facebook className={iconClass} />;
    case 'tiktok': return <MessageSquare className={iconClass} />;
    default: return <MessageSquare className={iconClass} />;
  }
};

const severityConfig = {
  medium: { 
    bg: 'bg-warning/10', 
    border: 'border-warning/30', 
    text: 'text-warning',
    badge: 'bg-warning/20 text-warning'
  },
  high: { 
    bg: 'bg-orange-500/10', 
    border: 'border-orange-500/30', 
    text: 'text-orange-500',
    badge: 'bg-orange-500/20 text-orange-500'
  },
  critical: { 
    bg: 'bg-destructive/10', 
    border: 'border-destructive/30', 
    text: 'text-destructive',
    badge: 'bg-destructive/20 text-destructive'
  },
};

const EscalationCard = ({ escalation, onResolve, onViewComments }: EscalationCardProps) => {
  const severity = severityConfig[escalation.severity];

  return (
    <div className={cn(
      "rounded-lg border-2 p-4 transition-all duration-200 animate-fade-in",
      severity.bg,
      severity.border,
      escalation.resolved && "opacity-60"
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className={cn("p-2 rounded-lg", severity.bg)}>
            <AlertTriangle className={cn("h-5 w-5", severity.text)} />
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{escalation.issue}</h3>
              <Badge className={cn("text-xs", severity.badge)}>
                {escalation.severity.toUpperCase()}
              </Badge>
              {escalation.resolved && (
                <Badge variant="outline" className="text-xs text-success border-success/30">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Resolved
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-3 mt-1.5">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MessageSquare className="h-3.5 w-3.5" />
                <span className="font-medium">{escalation.commentCount}</span> comments
              </div>
              <div className="flex items-center gap-1">
                {escalation.platforms.map((platform) => (
                  <div 
                    key={platform} 
                    className={cn("h-5 w-5 rounded flex items-center justify-center", platformColors[platform])}
                  >
                    <PlatformIcon platform={platform} />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {formatDistanceToNow(escalation.createdAt, { addSuffix: true })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-card/50 rounded-md border border-border/50">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Suggested action: </span>
          {escalation.suggestedAction}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Button 
          variant="accent" 
          size="sm"
          onClick={() => onViewComments(escalation.id)}
        >
          <ExternalLink className="h-4 w-4" />
          View Comments
        </Button>
        {!escalation.resolved && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onResolve(escalation.id)}
          >
            <CheckCircle className="h-4 w-4" />
            Mark Resolved
          </Button>
        )}
      </div>
    </div>
  );
};

export default EscalationCard;
