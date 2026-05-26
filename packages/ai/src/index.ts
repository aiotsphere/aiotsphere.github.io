export const aiTopics = {
  marketing: 'marketing',
  eventRecommendation: 'eventRecommendation',
  attendanceRisk: 'attendanceRisk',
};

export interface AIRequestPayload {
  prompt: string;
  context: string;
  userId?: string;
}

export interface AIResponsePayload {
  summary: string;
  insights: string[];
  metadata?: Record<string, unknown>;
}
