import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { IconSelect } from '../../components/ui/IconSelect';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { invalidatePortfolioCache } from '../../contexts/PortfolioContext';

export const JourneyForm: React.FC = () => {
  const { register, control, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: {
      milestones: [],
      currentResearch: {
          title: '', advisor: '', abstract: '', progress: 0,
          committeeStr: '', objectivesStr: ''
      },
      awardsAndAchievements: [],
      researchEnvironment: {
          centerName: '', university: '', department: '', photo: ''
      }
    }
  });

  const { fields: msFields, append: msAppend, remove: msRemove } = useFieldArray({
    control,
    name: "milestones"
  });

  const { fields: awardFields, append: awardAppend, remove: awardRemove } = useFieldArray({
    control,
    name: "awardsAndAchievements"
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'journey', 'data');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && isMounted) {
          const data = docSnap.data();
          if (data.currentResearch) {
              data.currentResearch.committeeStr = data.currentResearch.committee ? data.currentResearch.committee.join('\n') : '';
              data.currentResearch.objectivesStr = data.currentResearch.objectives ? data.currentResearch.objectives.join('\n') : '';
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
      const payload = {
          ...data,
          currentResearch: {
              ...data.currentResearch,
              progress: Number(data.currentResearch?.progress || 0),
              committee: data.currentResearch?.committeeStr ? data.currentResearch.committeeStr.split('\n').map((s: string) => s.trim()).filter(Boolean) : [],
              objectives: data.currentResearch?.objectivesStr ? data.currentResearch.objectivesStr.split('\n').map((s: string) => s.trim()).filter(Boolean) : [],
          }
      };
      if (payload.currentResearch) {
        delete payload.currentResearch.committeeStr;
        delete payload.currentResearch.objectivesStr;
      }

      const docRef = doc(db, 'journey', 'data');
      await setDoc(docRef, payload);
      invalidatePortfolioCache();
      toast.success('Journey saved successfully!');
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
          <h1 className="text-3xl font-bold text-white mb-2">Journey</h1>
          <p className="text-gray-400">Manage your milestones, current research, and achievements.</p>
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
        {/* Current Research */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-6">
          <h3 className="text-xl font-medium text-white mb-4">Current Research</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input {...register('currentResearch.title')} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Advisor</label>
              <input {...register('currentResearch.advisor')} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Progress (%)</label>
              <input {...register('currentResearch.progress')} type="number" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Abstract</label>
              <textarea {...register('currentResearch.abstract')} rows={3} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Committee (One per line)</label>
              <textarea {...register('currentResearch.committeeStr')} rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Objectives (One per line)</label>
              <textarea {...register('currentResearch.objectivesStr')} rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none"></textarea>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium text-white">Milestones</h3>
            <button
              type="button"
              onClick={() => msAppend({ title: '', date: '', status: '', description: '' })}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Milestone
            </button>
          </div>
          <div className="space-y-6">
            {msFields.map((field, index) => (
              <div key={field.id} className="relative border border-white/10 p-6 rounded-lg bg-black/20">
                <button type="button" onClick={() => msRemove(index)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Title</label>
                    <input {...register(`milestones.${index}.title`)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Date</label>
                    <input {...register(`milestones.${index}.date`)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Status (e.g. in-progress, completed)</label>
                    <input {...register(`milestones.${index}.status`)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-gray-400 mb-1">Description</label>
                    <textarea {...register(`milestones.${index}.description`)} rows={2} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm"></textarea>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards and Achievements */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium text-white">Awards and Achievements</h3>
            <button
              type="button"
              onClick={() => awardAppend({ title: '', year: '', issuer: '', description: '', icon: '' })}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Award
            </button>
          </div>
          <div className="space-y-6">
            {awardFields.map((field, index) => (
              <div key={field.id} className="relative border border-white/10 p-6 rounded-lg bg-black/20">
                <button type="button" onClick={() => awardRemove(index)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Title</label>
                    <input {...register(`awardsAndAchievements.${index}.title`)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Year</label>
                    <input {...register(`awardsAndAchievements.${index}.year`)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Issuer</label>
                    <input {...register(`awardsAndAchievements.${index}.issuer`)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Icon</label>
                    <Controller
                      control={control}
                      name={`awardsAndAchievements.${index}.icon`}
                      render={({ field }) => (
                        <IconSelect value={field.value} onChange={field.onChange} />
                      )}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-gray-400 mb-1">Description</label>
                    <textarea {...register(`awardsAndAchievements.${index}.description`)} rows={2} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm"></textarea>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Research Environment */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-6">
          <h3 className="text-xl font-medium text-white mb-4">Research Environment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Center Name</label>
              <input {...register('researchEnvironment.centerName')} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">University</label>
              <input {...register('researchEnvironment.university')} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
              <input {...register('researchEnvironment.department')} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Photo URL</label>
              <input {...register('researchEnvironment.photo')} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-primary outline-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
