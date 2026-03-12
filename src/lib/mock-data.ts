export interface Player {
  id: string;
  name: string;
  position: string;
  jerseyNumber: number;
  headshot: string;
  recruitingStatus: "Available" | "Committed" | "Exploring";
  bio: string;
  age: number;
  year: string;
  hometown: string;
  school: string;
  height: string;
  weight: string;
  stats: {
    season: string;
    gamesPlayed: number;
    goals: number;
    assists: number;
  }[];
  videos: {
    id: string;
    title: string;
    url: string;
    views: number;
    isPinned: boolean;
  }[];
  achievements: string[];
  competitions: string[];
  coachReferences: { name: string; contact: string }[];
  profileViews: number;
  scoutViews: { scoutName: string; org: string; date: string }[];
}

export const mockPlayers: Player[] = [
  {
    id: "p1",
    name: "James Rodriguez",
    position: "CAM",
    jerseyNumber: 11,
    headshot: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop",
    recruitingStatus: "Available",
    bio: "Creative attacking midfielder with exceptional vision and passing range.",
    age: 17,
    year: "2026",
    hometown: "Austin, TX",
    school: "Westlake High School",
    height: "5'10\"",
    weight: "155 lbs",
    stats: [
      { season: "2025-26", gamesPlayed: 22, goals: 14, assists: 18 },
    ],
    videos: [
      { id: "v1", title: "Senior Year Highlights", url: "https://www.youtube.com/embed/RANzfjekkAw", views: 1247, isPinned: true },
    ],
    achievements: ["2x All-State Selection", "Regional ODP Team"],
    competitions: ["ECNL Southwest", "Dallas Cup"],
    coachReferences: [{ name: "Coach David Miller", contact: "d.miller@westlakehs.edu" }],
    profileViews: 3421,
    scoutViews: [],
  },
  {
    id: "p2",
    name: "Marcus Williams",
    position: "LB",
    jerseyNumber: 3,
    headshot: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop",
    recruitingStatus: "Exploring",
    bio: "Quick and technical left-back with strong overlapping runs.",
    age: 16,
    year: "2027",
    hometown: "Miami, FL",
    school: "Coral Gables High",
    height: "5'8\"",
    weight: "148 lbs",
    stats: [
      { season: "2025-26", gamesPlayed: 19, goals: 2, assists: 9 },
    ],
    videos: [
      { id: "v4", title: "Defensive Highlights", url: "https://www.youtube.com/embed/RANzfjekkAw", views: 567, isPinned: true },
    ],
    achievements: ["All-County First Team"],
    competitions: ["ECNL Southeast"],
    coachReferences: [{ name: "Coach Rivera", contact: "rivera@cghs.edu" }],
    profileViews: 1890,
    scoutViews: [],
  },
  {
    id: "p3",
    name: "Kai Nakamura",
    position: "ST",
    jerseyNumber: 9,
    headshot: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    recruitingStatus: "Available",
    bio: "Clinical finisher with pace and aerial ability.",
    age: 17,
    year: "2026",
    hometown: "Seattle, WA",
    school: "Lakeside Academy",
    height: "6'1\"",
    weight: "170 lbs",
    stats: [
      { season: "2025-26", gamesPlayed: 21, goals: 22, assists: 6 },
    ],
    videos: [
      { id: "v5", title: "22 Goals in 21 Games", url: "https://www.youtube.com/embed/RANzfjekkAw", views: 2103, isPinned: true },
    ],
    achievements: ["Golden Boot - State League"],
    competitions: ["MLS NEXT"],
    coachReferences: [{ name: "Coach Tanaka", contact: "tanaka@lakeside.edu" }],
    profileViews: 4521,
    scoutViews: [],
  },
  {
    id: "p4",
    name: "Diego Santos",
    position: "CDM",
    jerseyNumber: 6,
    headshot: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop",
    recruitingStatus: "Available",
    bio: "Commanding defensive midfielder with elite passing range.",
    age: 16,
    year: "2027",
    hometown: "Houston, TX",
    school: "Memorial High School",
    height: "5'11\"",
    weight: "162 lbs",
    stats: [
      { season: "2025-26", gamesPlayed: 20, goals: 3, assists: 11 },
    ],
    videos: [
      { id: "v6", title: "Midfield Masterclass", url: "https://www.youtube.com/embed/RANzfjekkAw", views: 891, isPinned: true },
    ],
    achievements: ["All-District MVP"],
    competitions: ["ECNL Texas"],
    coachReferences: [{ name: "Coach Hernandez", contact: "hernandez@mhs.edu" }],
    profileViews: 2134,
    scoutViews: [],
  },
  {
    id: "p5",
    name: "Ethan Brooks",
    position: "GK",
    jerseyNumber: 1,
    headshot: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop",
    recruitingStatus: "Committed",
    bio: "Shot-stopper with commanding presence.",
    age: 18,
    year: "2025",
    hometown: "Denver, CO",
    school: "Cherry Creek HS",
    height: "6'3\"",
    weight: "185 lbs",
    stats: [
      { season: "2025-26", gamesPlayed: 22, goals: 0, assists: 1 },
    ],
    videos: [
      { id: "v7", title: "Save Compilation", url: "https://www.youtube.com/embed/RANzfjekkAw", views: 1567, isPinned: true },
    ],
    achievements: ["All-State GK of the Year"],
    competitions: ["ECNL National Playoffs"],
    coachReferences: [{ name: "Coach Barrett", contact: "barrett@cchs.edu" }],
    profileViews: 3012,
    scoutViews: [],
  },
];
