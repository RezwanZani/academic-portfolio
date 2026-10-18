import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Portfolio } from './pages/Portfolio';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sonner';

// Lazy-load dashboard and auth pages for fast initial bundle and optimal code splitting
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const AdminSetup = lazy(() => import('./pages/AdminSetup').then(m => ({ default: m.AdminSetup })));
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout').then(m => ({ default: m.DashboardLayout })));
const PersonalInfoForm = lazy(() => import('./pages/dashboard/PersonalInfoForm').then(m => ({ default: m.PersonalInfoForm })));
const EducationForm = lazy(() => import('./pages/dashboard/EducationForm').then(m => ({ default: m.EducationForm })));
const SkillsForm = lazy(() => import('./pages/dashboard/SkillsForm').then(m => ({ default: m.SkillsForm })));
const ResearchInterestsForm = lazy(() => import('./pages/dashboard/ResearchInterestsForm').then(m => ({ default: m.ResearchInterestsForm })));
const ExperienceForm = lazy(() => import('./pages/dashboard/ExperienceForm').then(m => ({ default: m.ExperienceForm })));
const ConferencesForm = lazy(() => import('./pages/dashboard/ConferencesForm').then(m => ({ default: m.ConferencesForm })));
const JourneyForm = lazy(() => import('./pages/dashboard/JourneyForm').then(m => ({ default: m.JourneyForm })));
const ProjectsForm = lazy(() => import('./pages/dashboard/ProjectsForm').then(m => ({ default: m.ProjectsForm })));
const PublicationsForm = lazy(() => import('./pages/dashboard/PublicationsForm').then(m => ({ default: m.PublicationsForm })));
const SetupPage = lazy(() => import('./pages/dashboard/SetupPage').then(m => ({ default: m.SetupPage })));

const PageLoader = () => (
  <div className="flex h-screen items-center justify-center bg-[#0a0a0a]">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

/*
 * Github: https://github.com/RezwanZani/academic-portfolio
 * Original design by Ashish Gautam.
 * Source: https://www.figma.com/community/file/1535220348867490165
 * Licensed under CC BY 4.0.
 * Adapted and customized by Md. Rezwan Zani for Tyseer Ninad.
 * Developer: Md. Rezwan Zani (https://rezwanzani.me)
 * Copyright © 2026 Tyseer Ninad. All rights reserved.
 */

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="bottom-right" richColors />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-setup" element={<AdminSetup />} />
            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route
                  index
                  element={
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-white mb-4">Dashboard Home</h2>
                      <p className="text-gray-400">Select an item from the sidebar to edit your portfolio data.</p>
                    </div>
                  }
                />
                <Route path="personal-info" element={<PersonalInfoForm />} />
                <Route path="education" element={<EducationForm />} />
                <Route path="skills" element={<SkillsForm />} />
                <Route path="research-interests" element={<ResearchInterestsForm />} />
                <Route path="experience" element={<ExperienceForm />} />
                <Route path="conferences" element={<ConferencesForm />} />
                <Route path="journey" element={<JourneyForm />} />
                <Route path="projects" element={<ProjectsForm />} />
                <Route path="publications" element={<PublicationsForm />} />
                <Route path="setup" element={<SetupPage />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}