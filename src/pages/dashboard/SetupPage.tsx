import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Upload, Download, AlertTriangle, CheckCircle2, Loader2, Github, Copy } from 'lucide-react';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import JSZip from 'jszip';
import { invalidatePortfolioCache } from '../../contexts/PortfolioContext';

// Import all local JSONs
import personalInfo from '../../data/personal_info.json';
import educationData from '../../data/education_data.json';
import skillsData from '../../data/skills.json';
import researchInterestsData from '../../data/researchInterests.json';
import experienceData from '../../data/experience_data.json';
import conferencesData from '../../data/conferences_data.json';
import journeyData from '../../data/journey_data.json';
import projectsData from '../../data/projects_fundings.json';
import publicationsData from '../../data/publications_data.json';

const COLLECTIONS = [
  { id: 'personalInfo', data: personalInfo, filename: 'personal_info.json' },
  { id: 'education', data: educationData, filename: 'education_data.json' },
  { id: 'skills', data: skillsData, filename: 'skills.json' },
  { id: 'researchInterests', data: researchInterestsData, filename: 'researchInterests.json' },
  { id: 'experience', data: experienceData, filename: 'experience_data.json' },
  { id: 'conferences', data: conferencesData, filename: 'conferences_data.json' },
  { id: 'journey', data: journeyData, filename: 'journey_data.json' },
  { id: 'projects', data: projectsData, filename: 'projects_fundings.json' },
  { id: 'publications', data: publicationsData, filename: 'publications_data.json' }
];

export function SetupPage() {
  const [seeding, setSeeding] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleSeedToFirestore = async () => {
    if (!window.confirm("Are you sure you want to overwrite all Firestore data with the current local codebase JSON data? This cannot be undone.")) return;
    
    setSeeding(true);
    setSeedSuccess(false);
    try {
      for (const col of COLLECTIONS) {
        await setDoc(doc(db, col.id, 'data'), col.data);
      }
      invalidatePortfolioCache();
      setSeedSuccess(true);
      setTimeout(() => setSeedSuccess(false), 5000);
    } catch (error) {
      console.error("Error seeding to Firestore", error);
      alert("Failed to seed data. Check console for details.");
    } finally {
      setSeeding(false);
    }
  };

  const handleDownloadFromFirestore = async () => {
    setDownloading(true);
    setDownloadSuccess(false);
    try {
      const zip = new JSZip();
      
      for (const col of COLLECTIONS) {
        const docRef = doc(db, col.id, 'data');
        const docSnap = await getDoc(docRef);
        
        // If document exists, use its data; otherwise fallback to the local static data structure
        const dataToSave = docSnap.exists() ? docSnap.data() : col.data;
        
        // Format with 2 spaces for readability
        zip.file(col.filename, JSON.stringify(dataToSave, null, 2));
      }
      
      const content = await zip.generateAsync({ type: 'blob' });
      
      // Create download link
      const url = window.URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'portfolio_data_backup.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    } catch (error) {
      console.error("Error downloading from Firestore", error);
      alert("Failed to download data. Check console for details.");
    } finally {
      setDownloading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Data Setup & Migration</h2>
        <p className="text-gray-400">Sync data between your local codebase JSON files and the live Firestore database.</p>
      </div>

      <div className="bg-amber-950/40 border border-amber-500/30 rounded-lg p-5 mb-8 flex items-start gap-4">
        <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-amber-500 font-semibold mb-1">Important: Data Source Hierarchy</h3>
          <p className="text-amber-200/80 text-sm leading-relaxed">
            Please be aware that <strong>Firestore is the MAIN data source</strong> for your live portfolio. 
            The local JSON files in your codebase (`src/data/*.json`) act as a <strong>fallback</strong> in case 
            Firestore documents are empty or unavailable. To permanently update the fallback data in your repository, 
            you must download the latest Firestore data, extract it into your codebase, and push the changes to GitHub.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Seed Card */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Upload size={20} className="text-blue-400" />
              Seed to Firestore
            </CardTitle>
            <CardDescription className="text-gray-400">
              Upload local JSON files from your codebase directly into Firestore.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-6">
              Use this if you have manually edited the `.json` files in your code editor and want to push those changes to the live database, or if you are setting up the database for the very first time.
            </p>
            <Button 
              onClick={handleSeedToFirestore} 
              disabled={seeding}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {seeding ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Seeding...</>
              ) : seedSuccess ? (
                <><CheckCircle2 className="mr-2 h-4 w-4" /> Seeded Successfully!</>
              ) : (
                "Push Local Data to Firestore"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Download Card */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Download size={20} className="text-green-400" />
              Download from Firestore
            </CardTitle>
            <CardDescription className="text-gray-400">
              Download the current live database state as a `.zip` file.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-6">
              Use this to backup your live data, or to sync your local repository's fallback JSON files with the latest changes made via this dashboard.
            </p>
            <Button 
              onClick={handleDownloadFromFirestore} 
              disabled={downloading}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {downloading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Packaging...</>
              ) : downloadSuccess ? (
                <><CheckCircle2 className="mr-2 h-4 w-4" /> Downloaded!</>
              ) : (
                "Download as ZIP"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Github size={20} />
            How to sync fallback data to GitHub
          </CardTitle>
          <CardDescription className="text-gray-400">
            Follow these instructions after downloading your data to update your local codebase.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center font-bold text-gray-300">1</div>
              <div>
                <h4 className="text-white font-medium mb-1">Extract the ZIP file</h4>
                <p className="text-sm text-gray-400">Extract the downloaded `portfolio_data_backup.zip` file. You will get 9 JSON files.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center font-bold text-gray-300">2</div>
              <div>
                <h4 className="text-white font-medium mb-1">Replace existing data</h4>
                <p className="text-sm text-gray-400">Copy all the extracted `.json` files and paste them into your local repository's <code className="bg-gray-800 px-1.5 py-0.5 rounded text-gray-300">src/data/</code> folder, replacing the old files.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center font-bold text-gray-300">3</div>
              <div className="w-full">
                <h4 className="text-white font-medium mb-2">Commit and push to GitHub</h4>
                <p className="text-sm text-gray-400 mb-3">Open your terminal in your project directory and run the following commands sequentially:</p>
                
                <div className="bg-black/50 border border-gray-800 rounded-md p-3 font-mono text-sm text-green-400 relative group">
                  <button onClick={() => copyToClipboard('git add src/data/*.json\ngit commit -m "chore: update static fallback data from firestore"\ngit push origin main')} className="absolute right-2 top-2 p-1.5 text-gray-500 hover:text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    <Copy size={14} />
                  </button>
                  <div>git add src/data/*.json</div>
                  <div>git commit -m "chore: update static fallback data from firestore"</div>
                  <div>git push origin main</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
