import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Job } from '../../types';

interface CreateJobModalProps {
  onClose: () => void;
  onJobCreated: (job: Job) => void;
}

const CreateJobModal: React.FC<CreateJobModalProps> = ({ onClose, onJobCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: [''],
    company: '',
    location: '',
    type: 'full-time' as Job['type'],
    salaryMin: 50000,
    salaryMax: 100000,
    currency: 'USD',
    games: [''],
    positions: [''],
    experienceLevel: 'intermediate' as Job['experienceLevel'],
    deadline: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    const newArray = [...formData[field as keyof typeof formData] as string[]];
    newArray[index] = value;
    handleInputChange(field, newArray);
  };

  const addArrayItem = (field: string) => {
    const currentArray = formData[field as keyof typeof formData] as string[];
    handleInputChange(field, [...currentArray, '']);
  };

  const removeArrayItem = (field: string, index: number) => {
    const currentArray = formData[field as keyof typeof formData] as string[];
    if (currentArray.length > 1) {
      handleInputChange(field, currentArray.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Filter out empty strings from arrays
      const cleanedData = {
        ...formData,
        requirements: formData.requirements.filter(req => req.trim() !== ''),
        games: formData.games.filter(game => game.trim() !== ''),
        positions: formData.positions.filter(pos => pos.trim() !== ''),
      };

      const newJob: Job = {
        id: Date.now().toString(),
        title: cleanedData.title,
        description: cleanedData.description,
        requirements: cleanedData.requirements,
        company: cleanedData.company,
        location: cleanedData.location,
        type: cleanedData.type,
        salary: {
          min: cleanedData.salaryMin,
          max: cleanedData.salaryMax,
          currency: cleanedData.currency,
        },
        games: cleanedData.games,
        positions: cleanedData.positions,
        experienceLevel: cleanedData.experienceLevel,
        createdAt: new Date(),
        deadline: new Date(cleanedData.deadline),
        recruiterId: 'current-user-id', // In real app, get from auth context
        status: 'open',
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onJobCreated(newJob);
    } catch (error) {
      console.error('Error creating job:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-space font-bold text-white">Create New Job</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors"
                placeholder="e.g., Professional League of Legends ADC"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors"
                placeholder="Your company name"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors"
                placeholder="e.g., Los Angeles, CA or Remote"
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Job Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="tournament">Tournament</option>
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Experience Level *
              </label>
              <select
                value={formData.experienceLevel}
                onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="professional">Professional</option>
              </select>
            </div>

            {/* Salary Range */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Salary Min ($)
              </label>
              <input
                type="number"
                value={formData.salaryMin}
                onChange={(e) => handleInputChange('salaryMin', parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors"
                min="0"
                step="1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Salary Max ($)
              </label>
              <input
                type="number"
                value={formData.salaryMax}
                onChange={(e) => handleInputChange('salaryMax', parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors"
                min="0"
                step="1000"
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Application Deadline *
              </label>
              <input
                type="date"
                required
                value={formData.deadline}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Job Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors resize-none"
              placeholder="Describe the role, responsibilities, and what you're looking for..."
            />
          </div>

          {/* Games */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Games *
            </label>
            {formData.games.map((game, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  required
                  value={game}
                  onChange={(e) => handleArrayChange('games', index, e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors"
                  placeholder="e.g., League of Legends"
                />
                {formData.games.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('games', index)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                )}
                {index === formData.games.length - 1 && (
                  <button
                    type="button"
                    onClick={() => addArrayItem('games')}
                    className="p-2 text-accent-purple hover:text-accent-blue transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Positions */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Positions *
            </label>
            {formData.positions.map((position, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  required
                  value={position}
                  onChange={(e) => handleArrayChange('positions', index, e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors"
                  placeholder="e.g., ADC, Support"
                />
                {formData.positions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('positions', index)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                )}
                {index === formData.positions.length - 1 && (
                  <button
                    type="button"
                    onClick={() => addArrayItem('positions')}
                    className="p-2 text-accent-purple hover:text-accent-blue transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Requirements *
            </label>
            {formData.requirements.map((requirement, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  required
                  value={requirement}
                  onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors"
                  placeholder="e.g., Diamond+ rank, 2+ years experience"
                />
                {formData.requirements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('requirements', index)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                )}
                {index === formData.requirements.length - 1 && (
                  <button
                    type="button"
                    onClick={() => addArrayItem('requirements')}
                    className="p-2 text-accent-purple hover:text-accent-blue transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="neon-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                'Create Job'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobModal;