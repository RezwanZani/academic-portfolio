import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { toast } from 'sonner';
import { Settings, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const AdminSetup: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [adminExists, setAdminExists] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminExists = async () => {
      try {
        const adminDoc = await getDoc(doc(db, 'config', 'admin'));
        
        if (adminDoc.exists()) {
          setAdminExists(true);
        } else {
          setAdminExists(false);
        }
      } catch (error: any) {
        // If checking fails (e.g. permission-denied before initial rules are set, or first-time setup),
        // do not block the user with a connection error. Allow setup form to show.
        console.warn("Skipping admin check for first time setup:", error);
        setAdminExists(false);
      } finally {
        setChecking(false);
      }
    };

    checkAdminExists();
  }, []);

  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      await setDoc(doc(db, 'config', 'admin'), {
        uid: user.uid,
        email: user.email,
        createdAt: serverTimestamp()
      });

      toast.success("Admin setup complete! Redirecting...");
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error: any) {
      console.error("Error creating admin:", error);
      toast.error(error.message || "Failed to create admin user");
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (adminExists === null) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full text-center border border-gray-700">
          <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Connection Error</h2>
          <p className="text-gray-400">
            Failed to verify system status with Firestore. Please check your internet connection or database rules and try again.
          </p>
        </div>
      </div>
    );
  }

  if (adminExists) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full text-center border border-gray-700">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-500/10 rounded-full">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Setup Complete</h2>
          <p className="text-gray-400 mb-8">
            An administrator account already exists for this portfolio. Initial setup cannot be run again.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-lg transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full border border-gray-700">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <Settings className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold text-white">Initial Setup</h1>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6 flex gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <p className="text-sm text-amber-500">
            Welcome to your portfolio! Please create your admin account to get started. This page will be locked after completion.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Admin Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              {...register('password', { required: true, minLength: 6 })}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-xs text-red-500 mt-1">Password must be at least 6 characters</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
            <input
              type="password"
              {...register('confirmPassword', { required: true })}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-lg transition-colors mt-6 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Creating Admin...
              </>
            ) : (
              'Complete Setup'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
