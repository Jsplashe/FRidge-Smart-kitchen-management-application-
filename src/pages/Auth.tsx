import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Refrigerator } from 'lucide-react';
import AuthForm from '../components/auth/AuthForm';

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  const handleSubmit = async (email: string, password: string, name?: string) => {
    // TODO: Implement Firebase authentication
    console.log('Auth submission:', { email, password, name });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Refrigerator className="h-10 w-10 text-emerald-600" />
            <span className="text-3xl font-bold text-gray-900">FRiDGE</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Welcome Back!' : 'Create Your Account'}
          </h2>
          <p className="text-gray-600">
            {isLogin
              ? 'Sign in to manage your smart kitchen'
              : 'Start managing your kitchen inventory today'}
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <AuthForm isLogin={isLogin} onSubmit={handleSubmit} />
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => navigate(isLogin ? '/signup' : '/login')}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}