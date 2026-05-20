export type TrackId = "ai-creator" | "ai-builder" | "aiot-innovator" | "robotics";

export type Registration = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  school: string;
  educationLevel: string;
  interestedTrack: TrackId;
  discordUsername: string;
  status: "pending" | "confirmed" | "waitlist";
  createdAt: string;
};

export type User = Registration & {
  passwordHash: string;
  role: "student" | "admin";
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
    titleTh: "ผู้สร้างสรรค์ด้วยปัญญาประดิษฐ์",
    subtitle: "Prompt, Content, Portfolio",
    subtitleTh: "พรอมป์ คอนเทนต์ และแฟ้มสะสมผลงาน",
    description: "Create visual stories, AI-assisted content, and a polished portfolio.",
    descriptionTh: "เรียนรู้การสร้างสรรค์ผลงานดิจิทัลด้วย AI อย่างมีหลักการ พร้อมพัฒนาแฟ้มสะสมผลงานที่นำเสนอได้จริง"
  },
  {
    id: "ai-builder",
    title: "AI Builder",
    titleTh: "นักพัฒนาแอปพลิเคชัน AI",
    subtitle: "Website, App, AI Agent",
    subtitleTh: "เว็บไซต์ แอปพลิเคชัน และเอเจนต์ AI",
    description: "Ship your first AI web app and learn how agents connect real workflows.",
    descriptionTh: "พัฒนาเว็บแอปพลิเคชัน AI และเข้าใจการเชื่อมต่อเอเจนต์เข้ากับกระบวนการทำงานจริง"
  },
  {
    id: "aiot-innovator",
    title: "AIoT Innovator",
    titleTh: "นวัตกร AIoT",
    subtitle: "Vision, Robotics, IoT",
    subtitleTh: "คอมพิวเตอร์วิทัศน์ หุ่นยนต์ และ IoT",
    description: "Combine sensors, cameras, and intelligent automation into prototypes.",
    descriptionTh: "บูรณาการเซนเซอร์ กล้อง หุ่นยนต์ และระบบอัตโนมัติอัจฉริยะเพื่อสร้างต้นแบบนวัตกรรม"
  },
  {
    id: "robotics",
    title: "Robotics Laboratory",
    titleTh: "ปฏิบัติการหุ่นยนต์",
    subtitle: "Embedded Systems, Control, Automation",
    subtitleTh: "ระบบฝังตัว การควบคุม และระบบอัตโนมัติ",
    description: "Explore robotics control, embedded prototyping, and autonomous laboratory workflows.",
    descriptionTh: "เรียนรู้การควบคุมหุ่นยนต์ การสร้างต้นแบบระบบฝังตัว และกระบวนการอัตโนมัติในห้องปฏิบัติการ"
  }
];

export const activities: Activity[] = [
  { id: "orientation", trackId: "ai-builder", title: "Laboratory Orientation", titleTh: "ปฐมนิเทศห้องปฏิบัติการ", xp: 100, order: 1 },
  { id: "prompt-engineering", trackId: "ai-builder", title: "Prompt Engineering Studio", titleTh: "ปฏิบัติการออกแบบพรอมป์", xp: 150, order: 2 },
  { id: "web-ai-prototype", trackId: "ai-builder", title: "AI Web Prototype", titleTh: "ต้นแบบเว็บแอปพลิเคชัน AI", xp: 200, order: 3 },
  { id: "agent-workflow", trackId: "ai-builder", title: "Agent Workflow Integration", titleTh: "การบูรณาการเวิร์กโฟลว์เอเจนต์", xp: 250, order: 4 },
  { id: "aiot-sensors", trackId: "aiot-innovator", title: "Sensor Intelligence", titleTh: "ระบบเซนเซอร์อัจฉริยะ", xp: 180, order: 1 },
  { id: "robot-vision", trackId: "robotics", title: "Robot Vision Mission", titleTh: "ภารกิจคอมพิวเตอร์วิทัศน์สำหรับหุ่นยนต์", xp: 220, order: 1 },
  { id: "portfolio-review", trackId: "ai-creator", title: "AI Portfolio Review", titleTh: "การพิจารณาแฟ้มสะสมผลงาน AI", xp: 160, order: 1 }
];
