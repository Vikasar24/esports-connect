import React from 'react';
import { X } from 'lucide-react';

interface JobFiltersProps {
  filters: {
    games: string[];
    positions: string[];
    experienceLevel: string;
    jobType: string;
    salaryRange: number[];
    location: string;
  };
  onFiltersChange: (filters: any) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ filters, onFiltersChange }) => {
  const games = [
    'League of Legends', 'Valorant', 'Counter-Strike 2', 'Dota 2', 
    'Fortnite', 'Apex Legends', 'Rocket League', 'Overwatch 2'
  ];

  const positions = [
    'ADC', 'Support', 'Mid Lane', 'Jungle', 'Top Lane', 'IGL', 
    'Entry Fragger', 'AWPer', 'Coach', 'Analyst', 'Content Creator'
  ];

  const experienceLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'professional', label: 'Professional' }
  ];

  const jobTypes = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'tournament', label: 'Tournament' }
  ];

  const updateFilters = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const toggleArrayFilter = (key: string, value: string) => {
    const currentArray = filters[key as keyof typeof filters] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilters(key, newArray);
  };

  return (
    <div className="space-y-6">
      {/* Games */}
      <div>
        <h3 className="text-white font-medium mb-3">Games</h3>
        <div className="flex flex-wrap gap-2">
          {games.map((game) => (
            <button
              key={game}
              onClick={() => toggleArrayFilter('games', game)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.games.includes(game)
                  ? 'bg-accent-purple text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {game}
            </button>
          ))}
        </div>
      </div>

      {/* Positions */}
      <div>
        <h3 className="text-white font-medium mb-3">Positions</h3>
        <div className="flex flex-wrap gap-2">
          {positions.map((position) => (
            <button
              key={position}
              onClick={() => toggleArrayFilter('positions', position)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.positions.includes(position)
                  ? 'bg-accent-blue text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {position}
            </button>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div>
        <h3 className="text-white font-medium mb-3">Experience Level</h3>
        <div className="flex flex-wrap gap-2">
          {experienceLevels.map((level) => (
            <button
              key={level.value}
              onClick={() => updateFilters('experienceLevel', 
                filters.experienceLevel === level.value ? '' : level.value
              )}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.experienceLevel === level.value
                  ? 'bg-accent-green text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Job Type */}
      <div>
        <h3 className="text-white font-medium mb-3">Job Type</h3>
        <div className="flex flex-wrap gap-2">
          {jobTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => updateFilters('jobType', 
                filters.jobType === type.value ? '' : type.value
              )}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.jobType === type.value
                  ? 'bg-accent-orange text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Salary Range */}
      <div>
        <h3 className="text-white font-medium mb-3">Salary Range</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="200000"
              step="5000"
              value={filters.salaryRange[0]}
              onChange={(e) => updateFilters('salaryRange', [parseInt(e.target.value), filters.salaryRange[1]])}
              className="flex-1 accent-accent-purple"
            />
            <span className="text-white text-sm w-16">${(filters.salaryRange[0] / 1000).toFixed(0)}k</span>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="200000"
              step="5000"
              value={filters.salaryRange[1]}
              onChange={(e) => updateFilters('salaryRange', [filters.salaryRange[0], parseInt(e.target.value)])}
              className="flex-1 accent-accent-purple"
            />
            <span className="text-white text-sm w-16">${(filters.salaryRange[1] / 1000).toFixed(0)}k</span>
          </div>
          <div className="text-center text-gray-400 text-sm">
            ${(filters.salaryRange[0] / 1000).toFixed(0)}k - ${(filters.salaryRange[1] / 1000).toFixed(0)}k
          </div>
        </div>
      </div>

      {/* Location */}
      <div>
        <h3 className="text-white font-medium mb-3">Location</h3>
        <input
          type="text"
          placeholder="Enter city, state, or 'Remote'"
          value={filters.location}
          onChange={(e) => updateFilters('location', e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors"
        />
      </div>
    </div>
  );
};

export default JobFilters;