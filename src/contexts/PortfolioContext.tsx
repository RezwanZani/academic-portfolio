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

export const invalidatePortfolioCache = () => {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (e) {
    console.error("Failed to clear portfolio cache:", e);
  }
};

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
    let isMounted = true;

    const fetchPortfolioData = async () => {
      try {
        const docNames = [
          'personalInfo', 'education', 'skills', 
          'researchInterests', 'experience', 'conferences', 
          'journey', 'projects', 'publications'
        ];

        // 10-second safety timeout so network hangs never block UI indefinitely
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Network timeout")), 10000)
        );

        const fetchPromises = docNames.map(name =>
          Promise.race([getDoc(doc(db, name, 'data')), timeoutPromise]) as Promise<any>
        );

        const snapshots = await Promise.allSettled(fetchPromises);

        if (!isMounted) return;

        const fetchedData: any = {};
        let hasNewData = false;
        
        snapshots.forEach((res, index) => {
          if (res.status === 'fulfilled' && res.value && typeof res.value.exists === 'function' && res.value.exists()) {
            const snap = res.value;
            const snapData = snap.data();
            const docName = docNames[index];
            hasNewData = true;
            
            // Map document names to our state keys
            if (docName === 'personalInfo') {
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

        if (hasNewData && isMounted) {
          setData(prevData => {
            const newData = {
              ...prevData,
              ...fetchedData
            };
            try {
              localStorage.setItem(CACHE_KEY, JSON.stringify(newData));
            } catch (e) {
              console.warn("Could not save to localStorage:", e);
            }
            return newData;
          });
        }

      } catch (error) {
        console.error("Error fetching portfolio data from Firestore:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPortfolioData();

    return () => {
      isMounted = false;
    };
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
