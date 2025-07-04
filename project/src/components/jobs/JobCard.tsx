import React from 'react';
import { MapPin, Clock, DollarSign, Users, Calendar, Star, Trophy } from 'lucide-react';
import { Job } from '../../types';

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const formatSalary = (min: number, max: number, currency: string) => {
    const formatNumber = (num: number) => {
      if (num >= 1000) {
        return `${(num / 1000).toFixed(0)}k`;
      }
      return num.toString();
    };
    return `$${formatNumber(min)} - $${formatNumber(max)} ${currency}`;
  };

  const getExperienceColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'text-green-400 bg-green-400/20';
      case 'intermediate': return 'text-blue-400 bg-blue-400/20';
      case 'advanced': return 'text-purple-400 bg-purple-400/20';
      case 'professional': return 'text-orange-400 bg-orange-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'text-green-400 bg-green-400/20';
      case 'part-time': return 'text-blue-400 bg-blue-400/20';
      case 'contract': return 'text-purple-400 bg-purple-400/20';
      case 'tournament': return 'text-orange-400 bg-orange-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const daysUntilDeadline = Math.ceil(
    (new Date(job.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div
      onClick={onClick}
      className="glass rounded-xl p-6 card-3d hover-lift cursor-pointer group transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-space font-bold text-white mb-2 group-hover:text-gradient transition-colors">
            {job.title}
          </h3>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-purple to-accent-blue rounded-lg flex items-center justify-center">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-medium">{job.company}</span>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.type)}`}>
            {job.type.replace('-', ' ')}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExperienceColor(job.experienceLevel)}`}>
            {job.experienceLevel}
          </span>
        </div>
      </div>

      {/* Games and Positions */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-2">
          {job.games.map((game, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-accent-purple/20 text-accent-purple rounded-full text-sm font-medium"
            >
              {game}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {job.positions.slice(0, 2).map((position, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-full text-sm font-medium"
            >
              {position}
            </span>
          ))}
          {job.positions.length > 2 && (
            <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full text-sm font-medium">
              +{job.positions.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
        {job.description}
      </p>

      {/* Job Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2 text-sm">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-gray-300">{job.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <span className="text-gray-300">{formatSalary(job.salary.min, job.salary.max, job.salary.currency)}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className={`${daysUntilDeadline <= 7 ? 'text-red-400' : 'text-gray-300'}`}>
            {daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : 'Deadline passed'}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>{new Date(job.createdAt).toLocaleDateString()}</span>
        </div>
        <button className="text-accent-purple hover:text-accent-blue transition-colors font-medium text-sm">
          View Details →
        </button>
      </div>
    </div>
  );
};

export default JobCard;