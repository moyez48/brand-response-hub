import { useState, useMemo } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import CommentCard from '@/components/dashboard/CommentCard';
import FilterBar from '@/components/dashboard/FilterBar';
import EscalationCard from '@/components/dashboard/EscalationCard';
import AnalyticsPanel from '@/components/dashboard/AnalyticsPanel';
import AgentsPanel from '@/components/dashboard/AgentsPanel';
import StatsCard from '@/components/dashboard/StatsCard';
import { mockComments, mockEscalations, mockAnalytics } from '@/data/mockData';
import { SocialComment, Platform, Sentiment, CommentStatus, EscalationAlert } from '@/types/social';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();
  const [activeView, setActiveView] = useState('queue');
  const [comments, setComments] = useState<SocialComment[]>(mockComments);
  const [escalations, setEscalations] = useState<EscalationAlert[]>(mockEscalations);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Filters
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');
  const [selectedSentiment, setSelectedSentiment] = useState<Sentiment | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<CommentStatus | 'all'>('all');

  // Filtered comments
  const filteredComments = useMemo(() => {
    return comments.filter((comment) => {
      if (selectedPlatform !== 'all' && comment.platform !== selectedPlatform) return false;
      if (selectedSentiment !== 'all' && comment.sentiment !== selectedSentiment) return false;
      if (selectedStatus !== 'all' && comment.status !== selectedStatus) return false;
      return true;
    });
  }, [comments, selectedPlatform, selectedSentiment, selectedStatus]);

  // Comment counts
  const commentCounts = useMemo(() => ({
    total: filteredComments.length,
    pending: comments.filter((c) => c.status === 'pending').length,
    escalated: comments.filter((c) => c.status === 'escalated').length,
    responded: comments.filter((c) => c.status === 'responded').length,
  }), [comments, filteredComments]);

  // Handlers
  const handleApprove = (id: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: 'responded' as CommentStatus, respondedAt: new Date() }
          : c
      )
    );
    toast({
      title: 'Response approved',
      description: 'The response has been posted successfully.',
    });
  };

  const handleEdit = (id: string, response: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, suggestedResponse: response, status: 'responded' as CommentStatus, respondedAt: new Date() }
          : c
      )
    );
    toast({
      title: 'Response updated & approved',
      description: 'Your edited response has been posted.',
    });
  };

  const handleResolveEscalation = (id: string) => {
    setEscalations((prev) =>
      prev.map((e) => (e.id === id ? { ...e, resolved: true } : e))
    );
    toast({
      title: 'Escalation resolved',
      description: 'The issue has been marked as resolved.',
    });
  };

  const handleViewEscalationComments = (id: string) => {
    setActiveView('queue');
    setSelectedStatus('escalated');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: 'Data refreshed',
        description: 'Latest comments have been loaded.',
      });
    }, 1000);
  };

  const pendingEscalations = escalations.filter((e) => !e.resolved).length;

  const getHeaderInfo = () => {
    switch (activeView) {
      case 'queue':
        return { title: 'Comment Queue', subtitle: 'Review and approve AI-generated responses' };
      case 'escalations':
        return { title: 'Escalations', subtitle: 'Recurring issues requiring attention' };
      case 'analytics':
        return { title: 'Analytics', subtitle: 'Response metrics and insights' };
      case 'agents':
        return { title: 'AI Agents', subtitle: 'Monitor and configure your agent pipeline' };
      case 'team':
        return { title: 'Team', subtitle: 'Coordinator performance and schedules' };
      case 'reports':
        return { title: 'Reports', subtitle: 'Generate and export reports' };
      case 'settings':
        return { title: 'Settings', subtitle: 'Configure brand voice and integrations' };
      default:
        return { title: 'Dashboard', subtitle: '' };
    }
  };

  const headerInfo = getHeaderInfo();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        pendingCount={commentCounts.pending}
        escalationCount={pendingEscalations}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header
          title={headerInfo.title}
          subtitle={headerInfo.subtitle}
          onRefresh={activeView === 'queue' ? handleRefresh : undefined}
          isRefreshing={isRefreshing}
        />

        <div className="flex-1 overflow-auto p-6 scrollbar-thin">
          {activeView === 'queue' && (
            <div className="space-y-4 max-w-4xl">
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <StatsCard
                  title="Response Rate"
                  value={`${mockAnalytics.responseRate}%`}
                  icon={TrendingUp}
                  variant={mockAnalytics.responseRate >= 90 ? 'success' : 'warning'}
                />
                <StatsCard
                  title="Pending"
                  value={commentCounts.pending}
                  icon={MessageSquare}
                  variant="default"
                />
                <StatsCard
                  title="Avg Response"
                  value={`${mockAnalytics.averageResponseTime}m`}
                  icon={Clock}
                  variant="default"
                />
                <StatsCard
                  title="Escalations"
                  value={pendingEscalations}
                  icon={AlertTriangle}
                  variant={pendingEscalations > 0 ? 'destructive' : 'success'}
                />
              </div>

              <FilterBar
                selectedPlatform={selectedPlatform}
                selectedSentiment={selectedSentiment}
                selectedStatus={selectedStatus}
                onPlatformChange={setSelectedPlatform}
                onSentimentChange={setSelectedSentiment}
                onStatusChange={setSelectedStatus}
                commentCounts={commentCounts}
              />

              <div className="space-y-4">
                {filteredComments.map((comment) => (
                  <CommentCard
                    key={comment.id}
                    comment={comment}
                    onApprove={handleApprove}
                    onEdit={handleEdit}
                  />
                ))}

                {filteredComments.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No comments match your filters</p>
                    <p className="text-sm">Try adjusting your filter criteria</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeView === 'escalations' && (
            <div className="space-y-4 max-w-3xl">
              {escalations.filter((e) => !e.resolved).map((escalation) => (
                <EscalationCard
                  key={escalation.id}
                  escalation={escalation}
                  onResolve={handleResolveEscalation}
                  onViewComments={handleViewEscalationComments}
                />
              ))}

              {escalations.filter((e) => !e.resolved).length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No active escalations</p>
                  <p className="text-sm">All issues have been resolved</p>
                </div>
              )}

              {escalations.filter((e) => e.resolved).length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">Recently Resolved</h3>
                  <div className="space-y-4">
                    {escalations.filter((e) => e.resolved).map((escalation) => (
                      <EscalationCard
                        key={escalation.id}
                        escalation={escalation}
                        onResolve={handleResolveEscalation}
                        onViewComments={handleViewEscalationComments}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeView === 'analytics' && (
            <AnalyticsPanel data={mockAnalytics} />
          )}

          {activeView === 'agents' && (
            <AgentsPanel />
          )}

          {(activeView === 'team' || activeView === 'reports' || activeView === 'settings') && (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center">
                <p className="text-lg font-medium">Coming Soon</p>
                <p className="text-sm">This section is under development</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
