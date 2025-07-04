import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign, Users, Briefcase, Star, ChevronDown, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import JobCard from './JobCard';
import JobFilters from './JobFilters';
import CreateJobModal from './CreateJobModal';
import JobDetailsModal from './JobDetailsModal';
import { Job } from '../../types';

const JobsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    games: [] as string[],
    positions: [] as string[],
    experienceLevel: '',
    jobType: '',
    salaryRange: [0, 200000],
    location: '',
  });

  // Mock job data
  const mockJobs: Job[] = [
    {
      id: '1',
      title: 'Professional League of Legends ADC',
      description: 'We are looking for a skilled ADC player to join our competitive League of Legends team. Must have experience in ranked play and tournament participation.',
      requirements: ['Diamond+ rank', '2+ years competitive experience', 'Team player mentality', 'Available for practice 6 days/week'],
      company: 'Team Liquid',
      location: 'Los Angeles, CA',
      type: 'full-time',
      salary: { min: 80000, max: 150000, currency: 'USD' },
      games: ['League of Legends'],
      positions: ['ADC', 'Bot Lane'],
      experienceLevel: 'professional',
      createdAt: new Date('2024-01-15'),
      deadline: new Date('2024-02-15'),
      recruiterId: '2',
      status: 'open',
    },
    {
      id: '2',
      title: 'Valorant IGL & Support Coach',
      description: 'Seeking an experienced in-game leader and support coach for our Valorant competitive team. Leadership skills and strategic thinking required.',
      requirements: ['Immortal+ rank', 'IGL experience', 'Coaching background preferred', 'Strong communication skills'],
      company: 'Cloud9',
      location: 'Remote',
      type: 'contract',
      salary: { min: 60000, max: 100000, currency: 'USD' },
      games: ['Valorant'],
      positions: ['IGL', 'Support', 'Coach'],
      experienceLevel: 'advanced',
      createdAt: new Date('2024-01-12'),
      deadline: new Date('2024-02-10'),
      recruiterId: '2',
      status: 'open',
    },
    {
      id: '3',
      title: 'CS2 AWPer - Tournament Team',
      description: 'Professional CS2 team looking for a dedicated AWPer for upcoming tournament season. Must be available for bootcamps and international travel.',
      requirements: ['Global Elite rank', 'Professional AWP experience', 'Tournament participation', 'Passport for international travel'],
      company: 'FaZe Clan',
      location: 'Atlanta, GA',
      type: 'full-time',
      salary: { min: 100000, max: 200000, currency: 'USD' },
      games: ['Counter-Strike 2'],
      positions: ['AWPer', 'Sniper'],
      experienceLevel: 'professional',
      createdAt: new Date('2024-01-10'),
      deadline: new Date('2024-02-05'),
      recruiterId: '2',
      status: 'open',
    },
    {
      id: '4',
      title: 'Fortnite Content Creator & Competitor',
      description: 'Looking for a skilled Fortnite player who can compete in tournaments while creating engaging content for our social media channels.',
      requirements: ['Champion League experience', 'Content creation skills', 'Social media presence', 'Streaming experience'],
      company: '100 Thieves',
      location: 'Los Angeles, CA',
      type: 'part-time',
      salary: { min: 40000, max: 80000, currency: 'USD' },
      games: ['Fortnite'],
      positions: ['Content Creator', 'Competitor'],
      experienceLevel: 'advanced',
      createdAt: new Date('2024-01-08'),
      deadline: new Date('2024-02-01'),
      recruiterId: '2',
      status: 'open',
    },
    {
      id: '5',
      title: 'Rocket League Doubles Partner',
      description: 'Semi-professional Rocket League player seeking a doubles partner for RLCS qualifiers and regional tournaments.',
      requirements: ['Grand Champion rank', 'Tournament experience', 'Good chemistry', 'Consistent practice schedule'],
      company: 'NRG Esports',
      location: 'Chicago, IL',
      type: 'tournament',
      salary: { min: 20000, max: 50000, currency: 'USD' },
      games: ['Rocket League'],
      positions: ['Doubles Partner'],
      experienceLevel: 'advanced',
      createdAt: new Date('2024-01-05'),
      deadline: new Date('2024-01-25'),
      recruiterId: '2',
      status: 'open',
    },
    {
      id: '6',
      title: 'Apex Legends Squad Member',
      description: 'Competitive Apex Legends team looking for a third member to complete our squad for the upcoming ALGS season.',
      requirements: ['Master+ rank', 'Team experience', 'Good communication', 'Flexible role playing'],
      company: 'TSM',
      location: 'Remote',
      type: 'contract',
      salary: { min: 30000, max: 70000, currency: 'USD' },
      games: ['Apex Legends'],
      positions: ['Squad Member'],
      experienceLevel: 'advanced',
      createdAt: new Date('2024-01-03'),
      deadline: new Date('2024-01-30'),
      recruiterId: '2',
      status: 'open',
    },
  ];

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.games.some(game => game.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesGames = filters.games.length === 0 || 
                        filters.games.some(game => job.games.includes(game));
    
    const matchesPositions = filters.positions.length === 0 || 
                            filters.positions.some(pos => job.positions.includes(pos));
    
    const matchesExperience = !filters.experienceLevel || 
                             job.experienceLevel === filters.experienceLevel;
    
    const matchesJobType = !filters.jobType || job.type === filters.jobType;
    
    const matchesSalary = job.salary.min >= filters.salaryRange[0] && 
                         job.salary.max <= filters.salaryRange[1];
    
    const matchesLocation = !filters.location || 
                           job.location.toLowerCase().includes(filters.location.toLowerCase());

    return matchesSearch && matchesGames && matchesPositions && 
           matchesExperience && matchesJobType && matchesSalary && matchesLocation;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'salary-high':
        return b.salary.max - a.salary.max;
      case 'salary-low':
        return a.salary.max - b.salary.max;
      case 'deadline':
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass rounded-2xl p-8 card-3d">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-space font-bold text-white mb-2">
              Esports Jobs Portal
            </h1>
            <p className="text-gray-400 text-lg">
              Discover opportunities in competitive gaming and esports
            </p>
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-accent-purple" />
                <span className="text-white font-medium">{mockJobs.length} Active Jobs</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-accent-blue" />
                <span className="text-white font-medium">500+ Companies</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-accent-green" />
                <span className="text-white font-medium">95% Success Rate</span>
              </div>
            </div>
          </div>
          {user?.type === 'recruiter' && (
            <button
              onClick={() => setShowCreateJob(true)}
              className="neon-button flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Post New Job</span>
            </button>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="glass rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs, companies, or games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="salary-high">Highest Salary</option>
              <option value="salary-low">Lowest Salary</option>
              <option value="deadline">Deadline Soon</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-colors ${
              showFilters
                ? 'bg-accent-purple/20 border-accent-purple/50 text-accent-purple'
                : 'bg-white/5 border-white/10 text-gray-300 hover:text-white hover:border-white/20'
            }`}
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <JobFilters filters={filters} onFiltersChange={setFilters} />
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-400">
          Showing {sortedJobs.length} of {mockJobs.length} jobs
        </p>
        {(searchTerm || Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f)) && (
          <button
            onClick={() => {
              setSearchTerm('');
              setFilters({
                games: [],
                positions: [],
                experienceLevel: '',
                jobType: '',
                salaryRange: [0, 200000],
                location: '',
              });
            }}
            className="text-accent-purple hover:text-accent-blue transition-colors text-sm font-medium"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onClick={() => setSelectedJob(job)}
          />
        ))}
      </div>

      {sortedJobs.length === 0 && (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-space font-bold text-white mb-2">No jobs found</h3>
          <p className="text-gray-400 mb-6">
            Try adjusting your search criteria or filters to find more opportunities.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilters({
                games: [],
                positions: [],
                experienceLevel: '',
                jobType: '',
                salaryRange: [0, 200000],
                location: '',
              });
            }}
            className="neon-button"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Modals */}
      {showCreateJob && (
        <CreateJobModal
          onClose={() => setShowCreateJob(false)}
          onJobCreated={(job) => {
            // In a real app, this would update the jobs list
            console.log('New job created:', job);
            setShowCreateJob(false);
          }}
        />
      )}

      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApply={(jobId, application) => {
            // In a real app, this would submit the application
            console.log('Application submitted:', { jobId, application });
            setSelectedJob(null);
          }}
        />
      )}
    </div>
  );
};

export default JobsPage;