import { AnalyticsData } from '@/types/social';
import { platformColors } from '@/data/mockData';
import { cn } from '@/lib/utils';
import StatsCard from './StatsCard';
import { 
  MessageSquare, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  BarChart3,
  PieChart
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  Legend
} from 'recharts';

interface AnalyticsPanelProps {
  data: AnalyticsData;
}

const sentimentColors = {
  positive: 'hsl(142, 71%, 45%)',
  neutral: 'hsl(38, 92%, 50%)',
  negative: 'hsl(0, 72%, 51%)',
};

const AnalyticsPanel = ({ data }: AnalyticsPanelProps) => {
  const sentimentData = [
    { name: 'Positive', value: data.sentimentBreakdown.positive, color: sentimentColors.positive },
    { name: 'Neutral', value: data.sentimentBreakdown.neutral, color: sentimentColors.neutral },
    { name: 'Negative', value: data.sentimentBreakdown.negative, color: sentimentColors.negative },
  ];

  const platformData = data.platformBreakdown.map((item) => ({
    name: item.platform.charAt(0).toUpperCase() + item.platform.slice(1),
    count: item.count,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Response Rate"
          value={`${data.responseRate}%`}
          subtitle="Target: 90%+"
          icon={TrendingUp}
          variant={data.responseRate >= 90 ? 'success' : data.responseRate >= 70 ? 'warning' : 'destructive'}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Avg. Response Time"
          value={`${data.averageResponseTime}m`}
          subtitle="Time to first response"
          icon={Clock}
          variant="default"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Comments"
          value={data.platformBreakdown.reduce((acc, p) => acc + p.count, 0)}
          subtitle="Last 7 days"
          icon={MessageSquare}
          variant="default"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Active Escalations"
          value={data.topIssues.length}
          subtitle="Requires attention"
          icon={AlertTriangle}
          variant={data.topIssues.length > 3 ? 'destructive' : 'warning'}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Distribution */}
        <div className="bg-card rounded-lg border border-border/50 p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Sentiment Distribution</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => (
                    <span className="text-sm text-foreground">{value}</span>
                  )}
                />
              </RechartsPie>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comments by Platform */}
        <div className="bg-card rounded-lg border border-border/50 p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Comments by Platform</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformData} layout="vertical">
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  width={80}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
                />
                <Bar 
                  dataKey="count" 
                  fill="hsl(var(--accent))" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Issues */}
      <div className="bg-card rounded-lg border border-border/50 p-5 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Top Recurring Issues</h3>
        </div>
        <div className="space-y-3">
          {data.topIssues.map((issue, index) => (
            <div 
              key={issue.issue}
              className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg"
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{issue.issue}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-foreground">{issue.count}</p>
                <p className="text-xs text-muted-foreground">mentions</p>
              </div>
              <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent rounded-full transition-all duration-500"
                  style={{ width: `${(issue.count / data.topIssues[0].count) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
