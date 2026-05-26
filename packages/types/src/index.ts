export type FirestoreTimestamp = string;

export type UserRole = 'member' | 'staff' | 'administrator';
export type ParticipantType = 'student' | 'teacher' | 'parent' | 'custom';
export type AttendanceStatus = 'checked-in' | 'checked-out' | 'absent' | 'late';
export type ActivityType = 'camp' | 'seminar' | 'challenge' | 'event';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type CertificateStatus = 'issued' | 'revoked' | 'expired';
export type LoyaltyRewardStatus = 'available' | 'redeemed' | 'expired';

export interface AddressPayload {
  country: string;
  province?: string;
  city?: string;
  postalCode?: string;
  line1?: string;
  line2?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  locale: 'en' | 'th' | 'zh';
  institution?: string;
  jobTitle?: string;
  avatarUrl?: string;
  badges: string[];
  xp: number;
  level: number;
  loyaltyPoints: number;
  referralCode?: string;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
  lastActiveAt?: FirestoreTimestamp;
  devices?: Array<{ deviceId: string; userAgent: string; lastSeenAt: FirestoreTimestamp }>; 
}

export interface ActivityCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  metadata?: Record<string, unknown>;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface SubCourse {
  id: string;
  activityId: string;
  title: string;
  description: string;
  capacity: number;
  schedule: Array<{ startAt: FirestoreTimestamp; endAt: FirestoreTimestamp; topic: string }>;
  mentorIds: string[];
  location?: string;
  priceCents: number;
  customFields?: Array<{ key: string; label: string; type: 'text' | 'email' | 'select' | 'textarea'; required: boolean; options?: string[] }>;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface Activity {
  id: string;
  categoryId: string;
  type: ActivityType;
  title: string;
  slug: string;
  description: string;
  heroImageUrl?: string;
  status: 'draft' | 'published' | 'archived';
  startDate: FirestoreTimestamp;
  endDate: FirestoreTimestamp;
  registrationDeadline: FirestoreTimestamp;
  capacity: number;
  waitlistEnabled: boolean;
  publishedAt?: FirestoreTimestamp;
  mentors: Array<{ id: string; name: string; role: string; avatarUrl?: string }>;
  tags: string[];
  seo: {
    title: string;
    description: string;
    ogImageUrl?: string;
  };
  metadata?: Record<string, unknown>;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface Registration {
  id: string;
  activityId: string;
  userId: string;
  participantType: ParticipantType;
  subCourseIds: string[];
  status: 'pending' | 'confirmed' | 'cancelled' | 'waitlisted';
  institution?: string;
  organization?: string;
  customFields?: Record<string, string>;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface AttendanceRecord {
  id: string;
  activityId: string;
  userId: string;
  sessionId: string;
  status: AttendanceStatus;
  checkInAt?: FirestoreTimestamp;
  checkOutAt?: FirestoreTimestamp;
  location?: { latitude: number; longitude: number };
  deviceFingerprint?: string;
  verificationMethod?: 'qr' | 'otp' | 'device';
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface Badge {
  id: string;
  key: string;
  title: string;
  description: string;
  iconUrl?: string;
  criteria: string;
  xpReward: number;
  metadata?: Record<string, unknown>;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface Achievement {
  id: string;
  userId: string;
  badgeId: string;
  title: string;
  description: string;
  awardedAt: FirestoreTimestamp;
  metadata?: Record<string, unknown>;
}

export interface LeaderboardEntry {
  id: string;
  userId: string;
  seasonId: string;
  category: ActivityType | 'global';
  rank: number;
  xp: number;
  points: number;
  updatedAt: FirestoreTimestamp;
}

export interface Certificate {
  id: string;
  userId: string;
  activityId: string;
  registrationId: string;
  status: CertificateStatus;
  issuedAt: FirestoreTimestamp;
  expiresAt?: FirestoreTimestamp;
  qrCodeUrl?: string;
  pdfUrl?: string;
  digitalSignature?: string;
}

export interface Payment {
  id: string;
  userId: string;
  activityId: string;
  registrationId?: string;
  amountCents: number;
  currency: 'THB' | 'USD' | 'CNY';
  method: 'promptpay' | 'manual' | 'wallet';
  status: PaymentStatus;
  receiptUrl?: string;
  paidAt?: FirestoreTimestamp;
  refundReason?: string;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface RoyaltyPointTransaction {
  id: string;
  userId: string;
  source: 'registration' | 'achievement' | 'referral' | 'admin';
  points: number;
  balanceAfter: number;
  status: LoyaltyRewardStatus;
  note?: string;
  createdAt: FirestoreTimestamp;
}

export interface AnalyticsEvent {
  id: string;
  userId?: string;
  sessionId?: string;
  eventType: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  metadata?: Record<string, unknown>;
  createdAt: FirestoreTimestamp;
}

export interface AIInsight {
  id: string;
  source: 'marketing' | 'event' | 'engagement' | 'revenue';
  title: string;
  summary: string;
  recommendations: string[];
  correlationSignals?: Record<string, number>;
  generatedAt: FirestoreTimestamp;
  metadata?: Record<string, unknown>;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'system' | 'activity' | 'reminder' | 'reward';
  read: boolean;
  deepLink?: string;
  createdAt: FirestoreTimestamp;
}

export interface StaffLog {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: FirestoreTimestamp;
}

export interface SystemSetting {
  id: string;
  key: string;
  value: string | number | boolean | Record<string, unknown>;
  description?: string;
  updatedAt: FirestoreTimestamp;
}

export interface LandingPageSection {
  id: string;
  type: 'hero' | 'banner' | 'schedule' | 'speaker' | 'faq' | 'sponsor' | 'gallery' | 'cta';
  sortOrder: number;
  payload: Record<string, unknown>;
}

export interface LandingPage {
  id: string;
  slug: string;
  title: string;
  description: string;
  sections: LandingPageSection[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImageUrl?: string;
  };
  published: boolean;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface MediaAsset {
  id: string;
  storagePath: string;
  publicUrl: string;
  contentType: string;
  fileName: string;
  sizeBytes: number;
  uploadedBy: string;
  createdAt: FirestoreTimestamp;
}
