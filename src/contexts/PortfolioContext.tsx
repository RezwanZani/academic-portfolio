import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Import static fallback data
import staticPersonalInfo from '../data/personal_info.json';
import staticEducation from '../data/education_data.json';
import staticSkills from '../data/skills.json';
import staticResearchInterests from '../data/researchInterests.json';
import staticExperience from '../data/experience_data.json';
import staticConferences from '../data/conferences_data.json';
import staticJourney from '../data/journey_data.json';
import staticProjects from '../data/projects_fundings.json';
import staticPublications from '../data/publications_data.json';

interface PortfolioContextType {
  loading: boolean;
  data: {
    personalInfo: any;
    education: any;
    skills: any;
    researchInterests: any;
    experience: any;
    conferences: any;
    journey: any;
    projects: any;
    publications: any;
  };
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const CACHE_KEY = 'portfolio_data_cache';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with cached data if available, otherwise fallback to static data
  const [data, setData] = useState(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error("Failed to parse cached portfolio data:", e);
      }
    }
    return {
      personalInfo: staticPersonalInfo,
      education: staticEducation,
      skills: staticSkills.skills,
      researchInterests: staticResearchInterests.researchInterests,
      experience: staticExperience,
      conferences: staticConferences.activitiesData,
      journey: staticJourney,
      projects: staticProjects.projectsAndFundings,
      publications: staticPublications.publications,
    };
  });

  // If we have cached data, we skip the initial loading skeleton screen
  const [loading, setLoading] = useState(() => !localStorage.getItem(CACHE_KEY));

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const docNames = [
          'personalInfo', 'education', 'skills', 
          'researchInterests', 'experience', 'conferences', 
          'journey', 'projects', 'publications'
        ];

        const fetchPromises = docNames.map(name => getDoc(doc(db, name, 'data')));
        const snapshots = await Promise.all(fetchPromises);

        const fetchedData: any = {};
        
        snapshots.forEach((snap, index) => {
          if (snap.exists()) {
            const snapData = snap.data();
            const docName = docNames[index];
            
            // Map document names to our state keys
            if (docName === 'personalInfo') {
              // Handle photo and cv fallback specifically
              fetchedData.personalInfo = {
                ...staticPersonalInfo,
                ...snapData,
                photo: snapData.photo || staticPersonalInfo.photo,
                cv: snapData.cv || staticPersonalInfo.cv
              };
            } else if (docName === 'education') fetchedData.education = snapData;
            else if (docName === 'skills') fetchedData.skills = snapData.skills || snapData;
            else if (docName === 'researchInterests') fetchedData.researchInterests = snapData.researchInterests || snapData;
            else if (docName === 'experience') fetchedData.experience = snapData;
            else if (docName === 'conferences') fetchedData.conferences = snapData.activitiesData || snapData;
            else if (docName === 'journey') fetchedData.journey = snapData;
            else if (docName === 'projects') fetchedData.projects = snapData.projectsAndFundings || snapData;
            else if (docName === 'publications') fetchedData.publications = snapData.publications || snapData;
          }
        });

        // Merge fetched data over the static default data (or previously cached data)
        setData(prevData => {
          const newData = {
            ...prevData,
            ...fetchedData
          };
          localStorage.setItem(CACHE_KEY, JSON.stringify(newData));
          return newData;
        });

      } catch (error) {
        console.error("Error fetching portfolio data from Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ loading, data }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
