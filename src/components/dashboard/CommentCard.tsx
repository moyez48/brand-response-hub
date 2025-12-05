import { useState } from 'react';
import { SocialComment, Platform } from '@/types/social';
import { platformColors, sentimentConfig } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Check, 
  Pencil, 
  ExternalLink, 
  AlertTriangle,
  Clock,
  MessageSquare,
  Instagram,
  Twitter,
  Youtube,
  Facebook
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface CommentCardProps {
  comment: SocialComment;
  onApprove: (id: string) => void;
  onEdit: (id: string, response: string) => void;
}

const PlatformIcon = ({ platform }: { platform: Platform }) => {
  const iconClass = "h-3.5 w-3.5 text-white";
  switch (platform) {
    case 'instagram':
      return <Instagram className={iconClass} />;
    case 'twitter':
      return <Twitter className={iconClass} />;
    case 'youtube':
      return <Youtube className={iconClass} />;
    case 'facebook':
      return <Facebook className={iconClass} />;
    case 'tiktok':
      return <MessageSquare className={iconClass} />;
    default:
      return <MessageSquare className={iconClass} />;
  }
};

const CommentCard = ({ comment, onApprove, onEdit }: CommentCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedResponse, setEditedResponse] = useState(comment.suggestedResponse);

  const sentiment = sentimentConfig[comment.sentiment];

  const handleApprove = () => {
    if (isEditing) {
      onEdit(comment.id, editedResponse);
    } else {
      onApprove(comment.id);
    }
    setIsEditing(false);
  };

  return (
    <div className={cn(
      "bg-card rounded-lg border shadow-card hover:shadow-card-hover transition-all duration-200 animate-fade-in",
      comment.status === 'escalated' && "border-l-4 border-l-destructive"
    )}>
      <div className="p-4 border-b border-border/50">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-border">
            <AvatarImage src={comment.authorAvatar} />
            <AvatarFallback>{comment.author.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-foreground">{comment.author}</span>
              <div className={cn("h-5 w-5 rounded flex items-center justify-center", platformColors[comment.platform])}>
                <PlatformIcon platform={comment.platform} />
              </div>
              <Badge variant="outline" className={cn("text-xs", sentiment.color, sentiment.bg)}>
                {sentiment.label}
              </Badge>
              {comment.status === 'escalated' && (
                <Badge variant="destructive" className="text-xs gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Escalated
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{formatDistanceToNow(comment.createdAt, { addSuffix: true })}</span>
              {comment.postTitle && (
                <>
                  <span>•</span>
                  <span className="truncate">{comment.postTitle}</span>
                </>
              )}
            </div>
          </div>

          {comment.relatedIssueCount && comment.relatedIssueCount >= 3 && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-destructive/10 text-destructive text-xs font-medium">
              <AlertTriangle className="h-3.5 w-3.5" />
              {comment.relatedIssueCount} similar issues
            </div>
          )}
        </div>

        <p className="mt-3 text-sm text-foreground leading-relaxed">
          {comment.content}
        </p>
      </div>

      <div className="p-4 bg-muted/30">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-5 w-5 rounded bg-accent/20 flex items-center justify-center">
            <MessageSquare className="h-3 w-3 text-accent" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">AI-Generated Response</span>
        </div>

        {isEditing ? (
          <Textarea
            value={editedResponse}
            onChange={(e) => setEditedResponse(e.target.value)}
            className="min-h-[80px] text-sm bg-background"
            placeholder="Edit the response..."
          />
        ) : (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {comment.suggestedResponse}
          </p>
        )}

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="accent" 
              size="sm"
              onClick={handleApprove}
              disabled={comment.status === 'responded'}
            >
              <Check className="h-4 w-4" />
              {isEditing ? 'Save & Approve' : 'Approve'}
            </Button>
            <Button 
              variant="ghost-muted" 
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              disabled={comment.status === 'responded'}
            >
              <Pencil className="h-4 w-4" />
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>
          <Button variant="ghost-muted" size="sm">
            <ExternalLink className="h-4 w-4" />
            View Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
