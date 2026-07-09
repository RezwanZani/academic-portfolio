import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

export const SkillsForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'skills', 'data');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Convert array to newline separated strings
          const formatted = { ...(data.skills || data) };
          for (const key in formatted) {
              if (Array.isArray(formatted[key])) {
                  formatted[key] = formatted[key].join('\n');
              }
          }
          reset(formatted);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [reset]);

  const onSubmit = async (data: any) => {
    try {
      // Convert newline separated strings back to arrays
      const payload: any = {};
      for (const key in data) {
          if (typeof data[key] === 'string') {
              payload[key] = data[key].split('\n').map((s: string) => s.trim()).filter(Boolean);
          }
      }

      const docRef = doc(db, 'skills', 'data');
      await setDoc(docRef, { skills: payload });
      toast.success('Skills saved successfully!');
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error('Failed to save data');
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="max-w-4xl pb-20">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Skills</h1>
          <p className="text-gray-400">Manage your skills and expertise (One item per line).</p>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSubmitting ? 'Saving...' : 'Save All'}
        </button>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 border border-white/10 p-6 rounded-xl">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Languages</label>
          <textarea {...register('languages')} rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Platforms</label>
          <textarea {...register('platforms')} rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Software</label>
          <textarea {...register('software')} rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Tools</label>
          <textarea {...register('tools')} rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Technical Expertise</label>
          <textarea {...register('technicalExpertise')} rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Soft Skills</label>
          <textarea {...register('softSkills')} rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none"></textarea>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">Research & Domain Knowledge</label>
          <textarea {...register('researchAndDomainKnowledge')} rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none"></textarea>
        </div>
      </form>
    </div>
  );
};
