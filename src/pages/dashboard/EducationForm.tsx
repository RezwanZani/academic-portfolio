import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { invalidatePortfolioCache } from '../../contexts/PortfolioContext';

export const EducationForm: React.FC = () => {
  const { register, control, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: {
      educationSummary: { title: '', description: '', field: '', researchArea: '' },
      educationData: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "educationData"
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'education', 'data');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && isMounted) {
          const data = docSnap.data();
          // Convert achievements arrays back to comma-separated strings for easy editing
          if (data.educationData) {
             data.educationData = data.educationData.map((item: any) => ({
                 ...item,
                 achievementsStr: item.achievements ? item.achievements.join('\n') : ''
             }));
          }
          reset(data);
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
      // Process achievements string back to array
      const payload = {
          ...data,
          educationData: (data.educationData || []).map((item: any) => {
              const { achievementsStr, ...rest } = item;
              return {
                  ...rest,
                  achievements: achievementsStr ? achievementsStr.split('\n').map((s: string) => s.trim()).filter(Boolean) : []
              };
          })
      };

      const docRef = doc(db, 'education', 'data');
      await setDoc(docRef, payload);
      invalidatePortfolioCache();
      toast.success('Education data saved successfully!');
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
          <h1 className="text-3xl font-bold text-white mb-2">Education</h1>
          <p className="text-gray-400">Manage your educational background and summary.</p>
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

      <div className="space-y-8">
        {/* Summary Section */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-6">
          <h3 className="text-xl font-medium text-white mb-4">Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input {...register('educationSummary.title')} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Field</label>
              <input {...register('educationSummary.field')} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea {...register('educationSummary.description')} rows={3} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none"></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Research Area</label>
              <input {...register('educationSummary.researchArea')} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none" />
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium text-white">Degrees & Schools</h3>
            <button
              type="button"
              onClick={() => append({ degree: '', institution: '', location: '', period: '', status: '', cgpa: '', description: '', achievementsStr: '' })}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Item
            </button>
          </div>

          <div className="space-y-8">
            {fields.map((field, index) => (
              <div key={field.id} className="relative border border-white/10 p-6 rounded-lg bg-black/20">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Degree</label>
                    <input {...register(`educationData.${index}.degree`)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Institution</label>
                    <input {...register(`educationData.${index}.institution`)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Location</label>
                    <input {...register(`educationData.${index}.location`)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Period (e.g. JAN 2022 - JAN 2026)</label>
                    <input {...register(`educationData.${index}.period`)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Status (e.g. Completed)</label>
                    <input {...register(`educationData.${index}.status`)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">CGPA / GPA</label>
                    <input {...register(`educationData.${index}.cgpa`)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-gray-400 mb-1">Description</label>
                    <textarea {...register(`educationData.${index}.description`)} rows={2} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm"></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-gray-400 mb-1">Achievements (One per line)</label>
                    <textarea {...register(`educationData.${index}.achievementsStr`)} rows={3} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" placeholder="Achievement 1&#10;Achievement 2"></textarea>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
