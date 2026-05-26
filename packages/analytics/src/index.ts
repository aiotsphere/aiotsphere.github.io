import { AnalyticsEvent } from '@aiotsphere/types';

export function buildEventPayload(event: AnalyticsEvent) {
  return {
    ...event,
    createdAt: event.createdAt || new Date().toISOString(),
  };
}

export const analyticsTopics = {
  engagement: 'engagement',
  revenue: 'revenue',
  retention: 'retention',
  marketing: 'marketing',
};
