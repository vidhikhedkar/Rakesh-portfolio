import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectPage from './pages/ProjectPage';
import ContactPage from './pages/ContactPage';
import Navbar from './components/global/Navbar';
import Footer from './components/global/Footer';
import Dashboard from './components/admin/Dashboard';
import Profile from './components/about/Profile';
import ServicesOffering from './components/servicesoffering/ServicesOffering';
import Login from './auth/Login';
import ProtectedRoute from './auth/ProtectedRoute';
import ProjectDetails from './components/projects/ProjectDetails';


const Layout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/services-offering" element={<ServicesOffering />} />
        <Route path="/login" element={<Login />} />

        {/* Secured/Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!isAdmin && <Footer />}
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