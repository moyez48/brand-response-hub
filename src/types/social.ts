export type Platform = 'instagram' | 'tiktok' | 'twitter' | 'youtube' | 'facebook';

export type Sentiment = 'positive' | 'neutral' | 'negative';

export type CommentCategory = 
  | 'praise' 
  | 'complaint' 
  | 'bug_report' 
  | 'product_question' 
  | 'shipping_issue' 
  | 'spam' 
  | 'general';

export type CommentStatus = 'pending' | 'approved' | 'responded' | 'escalated';

export interface SocialComment {
  id: string;
  platform: Platform;
  author: string;
  authorAvatar?: string;
  content: string;
  postTitle?: string;
  postUrl?: string;
  sentiment: Sentiment;
  category: CommentCategory;
  status: CommentStatus;
  suggestedResponse: string;
  createdAt: Date;
  respondedAt?: Date;
  escalationReason?: string;
  relatedIssueCount?: number;
}

export interface EscalationAlert {
  id: string;
  issue: string;
  commentCount: number;
  platforms: Platform[];
  severity: 'medium' | 'high' | 'critical';
  suggestedAction: string;
  createdAt: Date;
  resolved: boolean;
}

export interface AnalyticsData {
  responseRate: number;
  averageResponseTime: number;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topIssues: {
    issue: string;
    count: number;
  }[];
  platformBreakdown: {
    platform: Platform;
    count: number;
  }[];
}
