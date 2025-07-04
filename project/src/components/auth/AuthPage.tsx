import React, { useState } from 'react';
import { User, Building, Mail, Lock, Trophy, Gamepad2, Users } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'player' | 'recruiter'>('player');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    company: '',
    position: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password, userType);
      } else {
        await register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          type: userType,
          company: formData.company,
          position: formData.position,
        });
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
        {/* Left Side - Branding */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-purple to-accent-blue rounded-2xl flex items-center justify-center animate-pulse-glow">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-space font-bold text-gradient">EsportConnect</h1>
                <p className="text-gray-400 text-sm">The Ultimate Esports Job Portal</p>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-space font-bold text-white mb-4 leading-tight">
              Connect. Compete. <span className="text-gradient">Conquer.</span>
            </h2>
            
            <p className="text-gray-300 text-lg mb-8">
              Join the premier platform where esports talent meets opportunity. 
              Showcase your skills, find your team, and level up your career.
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 glass rounded-lg hover-lift">
                <Gamepad2 className="w-8 h-8 text-accent-purple mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-sm text-gray-400">Players</div>
              </div>
              <div className="text-center p-4 glass rounded-lg hover-lift">
                <Building className="w-8 h-8 text-accent-blue mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm text-gray-400">Teams</div>
              </div>
              <div className="text-center p-4 glass rounded-lg hover-lift">
                <Users className="w-8 h-8 text-accent-green mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">2K+</div>
                <div className="text-sm text-gray-400">Jobs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="flex flex-col justify-center">
          <div className="glass rounded-2xl p-8 card-3d">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-space font-bold text-white mb-2">
                {isLogin ? 'Welcome Back' : 'Join EsportConnect'}
              </h3>
              <p className="text-gray-400">
                {isLogin ? 'Sign in to your account' : 'Create your account and start your journey'}
              </p>
            </div>

            {/* User Type Selection */}
            <div className="flex rounded-lg p-1 glass mb-6">
              <button
                type="button"
                onClick={() => setUserType('player')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all ${
                  userType === 'player'
                    ? 'bg-accent-purple text-white shadow-neon'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Gamepad2 className="w-5 h-5" />
                <span className="font-medium">Player</span>
              </button>
              <button
                type="button"
                onClick={() => setUserType('recruiter')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all ${
                  userType === 'recruiter'
                    ? 'bg-accent-blue text-white shadow-neon-blue'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Building className="w-5 h-5" />
                <span className="font-medium">Recruiter</span>
              </button>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {!isLogin && userType === 'recruiter' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors"
                      placeholder="Your position"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full neon-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            {/* Toggle Auth Mode */}
            <div className="text-center mt-6">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-accent-purple hover:text-accent-blue transition-colors font-medium"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;