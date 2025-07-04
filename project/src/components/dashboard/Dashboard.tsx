import React from 'react';
import { Trophy, Users, Briefcase, TrendingUp, Calendar, Star, Award, Target } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  const isPlayer = user?.type === 'player';

  const playerStats = [
    { label: 'Profile Views', value: '1,234', change: '+12%', icon: Users, color: 'purple' },
    { label: 'Applications', value: '23', change: '+5%', icon: Briefcase, color: 'blue' },
    { label: 'Achievements', value: '15', change: '+2', icon: Trophy, color: 'green' },
    { label: 'Rank Score', value: '2,847', change: '+156', icon: Star, color: 'orange' },
  ];

  const recruiterStats = [
    { label: 'Active Jobs', value: '8', change: '+2%', icon: Briefcase, color: 'purple' },
    { label: 'Applications', value: '127', change: '+18%', icon: Users, color: 'blue' },
    { label: 'Hired Players', value: '12', change: '+3', icon: Trophy, color: 'green' },
    { label: 'Success Rate', value: '94%', change: '+5%', icon: Target, color: 'orange' },
  ];

  const stats = isPlayer ? playerStats : recruiterStats;

  const recentActivities = [
    {
      id: 1,
      type: isPlayer ? 'application' : 'job',
      title: isPlayer ? 'Applied to Team Liquid - Support Role' : 'New application for Mid Lane position',
      time: '2 hours ago',
      status: isPlayer ? 'pending' : 'new',
    },
    {
      id: 2,
      type: isPlayer ? 'achievement' : 'hire',
      title: isPlayer ? 'Reached Diamond rank in League of Legends' : 'Hired ProGamer123 as ADC',
      time: '1 day ago',
      status: isPlayer ? 'completed' : 'completed',
    },
    {
      id: 3,
      type: isPlayer ? 'profile' : 'job',
      title: isPlayer ? 'Profile viewed by FaZe Clan recruiter' : 'Posted new job: Jungle Position',
      time: '2 days ago',
      status: isPlayer ? 'viewed' : 'active',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="glass rounded-2xl p-8 card-3d">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-space font-bold text-white mb-2">
              Welcome back, {user?.username}! 👋
            </h1>
            <p className="text-gray-400 text-lg">
              {isPlayer 
                ? "Ready to showcase your skills and find your next opportunity?"
                : "Manage your job postings and discover top talent."
              }
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="neon-button">
              {isPlayer ? 'Update Profile' : 'Post New Job'}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            purple: 'from-accent-purple/20 to-accent-purple/5 border-accent-purple/20 text-accent-purple',
            blue: 'from-accent-blue/20 to-accent-blue/5 border-accent-blue/20 text-accent-blue',
            green: 'from-accent-green/20 to-accent-green/5 border-accent-green/20 text-accent-green',
            orange: 'from-accent-orange/20 to-accent-orange/5 border-accent-orange/20 text-accent-orange',
          };

          return (
            <div
              key={index}
              className={`glass rounded-xl p-6 card-3d bg-gradient-to-br ${colorClasses[stat.color as keyof typeof colorClasses]} border hover-lift`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color === 'purple' ? 'from-accent-purple to-accent-purple/80' : stat.color === 'blue' ? 'from-accent-blue to-accent-blue/80' : stat.color === 'green' ? 'from-accent-green to-accent-green/80' : 'from-accent-orange to-accent-orange/80'}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-space font-bold text-white">Recent Activity</h2>
              <button className="text-accent-purple hover:text-accent-blue transition-colors text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'application' || activity.type === 'job' ? 'bg-accent-purple/20' :
                    activity.type === 'achievement' || activity.type === 'hire' ? 'bg-accent-green/20' :
                    'bg-accent-blue/20'
                  }`}>
                    {activity.type === 'application' || activity.type === 'job' ? (
                      <Briefcase className="w-5 h-5 text-accent-purple" />
                    ) : activity.type === 'achievement' || activity.type === 'hire' ? (
                      <Trophy className="w-5 h-5 text-accent-green" />
                    ) : (
                      <Users className="w-5 h-5 text-accent-blue" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium mb-1">{activity.title}</p>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-400">{activity.time}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        activity.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        activity.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        activity.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions & Upcoming */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-space font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {isPlayer ? (
                <>
                  <button className="w-full text-left p-3 rounded-lg bg-accent-purple/10 hover:bg-accent-purple/20 transition-colors border border-accent-purple/20">
                    <div className="flex items-center space-x-3">
                      <Briefcase className="w-5 h-5 text-accent-purple" />
                      <span className="text-white font-medium">Browse Jobs</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-accent-blue/10 hover:bg-accent-blue/20 transition-colors border border-accent-blue/20">
                    <div className="flex items-center space-x-3">
                      <Trophy className="w-5 h-5 text-accent-blue" />
                      <span className="text-white font-medium">Add Achievement</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-accent-green/10 hover:bg-accent-green/20 transition-colors border border-accent-green/20">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-accent-green" />
                      <span className="text-white font-medium">Update Skills</span>
                    </div>
                  </button>
                </>
              ) : (
                <>
                  <button className="w-full text-left p-3 rounded-lg bg-accent-purple/10 hover:bg-accent-purple/20 transition-colors border border-accent-purple/20">
                    <div className="flex items-center space-x-3">
                      <Briefcase className="w-5 h-5 text-accent-purple" />
                      <span className="text-white font-medium">Post New Job</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-accent-blue/10 hover:bg-accent-blue/20 transition-colors border border-accent-blue/20">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-accent-blue" />
                      <span className="text-white font-medium">Browse Players</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-accent-green/10 hover:bg-accent-green/20 transition-colors border border-accent-green/20">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-accent-green" />
                      <span className="text-white font-medium">View Analytics</span>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-space font-bold text-white mb-4">Upcoming</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-accent-purple/20 rounded-lg">
                  <Calendar className="w-4 h-4 text-accent-purple" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">
                    {isPlayer ? 'Interview with Cloud9' : 'Player interviews'}
                  </p>
                  <p className="text-gray-400 text-xs">Tomorrow, 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-accent-blue/20 rounded-lg">
                  <Trophy className="w-4 h-4 text-accent-blue" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">
                    {isPlayer ? 'Tournament Registration' : 'Job posting deadline'}
                  </p>
                  <p className="text-gray-400 text-xs">Friday, 5:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-accent-green/20 rounded-lg">
                  <Award className="w-4 h-4 text-accent-green" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">
                    {isPlayer ? 'Season Rankings Update' : 'Team evaluation'}
                  </p>
                  <p className="text-gray-400 text-xs">Next week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;