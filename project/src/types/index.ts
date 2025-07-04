export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  type: 'player' | 'recruiter';
  createdAt: Date;
}

export interface Player extends User {
  type: 'player';
  profile: PlayerProfile;
}

export interface Recruiter extends User {
  type: 'recruiter';
  company: string;
  position: string;
}

export interface PlayerProfile {
  displayName: string;
  bio: string;
  games: GameSkill[];
  achievements: Achievement[];
  socialLinks: SocialLinks;
  availability: 'available' | 'busy' | 'unavailable';
  preferredRoles: string[];
  experience: 'beginner' | 'intermediate' | 'advanced' | 'professional';
}

export interface GameSkill {
  game: string;
  skill: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'professional';
  rank?: string;
  hoursPlayed: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  game: string;
  date: Date;
  type: 'tournament' | 'ranking' | 'skill' | 'team';
  verified: boolean;
  image?: string;
}

export interface SocialLinks {
  twitch?: string;
  youtube?: string;
  twitter?: string;
  discord?: string;
  steam?: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'tournament';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  games: string[];
  positions: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  createdAt: Date;
  deadline: Date;
  recruiterId: string;
  status: 'open' | 'closed' | 'filled';
}

export interface JobApplication {
  id: string;
  jobId: string;
  playerId: string;
  coverLetter: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  appliedAt: Date;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  images?: string[];
  likes: number;
  comments: Comment[];
  createdAt: Date;
  type: 'achievement' | 'highlight' | 'discussion' | 'recruitment';
}

export interface Comment {
  id: string;
  authorId: string;
  content: string;
  createdAt: Date;
  likes: number;
}