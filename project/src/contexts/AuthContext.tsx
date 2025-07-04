import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Player, Recruiter } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: 'player' | 'recruiter') => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  type: 'player' | 'recruiter';
  company?: string;
  position?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    username: 'ProGamer123',
    email: 'player@example.com',
    type: 'player',
    avatar: 'https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date(),
  },
  {
    id: '2',
    username: 'ESportsRecruiter',
    email: 'recruiter@example.com',
    type: 'recruiter',
    avatar: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date(),
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data
    const storedUser = localStorage.getItem('esportConnect_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, type: 'player' | 'recruiter') => {
    setIsLoading(true);
    
    // Mock authentication - in real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers.find(u => u.email === email && u.type === type);
    if (mockUser) {
      setUser(mockUser);
      localStorage.setItem('esportConnect_user', JSON.stringify(mockUser));
    } else {
      // Create a new mock user for demo purposes
      const newUser: User = {
        id: Date.now().toString(),
        username: email.split('@')[0],
        email,
        type,
        avatar: type === 'player' 
          ? 'https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=400'
          : 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=400',
        createdAt: new Date(),
      };
      setUser(newUser);
      localStorage.setItem('esportConnect_user', JSON.stringify(newUser));
    }
    
    setIsLoading(false);
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    
    // Mock registration - in real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      username: userData.username,
      email: userData.email,
      type: userData.type,
      avatar: userData.type === 'player' 
        ? 'https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=400'
        : 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=400',
      createdAt: new Date(),
    };
    
    setUser(newUser);
    localStorage.setItem('esportConnect_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('esportConnect_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};