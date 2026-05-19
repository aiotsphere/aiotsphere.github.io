export type TrackId = "ai-creator" | "ai-builder" | "aiot-innovator" | "ai-business";

export type Registration = {
  id: string;
  user_id: string | null;
  first_name: string;
  last_name: string;
  email: string;
  school: string;
  education_level: string;
  interested_track: TrackId;
  status: "pending" | "confirmed" | "waitlist";
  created_at: string;
};

export const tracks: Array<{
  id: TrackId;
  title: string;
  subtitle: string;
  description: string;
}> = [
  {
    id: "ai-creator",
    title: "AI Creator",
    subtitle: "Prompt, Content, Portfolio",
    description: "Create visual stories, AI-assisted content, and a polished portfolio."
  },
  {
    id: "ai-builder",
    title: "AI Builder",
    subtitle: "Website, App, AI Agent",
    description: "Ship your first AI web app and learn how agents connect real workflows."
  },
  {
    id: "aiot-innovator",
    title: "AIoT Innovator",
    subtitle: "Vision, Robotics, IoT",
    description: "Combine sensors, cameras, and intelligent automation into prototypes."
  },
  {
    id: "ai-business",
    title: "AI Business Innovator",
    subtitle: "Data, Dashboard, Startup Pitch",
    description: "Turn data into insight, dashboards, and a convincing innovation pitch."
  }
];
