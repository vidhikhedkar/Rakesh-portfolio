import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectPage from "./pages/ProjectPage";
import ContactPage from "./pages/ContactPage";

import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";

import Dashboard from "./components/admin/Dashboard";
import Profile from "./components/about/Profile";
import ServicesOffering from "./components/servicesoffering/ServicesOffering";
import Login from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import ProjectDetails from "./components/projects/ProjectDetails";
import MyApproch from "./components/approach/MyApproch";

const Layout = () => {
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  // Hide header and footer on project details pages
  const isProjectDetails = /^\/projects\/[^/]+\/?$/.test(location.pathname);

  const showHeaderFooter = !isAdmin && !isProjectDetails;

  return (
    <>
      {showHeaderFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectPage />} />

        <Route path="/projects/:projectId" element={<ProjectDetails />} />

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/services-offering" element={<ServicesOffering />} />

        <Route path="/my-approch" element={<MyApproch />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {showHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
