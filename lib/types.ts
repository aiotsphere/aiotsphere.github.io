export type TrackId = "ai-creator" | "ai-builder" | "aiot-innovator" | "ai-business-innovator";
export type CampId = "ai-builder-camp";

export type Registration = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  school: string;
  educationLevel: string;
  status: "pending" | "confirmed" | "waitlist";
  createdAt: string;
};

export type User = Registration & {
  passwordHash: string;
  role: "student" | "admin";
};

export type CampRegistration = {
  id: string;
  userId: string;
  campId: CampId;
  status: "registered" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
};

export type Activity = {
  id: string;
  trackId: TrackId;
  title: string;
  titleTh: string;
  xp: number;
  order: number;
};

export type ActivityCode = {
  id: string;
  code: string;
  activityId: string;
  trackId: TrackId;
  createdBy: string;
  expiresAt: string;
  maxUses: number;
  usedCount: number;
  active: boolean;
  createdAt: string;
};

export type Checkin = {
  id: string;
  userId: string;
  activityId: string;
  code: string;
  trackId: TrackId;
  createdAt: string;
};

export type ProgressRecord = {
  userId: string;
  trackId: TrackId;
  completedActivityIds: string[];
  xp: number;
  updatedAt: string;
};

export const aiBuilderCampId: CampId = "ai-builder-camp";

export const tracks: Array<{
  id: TrackId;
  title: string;
  titleTh: string;
  subtitle: string;
  subtitleTh: string;
  description: string;
  descriptionTh: string;
}> = [
  {
    id: "ai-creator",
    title: "AI Creator",
    titleTh: "AI Creator",
    subtitle: "Prompt, Content, Portfolio",
    subtitleTh: "Prompt, Content, Portfolio",
    description: "Create AI-assisted content, visual ideas, and portfolio-ready work.",
    descriptionTh: "สร้างคอนเทนต์ ไอเดียภาพ และผลงานที่พร้อมต่อยอดเป็นแฟ้มสะสมผลงานด้วย AI"
  },
  {
    id: "ai-builder",
    title: "AI Builder",
    titleTh: "AI Builder",
    subtitle: "Website, App, AI Agent",
    subtitleTh: "Website, App, AI Agent",
    description: "Build websites, applications, and AI agent workflows.",
    descriptionTh: "สร้างเว็บไซต์ แอปพลิเคชัน และเวิร์กโฟลว์เอเจนต์ AI"
  },
  {
    id: "aiot-innovator",
    title: "AIoT Innovator",
    titleTh: "AIoT Innovator",
    subtitle: "Vision, Robotics, IoT",
    subtitleTh: "Vision, Robotics, IoT",
    description: "Connect AI with computer vision, robotics, sensors, and IoT prototypes.",
    descriptionTh: "เชื่อมต่อ AI กับคอมพิวเตอร์วิทัศน์ หุ่นยนต์ เซนเซอร์ และต้นแบบ IoT"
  },
  {
    id: "ai-business-innovator",
    title: "AI Business Innovator",
    titleTh: "AI Business Innovator",
    subtitle: "Data, Dashboard, Startup Pitch",
    subtitleTh: "Data, Dashboard, Startup Pitch",
    description: "Turn AI ideas into dashboards, business concepts, and startup pitches.",
    descriptionTh: "ต่อยอดไอเดีย AI เป็นแดชบอร์ด แนวคิดธุรกิจ และการนำเสนอแบบสตาร์ทอัป"
  }
];

export const activities: Activity[] = tracks.map((track, index) => ({
  id: track.id,
  trackId: track.id,
  title: `${track.title} Badge`,
  titleTh: `Badge: ${track.titleTh}`,
  xp: 0,
  order: index + 1
}));
