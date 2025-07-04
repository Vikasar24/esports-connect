import React, { useState } from 'react';
import { X, MapPin, Clock, DollarSign, Calendar, Users, Trophy, Send, Star } from 'lucide-react';
import { Job, JobApplication } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface JobDetailsModalProps {
  job: Job;
  onClose: () => void;
  onApply: (jobId: string, application: Omit<JobApplication, 'id' | 'jobId' | 'playerId' | 'appliedAt' | 'status'>) => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, onClose, onApply }) => {
  const { user } = useAuth();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverLetter.trim()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onApply(job.id, { coverLetter });
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-purple to-accent-blue rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-space font-bold text-white">{job.title}</h2>
                  <p className="text-accent-purple font-medium">{job.company}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getJobTypeColor(job.type)}`}>
                  {job.type.replace('-', ' ')}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getExperienceColor(job.experienceLevel)}`}>
                  {job.experienceLevel}
                </span>
                <div className="flex items-center space-x-1 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="p-6 space-y-6">
            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                <MapPin className="w-5 h-5 text-accent-purple" />
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-white font-medium">{job.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                <DollarSign className="w-5 h-5 text-accent-green" />
                <div>
                  <p className="text-sm text-gray-400">Salary</p>
                  <p className="text-white font-medium">{formatSalary(job.salary.min, job.salary.max, job.salary.currency)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                <Clock className="w-5 h-5 text-accent-orange" />
                <div>
                  <p className="text-sm text-gray-400">Deadline</p>
                  <p className={`font-medium ${daysUntilDeadline <= 7 ? 'text-red-400' : 'text-white'}`}>
                    {daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : 'Expired'}
                  </p>
                </div>
              </div>
            </div>

            {/* Games and Positions */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-space font-bold text-white mb-3">Games</h3>
                <div className="flex flex-wrap gap-2">
                  {job.games.map((game, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-accent-purple/20 text-accent-purple rounded-lg font-medium"
                    >
                      {game}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-space font-bold text-white mb-3">Positions</h3>
                <div className="flex flex-wrap gap-2">
                  {job.positions.map((position, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-lg font-medium"
                    >
                      {position}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-space font-bold text-white mb-3">Job Description</h3>
              <p className="text-gray-300 leading-relaxed">{job.description}</p>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-lg font-space font-bold text-white mb-3">Requirements</h3>
              <ul className="space-y-2">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Star className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Application Form */}
            {showApplicationForm && user?.type === 'player' && (
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-space font-bold text-white mb-4">Apply for this Position</h3>
                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Cover Letter *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors resize-none"
                      placeholder="Tell us why you're the perfect fit for this role. Include your relevant experience, achievements, and what you can bring to the team..."
                    />
                  </div>
                  <div className="flex items-center justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowApplicationForm(false)}
                      className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !coverLetter.trim()}
                      className="neon-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Submit Application</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>Posted by {job.company}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            {user?.type === 'player' && !showApplicationForm && daysUntilDeadline > 0 && (
              <button
                onClick={() => setShowApplicationForm(true)}
                className="neon-button flex items-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Apply Now</span>
              </button>
            )}
            {user?.type === 'recruiter' && (
              <div className="text-sm text-gray-400">
                You posted this job
              </div>
            )}
            {daysUntilDeadline <= 0 && (
              <div className="text-sm text-red-400 font-medium">
                Application deadline has passed
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;