import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Portfolio } from './pages/Portfolio';
import { Login } from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import { PersonalInfoForm } from './pages/dashboard/PersonalInfoForm';
import { EducationForm } from './pages/dashboard/EducationForm';
import { SkillsForm } from './pages/dashboard/SkillsForm';
import { ResearchInterestsForm } from './pages/dashboard/ResearchInterestsForm';
import { ExperienceForm } from './pages/dashboard/ExperienceForm';
import { ConferencesForm } from './pages/dashboard/ConferencesForm';
import { JourneyForm } from './pages/dashboard/JourneyForm';
import { ProjectsForm } from './pages/dashboard/ProjectsForm';
import { PublicationsForm } from './pages/dashboard/PublicationsForm';
import { SetupPage } from './pages/dashboard/SetupPage';
import { AdminSetup } from './pages/AdminSetup';

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-setup" element={<AdminSetup />} />
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<div className="p-6"><h2 className="text-2xl font-bold text-white mb-4">Dashboard Home</h2><p className="text-gray-400">Select an item from the sidebar to edit your portfolio data.</p></div>} />
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
      </BrowserRouter>
    </AuthProvider>
  );
}