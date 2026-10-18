import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { invalidatePortfolioCache } from '../../contexts/PortfolioContext';

export const PublicationsForm: React.FC = () => {
  const { register, control, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: {
      conference: [],
      journal: [],
      thesis: [],
      'working-papers': []
    }
  });

  const arrays = [
    { name: 'conference', label: 'Conference Papers' },
    { name: 'journal', label: 'Journal Articles' },
    { name: 'thesis', label: 'Theses' },
    { name: 'working-papers', label: 'Working Papers' }
  ];

  // We have to use useFieldArray for each
  const { fields: confFields, append: confAppend, remove: confRemove } = useFieldArray({ control, name: "conference" });
  const { fields: jourFields, append: jourAppend, remove: jourRemove } = useFieldArray({ control, name: "journal" });
  const { fields: thesFields, append: thesAppend, remove: thesRemove } = useFieldArray({ control, name: "thesis" });
  const { fields: wpFields, append: wpAppend, remove: wpRemove } = useFieldArray({ control, name: "working-papers" as any });

  const fieldArrays: any = {
      'conference': { fields: confFields, append: confAppend, remove: confRemove },
      'journal': { fields: jourFields, append: jourAppend, remove: jourRemove },
      'thesis': { fields: thesFields, append: thesAppend, remove: thesRemove },
      'working-papers': { fields: wpFields, append: wpAppend, remove: wpRemove }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'publications', 'data');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && isMounted) {
          const rawData = docSnap.data();
          const data = rawData.publications || rawData;
          // convert arrays to strings for authors and keywords
          arrays.forEach(arr => {
              if (data[arr.name] && Array.isArray(data[arr.name])) {
                  data[arr.name] = data[arr.name].map((item: any) => ({
                      ...item,
                      link: item.link || '',
                      authorsStr: item.authors ? item.authors.join('\n') : '',
                      keywordsStr: item.keywords ? item.keywords.join('\n') : ''
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
      const payload: any = {};
      arrays.forEach(arr => {
          payload[arr.name] = (data[arr.name] || []).map((item: any) => {
              const { authorsStr, keywordsStr, ...rest } = item;
              return {
                  ...rest,
                  link: item.link ? item.link.trim() : '',
                  authors: authorsStr ? authorsStr.split('\n').map((s: string) => s.trim()).filter(Boolean) : [],
                  keywords: keywordsStr ? keywordsStr.split('\n').map((s: string) => s.trim()).filter(Boolean) : []
              };
          });
      });

      const docRef = doc(db, 'publications', 'data');
      await setDoc(docRef, { publications: payload });
      invalidatePortfolioCache();
      toast.success('Publications saved successfully!');
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
          <h1 className="text-3xl font-bold text-white mb-2">Publications</h1>
          <p className="text-gray-400">Manage your papers, articles, and theses.</p>
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
        {arrays.map((arr) => {
            const { fields, append, remove } = fieldArrays[arr.name];
            return (
                <div key={arr.name} className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-medium text-white">{arr.label}</h3>
                    <button
                      type="button"
                      onClick={() => append({ title: '', link: '', authorsStr: '', conference: '', journal: '', year: '', location: '', status: '', type: '', abstract: '', keywordsStr: '' })}
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
                          <div className="md:col-span-2">
                            <label className="block text-xs text-gray-400 mb-1">Title</label>
                            <input {...register(`${arr.name}.${index}.title` as const)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs text-gray-400 mb-1">Paper Link (URL - optional)</label>
                            <input 
                              {...register(`${arr.name}.${index}.link` as const)} 
                              placeholder="https://example.com/paper or leave blank" 
                              className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Year</label>
                            <input {...register(`${arr.name}.${index}.year` as const)} type="number" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Status (e.g. Published, Accepted)</label>
                            <input {...register(`${arr.name}.${index}.status` as const)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Conference / Journal Name</label>
                            <input {...register(`${arr.name}.${index}.${arr.name === 'conference' ? 'conference' : 'journal'}` as const)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Location</label>
                            <input {...register(`${arr.name}.${index}.location` as const)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Type (e.g. Oral Presentation)</label>
                            <input {...register(`${arr.name}.${index}.type` as const)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs text-gray-400 mb-1">Abstract</label>
                            <textarea {...register(`${arr.name}.${index}.abstract` as const)} rows={3} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm"></textarea>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Authors (One per line)</label>
                            <textarea {...register(`${arr.name}.${index}.authorsStr` as const)} rows={3} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm"></textarea>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Keywords (One per line)</label>
                            <textarea {...register(`${arr.name}.${index}.keywordsStr` as const)} rows={3} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm"></textarea>
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
