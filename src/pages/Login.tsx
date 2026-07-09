import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useForm } from 'react-hook-form';
import { Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export const Login: React.FC = () => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      setError('');
      setLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError('Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    const email = getValues('email');
    if (!email) {
      setError('Please enter your email address to reset password.');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent! Check your inbox.');
      setIsResetting(false);
    } catch (err: any) {
      setError('Failed to send reset email. Make sure the email is correct.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            {isResetting ? 'Reset Password' : 'Admin Access'}
          </h1>
          <p className="text-gray-400">
            {isResetting ? 'Enter your email to receive a reset link' : 'Sign in to manage your portfolio'}
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-500/10 p-4 text-sm text-red-500 border border-red-500/20">
            {error}
          </div>
        )}

        {!isResetting ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Email</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="block w-full rounded-lg border border-white/10 bg-black/50 p-3 pl-10 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                  placeholder="admin@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message as string}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">Password</label>
                <button 
                  type="button" 
                  onClick={() => {
                    setError('');
                    setIsResetting(true);
                  }}
                  className="text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  className="block w-full rounded-lg border border-white/10 bg-black/50 p-3 pl-10 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password.message as string}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 px-4 font-semibold text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#0a0a0a] disabled:opacity-50 transition-all"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Email</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  {...register('email')}
                  className="block w-full rounded-lg border border-white/10 bg-black/50 p-3 pl-10 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetPassword}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 px-4 font-semibold text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#0a0a0a] disabled:opacity-50 transition-all"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              ) : (
                'Send Reset Link'
              )}
            </button>
            
            <button
              type="button"
              onClick={() => {
                setError('');
                setIsResetting(false);
              }}
              className="flex w-full items-center justify-center gap-2 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </button>
          </div>
        )}
        
        <div className="mt-6 text-center">
            <button onClick={() => navigate('/')} className="text-sm text-gray-500 hover:text-white transition-colors">
                Return to Portfolio
            </button>
        </div>
      </div>
    </div>
  );
};
