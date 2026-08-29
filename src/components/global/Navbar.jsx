import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiHome, HiUser, HiBriefcase, HiMail, HiMenuAlt3, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <HiHome size={20} /> },
    { name: 'About', path: '/about', icon: <HiUser size={20} /> },
    { name: 'Works', path: '/projects', icon: <HiBriefcase size={20} /> },
    { name: 'Contact', path: '/contact', icon: <HiMail size={20} /> },
  ];

  return (
    <>
      {/* Desktop & Standard Header Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 hidden md:block">
        <div className="container">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="text-2xl font-black tracking-tight text-slate-900">
              Rakesh<span className="text-[#4A6AF4]">.P</span>
            </Link>
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-semibold transition-colors duration-200 ${isActive ? 'text-[#4A6AF4]' : 'text-slate-600 hover:text-[#4A6AF4]'
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
            <Link
              to="/contact"
              className="px-6 py-2.5 rounded-full bg-[#323232] text-white font-medium text-sm hover:bg-slate-800 transition-colors shadow-sm"
            >
              Let's talk
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Top Header (Brand & Menu Trigger) */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-lg border-b border-slate-100 flex md:hidden items-center justify-between px-5 h-16">
        <Link to="/" className="text-xl font-black tracking-tight text-slate-900">
          Rakesh<span className="text-blue-600">.P</span>
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2.5 rounded-2xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors focus:outline-none"
          aria-label="Open Menu"
        >
          <HiMenuAlt3 size={22} />
        </button>
{/* 
        <Link
          to="/contact"
          onClick={() => setIsOpen(false)}
          className="px-4 text-center block py-2 rounded-2xl bg-[#323232] text-white font-bold text-sm shadow-xl"
        >
          Let's talk
        </Link> */}
      </header>

      {/* Mobile Menu Bottom-Up Drawer (Opens from bottom) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Content Sliding Up from Bottom */}
          <div className="relative w-full bg-white rounded-t-[2.5rem] shadow-2xl p-6 pb-10 flex flex-col z-10 animate-in slide-in-from-bottom duration-300">

            {/* Grab Handle Bar */}
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />

            <div className="flex items-center justify-between mb-6">
              <span className="text-base font-black text-slate-900 uppercase tracking-wider">Navigation</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                <HiX size={20} />
              </button>
            </div>

            <nav className="flex flex-col gap-2.5 mb-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-600 bg-slate-50 hover:bg-slate-100'
                      }`}
                  >
                    <span className={isActive ? 'text-white' : 'text-slate-500'}>{link.icon}</span>
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center block py-4 rounded-2xl bg-[#323232] text-white font-bold text-sm shadow-xl"
            >
              Let's talk
            </Link>
          </div>
        </div>
      )}

      {/* Mobile Floating Bottom Dock Navigation */}
      {/* <nav aria-label="Mobile Navigation" className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-full px-3 py-2 shadow-2xl md:hidden flex items-center justify-around">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex flex-col items-center justify-center p-2.5 rounded-full transition-all duration-300 ${isActive
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/50 scale-105'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              {link.icon}
            </Link>
          );
        })}
      </nav> */}
    </>
  );
};

export default Navbar;