import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { IconSelect } from '../../components/ui/IconSelect';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export const ProjectsForm: React.FC = () => {
  const { register, control, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: {
      courseProjects: [],
      researchGrants: []
    }
  });

  const { fields: courseFields, append: courseAppend, remove: courseRemove } = useFieldArray({
    control,
    name: "courseProjects"
  });

  const { fields: grantFields, append: grantAppend, remove: grantRemove } = useFieldArray({
    control,
    name: "researchGrants"
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'projects', 'data');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const raw = docSnap.data();
          // Data is stored wrapped: { projectsAndFundings: { courseProjects, researchGrants } }
          const unwrapped = raw.projectsAndFundings || raw;
          reset(unwrapped);
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
      const docRef = doc(db, 'projects', 'data');
      // Re-wrap to match the expected structure
      await setDoc(docRef, { projectsAndFundings: data });
      toast.success('Projects & Fundings saved successfully!');
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
          <h1 className="text-3xl font-bold text-white mb-2">Projects & Fundings</h1>
          <p className="text-gray-400">Manage your course projects and research grants.</p>
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
        {/* Course Projects */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium text-white">Course Projects</h3>
            <button
              type="button"
              onClick={() => courseAppend({ title: '', year: '', description: '', icon: '' })}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Project
            </button>
          </div>

          <div className="space-y-6">
            {courseFields.map((field, index) => (
              <div key={field.id} className="relative border border-white/10 p-6 rounded-lg bg-black/20">
                <button type="button" onClick={() => courseRemove(index)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Title</label>
                    <input {...register(`courseProjects.${index}.title`)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Year</label>
                    <input {...register(`courseProjects.${index}.year`)} type="number" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Icon</label>
                    <Controller
                      control={control}
                      name={`courseProjects.${index}.icon`}
                      render={({ field }) => (
                        <IconSelect value={field.value} onChange={field.onChange} />
                      )}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-gray-400 mb-1">Description</label>
                    <textarea {...register(`courseProjects.${index}.description`)} rows={2} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm"></textarea>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Research Grants */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium text-white">Research Grants</h3>
            <button
              type="button"
              onClick={() => grantAppend({ title: '', year: '', amount: '', principalInvestigator: '', icon: '' })}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Grant
            </button>
          </div>

          <div className="space-y-6">
            {grantFields.map((field, index) => (
              <div key={field.id} className="relative border border-white/10 p-6 rounded-lg bg-black/20">
                <button type="button" onClick={() => grantRemove(index)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Title</label>
                    <input {...register(`researchGrants.${index}.title`)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Year</label>
                    <input {...register(`researchGrants.${index}.year`)} type="number" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Amount</label>
                    <input {...register(`researchGrants.${index}.amount`)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Principal Investigator</label>
                    <input {...register(`researchGrants.${index}.principalInvestigator`)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-gray-400 mb-1">Icon</label>
                    <Controller
                      control={control}
                      name={`researchGrants.${index}.icon`}
                      render={({ field }) => (
                        <IconSelect value={field.value} onChange={field.onChange} />
                      )}
                    />
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
