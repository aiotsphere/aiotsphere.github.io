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
  titleZh: string;
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
  titleZh: string;
  subtitle: string;
  subtitleTh: string;
  subtitleZh: string;
  description: string;
  descriptionTh: string;
  descriptionZh: string;
}> = [
  {
    id: "ai-creator",
    title: "AI Creator",
    titleTh: "AI Creator",
    titleZh: "AI Creator",
    subtitle: "Prompt, Content, Portfolio",
    subtitleTh: "Prompt, Content, Portfolio",
    subtitleZh: "提示词、内容、作品集",
    description: "Create AI-assisted content, visual ideas, and portfolio-ready work.",
    descriptionTh: "สร้างคอนเทนต์ ไอเดียภาพ และผลงานที่พร้อมต่อยอดเป็นแฟ้มสะสมผลงานด้วย AI",
    descriptionZh: "使用 AI 创建内容、视觉创意和可用于作品集的成果。"
  },
  {
    id: "ai-builder",
    title: "AI Builder",
    titleTh: "AI Builder",
    titleZh: "AI Builder",
    subtitle: "Website, App, AI Agent",
    subtitleTh: "Website, App, AI Agent",
    subtitleZh: "网站、应用、AI Agent",
    description: "Build websites, applications, and AI agent workflows.",
    descriptionTh: "สร้างเว็บไซต์ แอปพลิเคชัน และเวิร์กโฟลว์เอเจนต์ AI",
    descriptionZh: "构建网站、应用程序和 AI Agent 工作流。"
  },
  {
    id: "aiot-innovator",
    title: "AIoT Innovator",
    titleTh: "AIoT Innovator",
    titleZh: "AIoT Innovator",
    subtitle: "Vision, Robotics, IoT",
    subtitleTh: "Vision, Robotics, IoT",
    subtitleZh: "视觉、机器人、IoT",
    description: "Connect AI with computer vision, robotics, sensors, and IoT prototypes.",
    descriptionTh: "เชื่อมต่อ AI กับคอมพิวเตอร์วิทัศน์ หุ่นยนต์ เซนเซอร์ และต้นแบบ IoT",
    descriptionZh: "将 AI 与计算机视觉、机器人、传感器和 IoT 原型连接起来。"
  },
  {
    id: "ai-business-innovator",
    title: "AI Business Innovator",
    titleTh: "AI Business Innovator",
    titleZh: "AI Business Innovator",
    subtitle: "Data, Dashboard, Startup Pitch",
    subtitleTh: "Data, Dashboard, Startup Pitch",
    subtitleZh: "数据、仪表板、创业路演",
    description: "Turn AI ideas into dashboards, business concepts, and startup pitches.",
    descriptionTh: "ต่อยอดไอเดีย AI เป็นแดชบอร์ด แนวคิดธุรกิจ และการนำเสนอแบบสตาร์ทอัป",
    descriptionZh: "将 AI 想法发展为仪表板、商业概念和创业路演。"
  }
];

export const activities: Activity[] = tracks.map((track, index) => ({
  id: track.id,
  trackId: track.id,
  title: `${track.title} Badge`,
  titleTh: `Badge: ${track.titleTh}`,
  titleZh: `徽章：${track.titleZh}`,
  xp: 0,
  order: index + 1
}));
