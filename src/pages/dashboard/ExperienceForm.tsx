import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { invalidatePortfolioCache } from '../../contexts/PortfolioContext';

export const ExperienceForm: React.FC = () => {
  const { register, control, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: {
      industry: [],
      academic: [],
      training: [],
      leadership: [],
      experienceSummary: []
    }
  });

  const sections = [
    { name: 'industry', label: 'Industry Experience' },
    { name: 'academic', label: 'Academic Experience' },
    { name: 'training', label: 'Training' },
    { name: 'leadership', label: 'Leadership' }
  ];

  const fieldArrays: any = {
      'industry': useFieldArray({ control, name: 'industry' }),
      'academic': useFieldArray({ control, name: 'academic' }),
      'training': useFieldArray({ control, name: 'training' }),
      'leadership': useFieldArray({ control, name: 'leadership' }),
      'experienceSummary': useFieldArray({ control, name: 'experienceSummary' })
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'experience', 'data');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && isMounted) {
          const data = docSnap.data();
          sections.forEach(sec => {
              if (data[sec.name]) {
                  data[sec.name] = data[sec.name].map((item: any) => ({
                      ...item,
                      responsibilitiesStr: item.responsibilities ? item.responsibilities.join('\n') : '',
                      skillsStr: item.skills ? item.skills.join('\n') : '',
                      achievementsStr: item.achievements ? item.achievements.join('\n') : '',
                  }));
              }
          });
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
      const payload: any = {
          experienceSummary: data.experienceSummary || []
      };
      sections.forEach(sec => {
          payload[sec.name] = (data[sec.name] || []).map((item: any) => {
              const { responsibilitiesStr, skillsStr, achievementsStr, ...rest } = item;
              return {
                  ...rest,
                  responsibilities: responsibilitiesStr ? responsibilitiesStr.split('\n').map((s: string) => s.trim()).filter(Boolean) : [],
                  skills: skillsStr ? skillsStr.split('\n').map((s: string) => s.trim()).filter(Boolean) : [],
                  achievements: achievementsStr ? achievementsStr.split('\n').map((s: string) => s.trim()).filter(Boolean) : []
              };
          });
      });

      const docRef = doc(db, 'experience', 'data');
      await setDoc(docRef, payload);
      invalidatePortfolioCache();
      toast.success('Experience saved successfully!');
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
          <h1 className="text-3xl font-bold text-white mb-2">Experience</h1>
          <p className="text-gray-400">Manage your work history, academics, and leadership roles.</p>
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
        {/* Experience Summary */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium text-white">Experience Summary Stats</h3>
            <button
              type="button"
              onClick={() => fieldArrays.experienceSummary.append({ number: '', label: '' })}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Stat
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fieldArrays.experienceSummary.fields.map((field: any, index: number) => (
              <div key={field.id} className="relative border border-white/10 p-4 rounded-lg bg-black/20 flex gap-4 items-center">
                <div className="flex-1">
                    <label className="block text-xs text-gray-400 mb-1">Number (e.g. 4+)</label>
                    <input {...register(`experienceSummary.${index}.number` as const)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                </div>
                <div className="flex-1">
                    <label className="block text-xs text-gray-400 mb-1">Label</label>
                    <input {...register(`experienceSummary.${index}.label` as const)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                </div>
                <button type="button" onClick={() => fieldArrays.experienceSummary.remove(index)} className="text-gray-500 hover:text-red-500 mt-5">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Sections */}
        {sections.map((sec) => {
            const { fields, append, remove } = fieldArrays[sec.name];
            return (
                <div key={sec.name} className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-medium text-white">{sec.label}</h3>
                    <button
                      type="button"
                      onClick={() => append({ title: '', organization: '', location: '', period: '', type: '', supervisor: '', description: '', responsibilitiesStr: '', skillsStr: '', achievementsStr: '' })}
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      <Plus className="w-4 h-4" /> Add Item
                    </button>
                  </div>

                  <div className="space-y-6">
                    {fields.map((field: any, index: number) => (
                      <div key={field.id} className="relative border border-white/10 p-6 rounded-lg bg-black/20">
                        <button type="button" onClick={() => remove(index)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Title / Role</label>
                            <input {...register(`${sec.name}.${index}.title` as const)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Organization</label>
                            <input {...register(`${sec.name}.${index}.organization` as const)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Location</label>
                            <input {...register(`${sec.name}.${index}.location` as const)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Period (e.g. FEB 2026 - PRESENT)</label>
                            <input {...register(`${sec.name}.${index}.period` as const)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Type (e.g. Full-time, Volunteer)</label>
                            <input {...register(`${sec.name}.${index}.type` as const)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Supervisor (Optional)</label>
                            <input {...register(`${sec.name}.${index}.supervisor` as const)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs text-gray-400 mb-1">Description</label>
                            <textarea {...register(`${sec.name}.${index}.description` as const)} rows={2} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm"></textarea>
                          </div>
                          <div className="md:col-span-2 border-t border-white/10 pt-4 mt-2">
                              <h4 className="text-sm font-medium text-white mb-3">Lists (One item per line)</h4>
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs text-gray-400 mb-1">Responsibilities</label>
                            <textarea {...register(`${sec.name}.${index}.responsibilitiesStr` as const)} rows={3} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm"></textarea>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Skills</label>
                            <textarea {...register(`${sec.name}.${index}.skillsStr` as const)} rows={3} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm"></textarea>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Achievements</label>
                            <textarea {...register(`${sec.name}.${index}.achievementsStr` as const)} rows={3} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm"></textarea>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            );
        })}
      </div>
    </div>
  );
};
