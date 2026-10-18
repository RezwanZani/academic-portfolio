import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { invalidatePortfolioCache } from '../../contexts/PortfolioContext';

export const PersonalInfoForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'personalInfo', 'data');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && isMounted) {
          const data = docSnap.data();
          reset({
            ...data,
            googleScholar: data.socialLinks?.googleScholar || data.googleScholar,
            researchGate: data.socialLinks?.researchGate || data.researchGate,
            linkedin: data.socialLinks?.linkedin || data.linkedin,
            orcid: data.socialLinks?.orcid || data.orcid
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [reset]);

  const onSubmit = async (data: any) => {
    try {
      const docRef = doc(db, 'personalInfo', 'data');
      const { googleScholar, researchGate, linkedin, orcid, ...rest } = data;
      const payload = {
        ...rest,
        socialLinks: { googleScholar, researchGate, linkedin, orcid }
      };
      await setDoc(docRef, payload);
      invalidatePortfolioCache();
      toast.success('Personal info saved successfully!');
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error('Failed to save data');
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Personal Info</h1>
        <p className="text-gray-400">Manage your basic profile information, contact details, and social links.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white/5 border border-white/10 p-6 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
            <input {...register('name')} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input {...register('title')} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea {...register('description')} rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
            <input {...register('location')} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input {...register('email')} type="email" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
            <input {...register('phone')} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none" />
          </div>
          
          <div className="md:col-span-2 border-t border-white/10 pt-6 mt-2">
            <h3 className="text-lg font-medium text-white mb-4">Media URLs</h3>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Photo URL</label>
            <input {...register('photo')} placeholder="https://..." className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">CV / Resume URL</label>
            <input {...register('cv')} placeholder="https://..." className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none" />
          </div>

          <div className="md:col-span-2 border-t border-white/10 pt-6 mt-2">
            <h3 className="text-lg font-medium text-white mb-4">Office & Hours</h3>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Office Location</label>
            <textarea {...register('officeLocation')} rows={3} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Office Hours</label>
            <textarea {...register('officeHours')} rows={3} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none"></textarea>
          </div>

          <div className="md:col-span-2 border-t border-white/10 pt-6 mt-2">
            <h3 className="text-lg font-medium text-white mb-4">Social Links</h3>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Google Scholar</label>
            <input {...register('googleScholar')} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">ResearchGate</label>
            <input {...register('researchGate')} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
            <input {...register('linkedin')} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">ORCID</label>
            <input {...register('orcid')} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none" />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};
