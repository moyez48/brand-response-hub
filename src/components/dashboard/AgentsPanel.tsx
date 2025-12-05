import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Globe, 
  Brain, 
  MessageSquare, 
  Activity,
  Settings,
  Play,
  Pause,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'running' | 'paused' | 'error';
  lastRun: string;
  processedCount: number;
  color: string;
}

const agents: Agent[] = [
  {
    id: 'scraper',
    name: 'Web Scraper Agent',
    description: 'Collects comments, mentions, replies, and DMs from all connected social platforms.',
    icon: <Globe className="h-5 w-5" />,
    status: 'running',
    lastRun: '2 minutes ago',
    processedCount: 1247,
    color: 'bg-blue-500',
  },
  {
    id: 'sentiment',
    name: 'Sentiment & Classification Agent',
    description: 'Analyzes sentiment, detects intent, and categorizes comments. Tracks recurring issues.',
    icon: <Brain className="h-5 w-5" />,
    status: 'running',
    lastRun: '1 minute ago',
    processedCount: 1235,
    color: 'bg-purple-500',
  },
  {
    id: 'response',
    name: 'Response Generator Agent',
    description: 'Generates brand-approved responses and handles escalation ticketing.',
    icon: <MessageSquare className="h-5 w-5" />,
    status: 'running',
    lastRun: '30 seconds ago',
    processedCount: 892,
    color: 'bg-accent',
  },
];

const statusConfig = {
  running: { label: 'Running', color: 'bg-success', icon: CheckCircle },
  paused: { label: 'Paused', color: 'bg-warning', icon: Pause },
  error: { label: 'Error', color: 'bg-destructive', icon: Activity },
};

const AgentsPanel = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Overview */}
      <div className="bg-card rounded-lg border border-border/50 p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">AI Agent Pipeline</h2>
            <p className="text-sm text-muted-foreground">
              Three coordinated agents working together to manage your social responses
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm text-muted-foreground">All systems operational</span>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
              Configure
            </Button>
          </div>
        </div>

        {/* Pipeline visualization */}
        <div className="relative flex items-center justify-between px-8">
          {agents.map((agent, index) => (
            <div key={agent.id} className="relative flex flex-col items-center">
              <div className={cn(
                "h-16 w-16 rounded-2xl flex items-center justify-center text-white shadow-lg",
                agent.color
              )}>
                {agent.icon}
              </div>
              <p className="mt-2 text-sm font-medium text-foreground text-center max-w-[120px]">
                {agent.name.split(' ')[0]}
              </p>
              {index < agents.length - 1 && (
                <div className="absolute left-[calc(100%+16px)] top-8 w-24 flex items-center">
                  <div className="flex-1 h-0.5 bg-border" />
                  <div className="h-0 w-0 border-l-8 border-l-border border-y-4 border-y-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {agents.map((agent) => {
          const status = statusConfig[agent.status];
          const StatusIcon = status.icon;

          return (
            <div
              key={agent.id}
              className="bg-card rounded-lg border border-border/50 p-5 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={cn(
                  "h-12 w-12 rounded-xl flex items-center justify-center text-white",
                  agent.color
                )}>
                  {agent.icon}
                </div>
                <div className="flex items-center gap-2">
                  <div className={cn("h-2 w-2 rounded-full", status.color)} />
                  <span className="text-xs font-medium text-muted-foreground">{status.label}</span>
                </div>
              </div>

              <h3 className="font-semibold text-foreground mb-1">{agent.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-lg font-semibold text-foreground">{agent.processedCount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Processed today</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium text-foreground">{agent.lastRun}</p>
                  <p className="text-xs text-muted-foreground">Last activity</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <Switch checked={agent.status === 'running'} />
                  <span className="text-sm text-muted-foreground">Active</span>
                </div>
                <Button variant="ghost-muted" size="icon-sm">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Log */}
      <div className="bg-card rounded-lg border border-border/50 p-5 shadow-card">
        <h3 className="font-semibold text-foreground mb-4">Recent Agent Activity</h3>
        <div className="space-y-3">
          {[
            { time: '10:23:45', agent: 'Scraper', action: 'Collected 23 new comments from Instagram' },
            { time: '10:23:44', agent: 'Sentiment', action: 'Classified 18 comments as positive, 3 neutral, 2 negative' },
            { time: '10:23:42', agent: 'Response', action: 'Generated 5 response drafts for review' },
            { time: '10:23:40', agent: 'Sentiment', action: 'Detected recurring issue: "checkout crash" (8 mentions)' },
            { time: '10:23:38', agent: 'Response', action: 'Created escalation ticket #ESC-127 for engineering' },
          ].map((log, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg text-sm"
            >
              <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                {log.time}
              </span>
              <Badge variant="outline" className="text-xs shrink-0">
                {log.agent}
              </Badge>
              <span className="text-muted-foreground">{log.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentsPanel;
