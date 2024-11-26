import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { signInWithTestCredentials } from '../../lib/firebase';

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (email: string, password: string, name?: string) => void;
}

export default function AuthForm({ isLogin, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('demo123');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signInWithTestCredentials();
      onSubmit(email, password, !isLogin ? name : undefined);
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      {!isLogin && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="John Doe"
            />
          </div>
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="demo@example.com"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
      </button>

      {/* Demo credentials notice */}
      <div className="text-center text-sm text-gray-600">
        <p>Demo Credentials:</p>
        <p>Email: demo@example.com</p>
        <p>Password: demo123</p>
      </div>
    </form>
  );
}