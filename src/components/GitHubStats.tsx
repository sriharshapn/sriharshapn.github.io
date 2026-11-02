import React, { useState, useEffect } from 'react';
import { Star, BookOpen, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon } from './SocialIcons';

interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

const fallbackProfile: GitHubProfile = {
  login: "sriharshapn",
  name: "Sri Harsha Penugondla Nagaraja",
  avatar_url: "https://avatars.githubusercontent.com/u/237099324?v=4",
  public_repos: 9,
  followers: 2,
  following: 4,
  created_at: "2025-10-09T17:48:40Z",
};

interface PinnedRepo {
  name: string;
  displayName?: string;
  description: string;
  language: string;
  url: string;
  stars?: number;
}

// Curated authentic repositories excluding restricted repos (Nasiko & RocketRide)
const showcaseRepos: PinnedRepo[] = [
  {
    name: "paarakhmetric",
    description: "AI-assisted Legal Metrology compliance inspection platform analyzing commodity labels against 2011 regulatory rules.",
    language: "TypeScript",
    url: "https://github.com/Shreyas-M007/paarakhmetric"
  },
  {
    name: "KisanSathi",
    description: "AI agricultural platform uniting crop diagnosis, satellite vegetation data, and meteorological insights.",
    language: "TypeScript",
    url: "https://github.com/sriharshapn/KisanSathi",
    stars: 1
  },
  {
    name: "Jan-Sathi",
    description: "Rapid 3-hour hackathon civic issue reporting system with multimodal Gemini AI triage workflow.",
    language: "TypeScript",
    url: "https://github.com/Shreyas-M007/Jan-Sathi"
  },
  {
    name: "Drone-Aero-Lab",
    description: "DJI-referenced quadcopter simulation and aerospace engineering testbed with 3D visualization.",
    language: "JavaScript",
    url: "https://github.com/Shreyas-M007/Drone-Aero-Lab"
  },
  {
    name: "saree-godown-app",
    displayName: "Udupu (Inventory System)",
    description: "Clothing inventory showcase and sales analytics dashboard built on Google Apps Script and React.",
    language: "JavaScript",
    url: "https://github.com/sriharshapn/saree-godown-app"
  },
  {
    name: "College-event-Manager",
    description: "Student registration system with dynamic QR generation and camera-based attendance marking.",
    language: "JavaScript",
    url: "https://github.com/sriharshapn/College-event-Manager"
  },
  {
    name: "two-body-problem",
    description: "Gravitational simulation with velocity-Verlet numerical integration and energy conservation plots.",
    language: "Python",
    url: "https://github.com/sriharshapn/two-body-problem"
  },
  {
    name: "Presentation",
    displayName: "C Travel Budget Planner",
    description: "Academic AAT travel budget planner with multi-currency conversion tables written in C.",
    language: "C",
    url: "https://github.com/sriharshapn/Presentation",
    stars: 2
  }
];

export const GitHubStats: React.FC = () => {
  const [profile, setProfile] = useState<GitHubProfile>(fallbackProfile);
  const [isLive, setIsLive] = useState<boolean>(false);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const res = await fetch(`https://api.github.com/users/${personalInfo.github.split('/').pop()}`, {
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          setProfile({
            login: data.login,
            name: data.name || fallbackProfile.name,
            avatar_url: data.avatar_url || fallbackProfile.avatar_url,
            public_repos: data.public_repos ?? fallbackProfile.public_repos,
            followers: data.followers ?? fallbackProfile.followers,
            following: data.following ?? fallbackProfile.following,
            created_at: data.created_at || fallbackProfile.created_at
          });
          setIsLive(true);
        }
      } catch {
        // Graceful fallback to static verified data
        setIsLive(false);
      }
    };

    fetchGitHubData();
  }, []);

  const formatYear = (isoDate: string) => {
    try {
      return new Date(isoDate).getFullYear();
    } catch {
      return '2025';
    }
  };

  return (
    <section className="py-20 lg:py-24 relative border-t border-slate-900 bg-[#080B11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
              <GithubIcon className="w-3.5 h-3.5" />
              <span>SOURCE CODE REPOSITORIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              GitHub Profile & Repositories
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-mono">
              Direct links to open-source contributions, hackathon sprints, and engineering codebases.
            </p>
          </div>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-200 hover:text-white transition-all shadow-sm"
          >
            <GithubIcon className="w-4 h-4 text-emerald-400" />
            <span>github.com/{profile.login}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </a>
        </div>

        {/* GitHub Overview Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900/60 via-slate-900/40 to-slate-950/80 border border-slate-800 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center space-x-4">
            <img
              src={profile.avatar_url}
              alt={profile.name}
              className="w-16 h-16 rounded-2xl border-2 border-slate-800 shadow-md bg-slate-800"
              loading="lazy"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {profile.name}
                </h3>
                {isLive && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                    Live Synced
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-slate-400">
                @{profile.login} • Active Developer on GitHub since {formatYear(profile.created_at)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6 sm:space-x-8 text-center border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-8 w-full md:w-auto justify-around md:justify-start">
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                {profile.public_repos}
              </div>
              <div className="text-[11px] font-mono uppercase text-slate-400 mt-0.5">
                Repositories
              </div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                {profile.followers}
              </div>
              <div className="text-[11px] font-mono uppercase text-slate-400 mt-0.5">
                Followers
              </div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-violet-400">
                {profile.following}
              </div>
              <div className="text-[11px] font-mono uppercase text-slate-400 mt-0.5">
                Following
              </div>
            </div>
          </div>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {showcaseRepos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-xl bg-slate-900/30 hover:bg-slate-900/70 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-xs font-mono font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="truncate">{repo.displayName || repo.name}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300 transition-colors shrink-0" />
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 font-normal">
                  {repo.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${
                    repo.language === 'Python' ? 'bg-blue-400' :
                    repo.language === 'TypeScript' ? 'bg-sky-400' :
                    repo.language === 'JavaScript' ? 'bg-amber-400' :
                    repo.language === 'C' ? 'bg-violet-400' : 'bg-emerald-400'
                  }`} />
                  <span>{repo.language}</span>
                </span>

                {repo.stars !== undefined && repo.stars > 0 && (
                  <span className="flex items-center gap-1 text-slate-400">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{repo.stars}</span>
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
