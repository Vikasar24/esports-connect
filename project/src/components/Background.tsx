import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gaming-dark via-gaming-darker to-primary-900" />
      
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Radial Gradients */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-accent-purple/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-accent-blue/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-accent-green/10 to-transparent rounded-full blur-3xl" />
    </div>
  );
};

export default Background;